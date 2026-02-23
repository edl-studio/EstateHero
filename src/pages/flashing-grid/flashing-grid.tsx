import * as React from "react";

import { FlashingGrid } from "@/components/ui/flashing-grid";

export const FlashingGridPage: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[var(--color-surface)]">
      <FlashingGrid />
    </div>
  );
};
