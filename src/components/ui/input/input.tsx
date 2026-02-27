import * as React from "react";
import { Input as BaseInput } from "@base-ui-components/react/input";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/use-media-query";
import styles from "./input.module.css";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Visual style variant
   */
  variant?: "default" | "flat";
  
  /**
   * Size variant
   */
  size?: "default" | "large" | "mobile";
  /**
   * Typography: sans uses ui-sans-regular-16, mono uses ui-mono-20.
   */
  fontVariant?: "sans" | "mono";
  /**
   * Icon to display at the start (left) of the input.
   * Recommended size: 16×16px (h-4 w-4) for default, 20×20px (h-5 w-5) for large, 14×14px for mobile
   */
  leadingIcon?: React.ReactNode;
  /**
   * Icon to display at the end (right) of the input.
   * Recommended size: 16×16px (h-4 w-4) for default, 20×20px (h-5 w-5) for large, 14×14px for mobile
   */
  trailingIcon?: React.ReactNode;
  /**
   * Callback when trailing icon is clicked (makes icon interactive).
   * When provided, the trailing icon becomes a clickable button.
   */
  onTrailingIconClick?: () => void;
  /**
   * Custom trailing content (e.g. clear + confirm actions).
   * When provided, renders instead of trailingIcon and reserves padding.
   */
  trailingSlot?: React.ReactNode;
  /**
   * Metric or unit label shown after the value (e.g. "m²", "€", "%").
   * Rendered in secondary content color (--color-content-secondary).
   */
  metric?: React.ReactNode;
  /**
   * Text alignment inside the input. Default is left.
   */
  align?: "left" | "right";
  /**
   * When provided, Enter key calls this callback and blurs the input (confirm).
   */
  onConfirmKeyDown?: () => void;
  /**
   * When provided, Escape key calls this callback and blurs the input (clear).
   */
  onClearKeyDown?: () => void;
  /**
   * When provided on mobile, the input acts as a trigger: read-only, tap opens a bottom sheet.
   * Use this for all editable value inputs so editing happens in the sheet on mobile.
   */
  onMobileOpenSheet?: () => void;
  /**
   * Optional class name applied to the wrapper div when the input uses icons/slots/metric (not applied to the simple input branch).
   */
  containerClassName?: string;
}

const METRIC_GAP_PX = 4;
const PADDING_RIGHT_UNFOCUSED_PX = 12; /* 0.75rem – space before trailing slot */

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant = "default",
    size = "default",
    fontVariant = "sans",
    leadingIcon, 
    trailingIcon,
    onTrailingIconClick,
    trailingSlot,
    metric,
    align = "left",
    type = "text",
    onFocus,
    onBlur,
    value,
    onConfirmKeyDown,
    onClearKeyDown,
    onKeyDown: onKeyDownProp,
    containerClassName,
    onMobileOpenSheet,
    ...props 
  }, ref) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const measureRef = React.useRef<HTMLSpanElement>(null);
    const metricRef = React.useRef<HTMLSpanElement>(null);
    const [metricLeft, setMetricLeft] = React.useState<number | null>(null);
    const [metricRightPadding, setMetricRightPadding] = React.useState<number | null>(null);
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasInteracted, setHasInteracted] = React.useState(false);
    const [measureValue, setMeasureValue] = React.useState("");
    const isMobile = useIsMobile();

    const isMetricWithTrailingSlot = !!(trailingSlot && metric);
    const isRightAlignWithMetricSlot = align === "right" && isMetricWithTrailingSlot;
    const isMobileTrigger = isMobile && onMobileOpenSheet != null;

    const updateMetricPosition = React.useCallback(() => {
      if (!isMetricWithTrailingSlot || !inputRef.current || !measureRef.current || !metricRef.current) return;
      const input = inputRef.current;
      if (align === "right") {
        const metricWidth = metricRef.current.offsetWidth;
        setMetricRightPadding(PADDING_RIGHT_UNFOCUSED_PX + metricWidth + METRIC_GAP_PX);
      } else {
        const paddingLeft = parseFloat(getComputedStyle(input).paddingLeft) || 12;
        const valueWidth = measureRef.current.offsetWidth;
        setMetricLeft(paddingLeft + valueWidth + METRIC_GAP_PX);
      }
    }, [isMetricWithTrailingSlot, align]);

    React.useLayoutEffect(() => {
      if (!isFocused && isMetricWithTrailingSlot) {
        const raw = value ?? inputRef.current?.value ?? "";
        const currentValue = typeof raw === "string" ? raw : String(raw ?? "");
        setMeasureValue(currentValue);
      } else if (isFocused) {
        setMetricLeft(null);
        if (isRightAlignWithMetricSlot) setMetricRightPadding(null);
      }
    }, [isFocused, isMetricWithTrailingSlot, isRightAlignWithMetricSlot, value]);

    React.useLayoutEffect(() => {
      if (!isFocused && isMetricWithTrailingSlot) {
        updateMetricPosition();
      }
    }, [isFocused, isMetricWithTrailingSlot, measureValue, updateMetricPosition]);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      // readOnly inputs on iOS don't fire focus; handled via onClick instead.
      if (isMobileTrigger) {
        inputRef.current?.blur();
        return;
      }
      setIsFocused(true);
      if (!hasInteracted) setHasInteracted(true);
      onFocus?.(e);
    };
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };
    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
      if (isMobileTrigger) {
        e.preventDefault();
        onMobileOpenSheet?.();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && onConfirmKeyDown) {
        onConfirmKeyDown();
        inputRef.current?.blur();
        e.preventDefault();
        onKeyDownProp?.(e);
        return;
      }
      if (e.key === "Escape" && onClearKeyDown) {
        onClearKeyDown();
        inputRef.current?.blur();
        e.preventDefault();
        onKeyDownProp?.(e);
        return;
      }
      onKeyDownProp?.(e);
    };

    const setRefs = React.useCallback(
      (el: HTMLInputElement | null) => {
        inputRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) {
          // RefObject from forwardRef may be typed read-only; assign for ref merge
          (ref as { current: HTMLInputElement | null }).current = el;
        }
      },
      [ref]
    );

    // Build variant classes
    const variantClass = variant === "flat" ? styles.variantFlat : styles.variantDefault;
    const sizeClass =
      size === "large"
        ? styles.sizeLarge
        : size === "mobile"
          ? styles.sizeMobile
          : styles.sizeDefault;
    const textClass =
      fontVariant === "mono" ? "ui-mono-20" : "ui-sans-regular-16";
    const monoVariantClass = fontVariant === "mono" ? styles.inputMonoVariant : undefined;
    const hasTrailing = trailingSlot ?? (!!trailingIcon);
    const hasMetric = !!metric;
    const alignClass = align === "right" ? styles.inputAlignRight : undefined;

    // If no icons, no slot, and no metric, render simple input
    if (!leadingIcon && !hasTrailing && !hasMetric) {
      const simpleHandleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (isMobileTrigger) {
          inputRef.current?.blur();
          return;
        }
        onFocus?.(e);
      };
      return (
        <BaseInput
          ref={setRefs}
          type={type}
          readOnly={isMobileTrigger}
          className={cn(styles.input, textClass, variantClass, sizeClass, alignClass, monoVariantClass, isMobileTrigger && styles.inputMobileTrigger, className)}
          onFocus={simpleHandleFocus}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          {...props}
        />
      );
    }

    // With icons, wrap in container
    return (
      <div
        className={cn(
          styles.inputContainer,
          hasInteracted && !isMobile && styles.inputContainerAnimated,
          containerClassName
        )}
        data-mobile-trigger={isMobileTrigger ? "" : undefined}
      >
        {leadingIcon && (
          <span
            className={cn(
              styles.leadingIcon,
              size === "large"
                ? styles.leadingIconLarge
                : size === "mobile"
                  ? styles.leadingIconMobile
                  : styles.leadingIconDefault,
              size === "mobile" && styles.leadingIconMobileOffset
            )}
            aria-hidden="true"
          >
            {leadingIcon}
          </span>
        )}

        {isMetricWithTrailingSlot && (
          <span
            ref={measureRef}
            className={cn(styles.metricMeasure, textClass)}
            aria-hidden="true"
          >
            {typeof value === "string" ? value : typeof value !== "undefined" ? String(value) : measureValue}
          </span>
        )}
        
        <BaseInput
          ref={setRefs}
          type={type}
          value={value}
          readOnly={isMobileTrigger}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={cn(
            styles.input,
            textClass,
            variantClass,
            sizeClass,
            alignClass,
            monoVariantClass,
            leadingIcon && styles.hasLeadingIcon,
            trailingSlot && styles.hasTrailingSlot,
            trailingIcon && !trailingSlot && styles.hasTrailingIcon,
            hasMetric && (hasTrailing ? styles.hasMetricWithTrailing : styles.hasMetric),
            isMobileTrigger && styles.inputMobileTrigger,
            className
          )}
          style={
            !isMobile &&
            isRightAlignWithMetricSlot &&
            !isFocused &&
            metricRightPadding !== null
              ? { paddingRight: `${metricRightPadding}px` }
              : undefined
          }
          {...props}
        />

        {hasMetric && (
          <span
            ref={isMetricWithTrailingSlot ? metricRef : undefined}
            className={cn(
              styles.metric,
              !hasTrailing
                ? styles.metricOnly
                : trailingSlot
                  ? cn(
                      styles.metricWithTrailingSlot,
                      align === "right"
                        ? styles.metricInlineAfterValueRight
                        : styles.metricInlineAfterValue
                    )
                  : size === "large"
                    ? styles.metricWithTrailingLarge
                    : size === "mobile"
                      ? styles.metricWithTrailingMobile
                      : styles.metricWithTrailingDefault
            )}
            style={
              isMetricWithTrailingSlot && !isFocused
                ? align === "right"
                  ? { right: `${PADDING_RIGHT_UNFOCUSED_PX}px`, left: "auto" }
                  : metricLeft !== null
                    ? { left: `${metricLeft}px` }
                    : undefined
                : undefined
            }
            aria-hidden="true"
          >
            {metric}
          </span>
        )}
        
        {trailingSlot && (
          <div className={styles.trailingSlotClip} aria-hidden="true">
            <div className={styles.trailingSlot}>
              {trailingSlot}
            </div>
          </div>
        )}

        {!trailingSlot && trailingIcon && onTrailingIconClick && (
          <button
            type="button"
            onClick={onTrailingIconClick}
            className={cn(
              styles.trailingIconButton,
              size === "large"
                ? styles.trailingIconLarge
                : size === "mobile"
                  ? styles.trailingIconMobile
                  : styles.trailingIconDefault,
              size === "mobile" && styles.trailingIconMobileOffset
            )}
            aria-label="Clear input"
          >
            {trailingIcon}
          </button>
        )}

        {!trailingSlot && trailingIcon && !onTrailingIconClick && (
          <span
            className={cn(
              styles.trailingIcon,
              size === "large"
                ? styles.trailingIconLarge
                : size === "mobile"
                  ? styles.trailingIconMobile
                  : styles.trailingIconDefault,
              size === "mobile" && styles.trailingIconMobileOffset
            )}
            aria-hidden="true"
          >
            {trailingIcon}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
