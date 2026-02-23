import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

/**
 * Quick visual test page for the new CSS Modules Badge component
 * Visit this in Storybook or add to your app to verify the badges render correctly
 */
export function BadgeTestPage() {
  return (
    <div style={{ padding: "40px", maxWidth: "800px" }}>
      <h1 style={{ marginBottom: "30px" }}>Badge Component - CSS Modules Test</h1>
      
      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "16px" }}>Filled Color Variants (Mono Font)</h2>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Badge variant="success">Active</Badge>
          <Badge variant="info">For Sale</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="info">New</Badge>
          <Badge variant="neutral">Neutral</Badge>
        </div>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "16px" }}>Bordered Status Variants (Mono Font)</h2>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Badge variant="positive">Approved</Badge>
          <Badge variant="negative">Rejected</Badge>
          <Badge variant="outline">Category</Badge>
        </div>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "16px" }}>Sans Font Variant</h2>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Badge variant="success" fontVariant="sans">Recently Renovated</Badge>
          <Badge variant="info" fontVariant="sans">Single Family Home</Badge>
          <Badge variant="warning" fontVariant="sans">Price Reduced</Badge>
        </div>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "16px" }}>With Icons</h2>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Badge variant="positive" iconLeft={<Check size={12} strokeWidth={1.5} />}>
            Verified
          </Badge>
          <Badge variant="negative" iconLeft={<X size={12} strokeWidth={1.5} />}>
            Declined
          </Badge>
          <Badge variant="success" iconLeft={<Check size={12} strokeWidth={1.5} />}>
            Active
          </Badge>
        </div>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "16px" }}>Different Text Lengths</h2>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <Badge variant="info">New</Badge>
          <Badge variant="info">For Sale</Badge>
          <Badge variant="success">Recently Updated Property</Badge>
        </div>
      </section>

      <div style={{ 
        marginTop: "40px", 
        padding: "20px", 
        backgroundColor: "#f5f5f5", 
        borderRadius: "8px" 
      }}>
        <h3 style={{ marginBottom: "12px" }}>✅ Implementation Complete</h3>
        <ul style={{ paddingLeft: "20px", lineHeight: "1.6" }}>
          <li>CSS Modules with semantic class names</li>
          <li>8 variants (down from 9)</li>
          <li>2 font styles (mono, sans)</li>
          <li>Clean, maintainable code</li>
          <li>No CVA dependency</li>
        </ul>
      </div>
    </div>
  );
}
