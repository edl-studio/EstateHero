import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/lib/use-media-query";

/**
 * Centralizes property navigation for mobile vs desktop.
 * - On mobile: Home → PropertyHome → Property Details (and other sub-pages).
 * - On desktop: Home → Property Details directly; logo from property pages → Home.
 */
export function usePropertyNavigation(propertyId?: string) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const navigateToProperty = (id: string) => {
    if (isMobile) {
      navigate(`/property/${id}/home`);
    } else {
      navigate(`/property/${id}`);
    }
  };

  const navigateBack = () => {
    if (propertyId && isMobile) {
      navigate(`/property/${propertyId}/home`);
    } else {
      navigate("/");
    }
  };

  return { navigateToProperty, navigateBack };
}
