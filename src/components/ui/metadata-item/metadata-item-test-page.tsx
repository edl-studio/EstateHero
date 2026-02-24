import { MetadataItem } from "@/components/ui/metadata-item";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Upload, TrendingUp, TrendingDown } from "lucide-react";

/**
 * Quick visual test page for the MetadataItem component
 * Visit this in Storybook or add to your app to verify the component renders correctly
 */
export function MetadataItemTestPage() {
  return (
    <div style={{ padding: "40px", maxWidth: "1200px" }}>
      <h1 style={{ marginBottom: "30px" }}>Metadata Item Component Test</h1>
      
      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "16px" }}>Data Group Variant - Full Example</h2>
        <div style={{ maxWidth: "400px" }}>
          <MetadataItem
            variant="data-group"
            label="MARKET"
            labelIcon={<Icon name="HelpCircle" size="md" />}
            icon={<Icon name="Globe" size="xl" className="text-[#10B981]" />}
            dataValue="7.728.337"
            dataUnit="DKK"
            badge={
              <Badge variant="positive" iconLeft={<TrendingUp size={12} strokeWidth={1.5} />}>
                5%
              </Badge>
            }
          />
        </div>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "16px" }}>Data Group Variants</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
          <MetadataItem
            variant="data-group"
            label="PURCHASE PRICE"
            icon={<Icon name="Globe" size="xl" className="text-[#3B82F6]" />}
            dataValue="6.500.000"
            dataUnit="DKK"
          />
          <MetadataItem
            variant="data-group"
            label="RENTAL INCOME"
            dataValue="45.000"
            dataUnit="DKK"
            badge={
              <Badge variant="positive" iconLeft={<TrendingUp size={12} strokeWidth={1.5} />}>
                3%
              </Badge>
            }
          />
          <MetadataItem
            variant="data-group"
            label="SQUARE METERS"
            icon={<Icon name="Globe" size="xl" className="text-[#8B5CF6]" />}
            dataValue="850"
            dataUnit="m²"
          />
          <MetadataItem
            variant="data-group"
            label="ASSESSMENT"
            dataValue="3.200.000"
            dataUnit="DKK"
            badge={
              <Badge variant="negative" iconLeft={<TrendingDown size={12} strokeWidth={1.5} />}>
                -2%
              </Badge>
            }
          />
        </div>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "16px" }}>Button Variant - Full Example</h2>
        <div style={{ maxWidth: "400px" }}>
          <MetadataItem
            variant="button"
            label="VALUE"
            buttonText="UPLOAD RENT ROLL"
            buttonIcon={<Upload className="w-4 h-4" />}
            onButtonClick={() => console.log("Upload rent roll clicked")}
          />
        </div>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "16px" }}>Button Variants</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
          <MetadataItem
            variant="button"
            label="CALCULATED"
            labelIcon={<Icon name="HelpCircle" size="md" />}
            buttonText="UPLOAD RENT ROLL"
            buttonIcon={<Upload className="w-4 h-4" />}
            onButtonClick={() => console.log("Upload rent roll")}
          />
          <MetadataItem
            variant="button"
            label="DOCUMENT"
            buttonText="UPLOAD FILE"
            buttonIcon={<Upload className="w-4 h-4" />}
            onButtonClick={() => console.log("Upload file")}
          />
          <MetadataItem
            variant="button"
            label="ANALYSIS"
            buttonText="GENERATE REPORT"
            onButtonClick={() => console.log("Generate report")}
          />
          <MetadataItem
            variant="button"
            label="DATA"
            labelIcon={<Icon name="HelpCircle" size="md" />}
            buttonText="IMPORT DATA"
            onButtonClick={() => console.log("Import data")}
          />
        </div>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "16px" }}>Mixed Usage Example</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
          <MetadataItem
            variant="data-group"
            label="MARKET VALUE"
            labelIcon={<Icon name="HelpCircle" size="md" />}
            icon={<Icon name="Globe" size="xl" className="text-[#10B981]" />}
            dataValue="7.728.337"
            dataUnit="DKK"
            badge={
              <Badge variant="positive" iconLeft={<TrendingUp size={12} strokeWidth={1.5} />}>
                5%
              </Badge>
            }
          />
          <MetadataItem
            variant="button"
            label="CALCULATED"
            labelIcon={<Icon name="HelpCircle" size="md" />}
            buttonText="UPLOAD RENT ROLL"
            buttonIcon={<Upload className="w-4 h-4" />}
            onButtonClick={() => console.log("Upload clicked")}
          />
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
          <li>Two variants: data-group and button</li>
          <li>TypeScript discriminated unions for type safety</li>
          <li>CSS Modules for styling</li>
          <li>Follows EstateHero component patterns</li>
          <li>Full Storybook documentation</li>
          <li>Supports icons, badges, and units</li>
        </ul>
      </div>
    </div>
  );
}
