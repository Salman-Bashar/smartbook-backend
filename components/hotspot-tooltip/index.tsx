import { PreviewLayoutKey, SchemaType } from "sanity";
import { Box } from "@sanity/ui";
import { useMemo } from "react";
import { IHotspotPreviewTooltip } from "./interface";

/**
 * This is a react component used by hotspot sections/components.
 * It renders small tooltips to show the item being used in the hotspot.
 *
 * This component should not be used directly with any schema. It is a
 * re-usable component.
 *
 * You can learn more about how to use this component with your specific
 * use case by looking through the following files.
 *
 * This component should be used alongside the `hotspotField` common schema.
 *
 * Please go through these files in the given order to get a clear understanding of
 * how the hotspot plugin works.
 *
 * https://github.com/lemon-hive/ans-backend/blob/main/schemas/common/product-hotspots/index.ts
 * https://github.com/lemon-hive/ans-backend/blob/main/schemas/common/product-hotspots/hotspot-object.ts
 * https://github.com/lemon-hive/ans-backend/blob/main/schemas/common/product-hotspots/hotspot-preview-component.tsx
 *
 */
export function HotspotPreviewTooltip(props: IHotspotPreviewTooltip) {
  const { renderPreview, hotspotItemSchemaType, hotspotItem } = props;

  const validHotspotItem = hotspotItem && hotspotItemSchemaType;

  const previewProps = useMemo(
    () => ({
      value: hotspotItem,
      schemaType: hotspotItemSchemaType as SchemaType,
      layout: "default" as PreviewLayoutKey,
    }),
    [hotspotItem, hotspotItemSchemaType]
  );

  return (
    <Box
      padding={2}
      style={{
        maxWidth: "250px",
      }}
    >
      {validHotspotItem && previewProps
        ? renderPreview(previewProps)
        : `Invalid Hotspot Preview Config`}
    </Box>
  );
}
