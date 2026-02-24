import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// IBM Plex Sans (primary text)
import "@fontsource/ibm-plex-sans/400.css";  // Regular
import "@fontsource/ibm-plex-sans/500.css";  // Medium
import "@fontsource/ibm-plex-sans/600.css";  // Semibold
import "@fontsource/ibm-plex-sans/700.css";  // Bold

// IBM Plex Serif (decorative/headings)
import "@fontsource/ibm-plex-serif/400.css";  // Regular
import "@fontsource/ibm-plex-serif/600.css";  // Semibold
import "@fontsource/ibm-plex-serif/700.css";  // Bold

// IBM Plex Mono (code/technical)
import "@fontsource/ibm-plex-mono/400.css";  // Regular
import "@fontsource/ibm-plex-mono/500.css";  // Medium
import "@fontsource/ibm-plex-mono/600.css";  // Semibold

import "@/styles/globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FlashingGridPage } from "@/pages/flashing-grid";
import { HomePage } from "@/pages/home";
import { PropertyDetailsPage } from "@/pages/property-details";
import { FinancialComparisonPage } from "@/pages/financial-comparison";
import { CriticalRentPage } from "@/pages/critical-rent";
import { TinglysningPage } from "@/pages/tinglysning";
import { UnitsPage } from "@/pages/units";
import { NeighborhoodPage } from "@/pages/neighborhood";
import { TablePage } from "@/pages/table";
import { ScrollToTop } from "@/components/ScrollToTop";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TooltipProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flashing-grid" element={<FlashingGridPage />} />
          <Route path="/property/:propertyId" element={<PropertyDetailsPage />} />
          <Route path="/property/:propertyId/financial-comparison" element={<FinancialComparisonPage />} />
          <Route path="/property/:propertyId/critical-rent" element={<CriticalRentPage />} />
          <Route path="/property/:propertyId/tinglysning" element={<TinglysningPage />} />
          <Route path="/property/:propertyId/units" element={<UnitsPage />} />
          <Route path="/property/:propertyId/neighborhood" element={<NeighborhoodPage />} />
          <Route path="/table" element={<TablePage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </React.StrictMode>
);
