import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

import { TableHeader } from "@/components/ui/table-header";
import { TableCell } from "@/components/ui/table-cell";
import { Input, InputTrailingActions } from "@/components/ui/input";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Icon } from "@/components/ui/icon";
import { useIsMobile } from "@/lib/use-media-query";

/** Row for the financial comparison table (Figma design) */
type TableRow = {
  id: string;
  /** First column: label with optional tooltip */
  label: string;
  labelTooltip?: string;
  /** MARKET column: display value + optional unit (e.g. " DKK", " %", " DKK/m²") */
  market: string;
  marketMetric?: string;
  /** CALCULATED column */
  calculated: string;
  calculatedMetric?: string;
  /** SIMULATED: either static text or editable input */
  simulated:
    | { type: "static"; value: string; metric?: string }
    | { type: "input"; value: string };
};

const defaultRows: TableRow[] = [
  {
    id: "1",
    label: "ESTIMATED VALUE",
    labelTooltip: "Market-based estimate of the property value.",
    market: "7.728.337",
    marketMetric: "DKK",
    calculated: "7.728.337",
    calculatedMetric: "DKK",
    simulated: { type: "static", value: "7.728.337", metric: "DKK" },
  },
  {
    id: "2",
    label: "YIELD",
    labelTooltip: "Annual yield percentage.",
    market: "5",
    marketMetric: "%",
    calculated: "5",
    calculatedMetric: "%",
    simulated: { type: "input", value: "5" },
  },
  {
    id: "3",
    label: "RENTAL INCOME",
    labelTooltip: "Total rental income per year.",
    market: "386.417",
    marketMetric: "DKK",
    calculated: "386.417",
    calculatedMetric: "DKK",
    simulated: { type: "input", value: "" },
  },
  {
    id: "4",
    label: "ORIGINAL EXPENSES",
    labelTooltip: "Original operating expenses.",
    market: "110.880",
    marketMetric: "DKK",
    calculated: "110.880",
    calculatedMetric: "DKK",
    simulated: { type: "input", value: "110.880" },
  },
  {
    id: "5",
    label: "NET RENT",
    labelTooltip: "Rental income minus expenses.",
    market: "275.537",
    marketMetric: "DKK",
    calculated: "275.537",
    calculatedMetric: "DKK",
    simulated: { type: "static", value: "275.537", metric: "DKK" },
  },
  {
    id: "6",
    label: "RENTAL INCOME",
    labelTooltip: "Rental income (repeated section).",
    market: "386.417",
    marketMetric: "DKK",
    calculated: "386.417",
    calculatedMetric: "DKK",
    simulated: { type: "static", value: "386.417", metric: "DKK" },
  },
  {
    id: "7",
    label: "OPERATING COSTS PER M²",
    labelTooltip: "Operating costs per square meter.",
    market: "1.071,25",
    marketMetric: " DKK",
    calculated: "1.071,25",
    calculatedMetric: "DKK",
    simulated: { type: "static", value: "1.071,25", metric: " DKK" },
  },
  {
    id: "8",
    label: "VALUE PER M²",
    labelTooltip: "Property value per square meter.",
    market: "15.100",
    marketMetric: " DKK/m²",
    calculated: "15.100",
    calculatedMetric: " DKK/m²",
    simulated: { type: "static", value: "15.100", metric: " DKK/m²" },
  },
  {
    id: "9",
    label: "M² PRICE ACCORDING TO THE MARKET",
    labelTooltip: "Market price per square meter.",
    market: "15.100",
    marketMetric: " DKK/m²",
    calculated: "15.100",
    calculatedMetric: " DKK/m²",
    simulated: { type: "static", value: "15.100", metric: " DKK/m²" },
  },
];

type SortDirection = "none" | "asc" | "desc";

const cycleSort = (current: SortDirection): SortDirection =>
  current === "none" ? "asc" : current === "asc" ? "desc" : "none";

const columnHelper = createColumnHelper<TableRow>();

/** Context for simulated input values so column cell can stay a stable component reference and avoid input focus loss on re-render. */
const SimulatedInputsContext = React.createContext<{
  values: Record<string, string>;
  setValue: (rowId: string, value: string) => void;
  clearValue: (rowId: string) => void;
  isMobile: boolean;
} | null>(null);

/** Stable cell component for simulated column; reads from context so columns array can be memoized without simulatedInputs in deps. */
const SimulatedCell: React.FC<{ row: TableRow }> = ({ row }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const ctx = React.useContext(SimulatedInputsContext);
  const sim = row.simulated;
  if (sim.type === "static") {
    return (
      <TableCell suffix={sim.metric}>
        {sim.value}
      </TableCell>
    );
  }
  if (!ctx) return null;
  const { values, setValue, clearValue, isMobile } = ctx;
  return (
    <TableCell contentWidth="full">
      <Input
        ref={inputRef}
        align="right"
        size={isMobile ? "mobile" : "default"}
        value={values[row.id] ?? ""}
        onChange={(e) => setValue(row.id, e.target.value)}
        onConfirmKeyDown={() => {}}
        onClearKeyDown={() => clearValue(row.id)}
        metric={row.marketMetric}
        trailingSlot={
          <InputTrailingActions
            onClear={() => clearValue(row.id)}
            onConfirm={() => inputRef.current?.blur()}
            confirmShortcut
            ariaLabelClear="Clear (Escape)"
            ariaLabelConfirm="Confirm (Enter)"
          />
        }
      />
    </TableCell>
  );
};

export const TablePage: React.FC = () => {
  const isMobile = useIsMobile();
  const [rows] = React.useState<TableRow[]>(() => defaultRows);
  const [simulatedInputs, setSimulatedInputs] = React.useState<
    Record<string, string>
  >(() => {
    const initial: Record<string, string> = {};
    defaultRows.forEach((r) => {
      if (r.simulated.type === "input") initial[r.id] = r.simulated.value;
    });
    return initial;
  });
  const [marketSort, setMarketSort] = React.useState<SortDirection>("none");
  const [calculatedSort, setCalculatedSort] =
    React.useState<SortDirection>("none");
  const [simulatedSort, setSimulatedSort] = React.useState<SortDirection>("none");

  /** On mobile: sticky first column (labels stack vertically), data columns scroll horizontally */
  const stickyFirstColClass =
    "max-md:sticky max-md:left-0 max-md:z-10 max-md:bg-[var(--color-card)]";

  const simulatedInputsContext = React.useMemo(
    () => ({
      values: simulatedInputs,
      setValue: (rowId: string, value: string) =>
        setSimulatedInputs((prev) => ({ ...prev, [rowId]: value })),
      clearValue: (rowId: string) =>
        setSimulatedInputs((prev) => ({ ...prev, [rowId]: "" })),
      isMobile,
    }),
    [simulatedInputs, isMobile]
  );

  const columns = React.useMemo(() => [
    columnHelper.accessor("label", {
      id: "label",
      header: () => (
        <TableHeader theme="light" className={stickyFirstColClass} />
      ),
      cell: ({ row }) => (
        <TableCell
          contentVariant="label"
          className={stickyFirstColClass}
        >
          <Tooltip>
            <TooltipTrigger>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--spacing-xs)" }}>
                {row.original.label}
                <Icon name="HelpCircle" size="md" aria-hidden />
              </span>
            </TooltipTrigger>
            <TooltipContent>{row.original.labelTooltip ?? ""}</TooltipContent>
          </Tooltip>
        </TableCell>
      ),
    }),
    columnHelper.display({
      id: "market",
      header: () => (
        <TableHeader
          theme="light"
          label="MARKET"
          tooltipContent="Values from the market."
          sortDirection={marketSort}
          ariaSort={
            marketSort === "asc"
              ? "ascending"
              : marketSort === "desc"
                ? "descending"
                : undefined
          }
          onClick={() => setMarketSort(cycleSort(marketSort))}
          className="cursor-pointer"
        />
      ),
      cell: ({ row }) => (
        <TableCell suffix={row.original.marketMetric}>
          {row.original.market}
        </TableCell>
      ),
    }),
    columnHelper.display({
      id: "calculated",
      header: () => (
        <TableHeader
          theme="light"
          label="CALCULATED"
          tooltipContent="Calculated values based on inputs."
          sortDirection={calculatedSort}
          ariaSort={
            calculatedSort === "asc"
              ? "ascending"
              : calculatedSort === "desc"
                ? "descending"
                : undefined
          }
          onClick={() => setCalculatedSort(cycleSort(calculatedSort))}
          className="cursor-pointer"
        />
      ),
      cell: ({ row }) => (
        <TableCell suffix={row.original.calculatedMetric}>
          {row.original.calculated}
        </TableCell>
      ),
    }),
    columnHelper.display({
      id: "simulated",
      header: () => (
        <TableHeader
          theme="dark"
          label="SIMULATED"
          tooltipContent="Editable simulated values."
          sortDirection={simulatedSort}
          ariaSort={
            simulatedSort === "asc"
              ? "ascending"
              : simulatedSort === "desc"
                ? "descending"
                : undefined
          }
          onClick={() => setSimulatedSort(cycleSort(simulatedSort))}
          className="cursor-pointer"
        />
      ),
      cell: ({ row }) => <SimulatedCell row={row.original} />,
    }),
  ], [
    marketSort,
    calculatedSort,
    simulatedSort,
    isMobile,
    stickyFirstColClass,
  ]);

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const headerGroups = table.getHeaderGroups();
  const dataColumns = headerGroups[0]?.headers.slice(1) ?? [];

  return (
    <TooltipProvider>
      <SimulatedInputsContext.Provider value={simulatedInputsContext}>
        <div className="flex w-full flex-col">
        {/* Mobile: label stacked on top of data cells per row; single scroll container for the whole table */}
        <div className="mobile-table-layout overflow-x-auto rounded-lg bg-[var(--color-card)] md:hidden [container-type:inline-size]">
          <div style={{ minWidth: "480px" }}>
            <div className="border-b-inset">
              <div
                className="flex"
              >
                {dataColumns.map((header, index) => {
                  const el = flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  ) as React.ReactElement;
                  const isFirst = index === 0;
                  const mobileHeaderClass = [
                    (el as React.ReactElement<{ className?: string }>).props.className,
                    "flex-1 min-w-[160px] shrink-0",
                    "mobile-table-header",
                  ].filter(Boolean).join(" ");
                  return React.isValidElement(el) ? (
                    React.cloneElement(el, {
                      key: header.id,
                      renderAs: "div",
                      className: mobileHeaderClass,
                      style: { height: "44px" },
                      ...(isFirst && { roundTopLeftOnly: true }),
                    } as React.Attributes & { renderAs: "div"; className?: string; style?: React.CSSProperties; roundTopLeftOnly?: boolean })
                  ) : (
                    <React.Fragment key={header.id}>{el}</React.Fragment>
                  );
                })}
              </div>
            </div>
            {table.getRowModel().rows.map((row) => {
              const cells = row.getVisibleCells();
              const labelCell = cells[0];
              const dataCells = cells.slice(1);
              const labelEl = flexRender(
                labelCell.column.columnDef.cell,
                labelCell.getContext()
              ) as React.ReactElement;
              return (
                <div
                  key={row.id}
                  className="border-b-inset"
                >
                  <div className="sticky left-0 z-10 w-[100cqi] border-b-inset bg-[var(--color-card)]">
                    <div className="min-w-0">
                      {React.isValidElement(labelEl)
                        ? React.cloneElement(labelEl, {
                            renderAs: "div",
                            className: [(labelEl as React.ReactElement<{ className?: string }>).props.className, "mobile-table-label-cell"].filter(Boolean).join(" "),
                            style: { height: "40px" },
                          } as React.Attributes & { renderAs: "div"; className?: string; style?: React.CSSProperties })
                        : labelEl}
                    </div>
                  </div>
                  <div
                    className="flex"
                  >
                    {dataCells.map((cell) => {
                      const cellEl = flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      ) as React.ReactElement;
                      return React.isValidElement(cellEl) ? (
                        React.cloneElement(cellEl, {
                          key: cell.id,
                          renderAs: "div",
                          className: [(cellEl as React.ReactElement<{ className?: string }>).props.className, "flex-1 min-w-[160px] shrink-0", "mobile-table-data-cell"].filter(Boolean).join(" "),
                          style: { height: "48px" },
                        } as React.Attributes & { renderAs: "div"; className?: string; style?: React.CSSProperties })
                      ) : (
                        <React.Fragment key={cell.id}>{cellEl}</React.Fragment>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop: standard table with optional sticky first column */}
        <div className="hidden overflow-x-auto rounded-lg bg-[var(--color-card)] md:block">
          <table className="data-table w-full min-w-[560px] border-collapse table-fixed md:min-w-full">
            <colgroup>
              {table.getHeaderGroups()[0]?.headers.map((header) => (
                <col key={header.id} />
              ))}
            </colgroup>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <React.Fragment key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <React.Fragment key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </SimulatedInputsContext.Provider>
    </TooltipProvider>
  );
};
