import { SanityReference } from "@sanity/client";
import { useSchema } from "sanity";
import { HotspotTooltipProps } from "sanity-plugin-hotspot-array";
import { HotspotPreviewTooltip } from "../../../../../components/hotspot-tooltip";

export function ProductHotspotPreview(
  props: HotspotTooltipProps<{ product?: SanityReference }>
) {
  const { value } = props;
  const productSchemaType = useSchema().get("product");

  return (
    <HotspotPreviewTooltip
      hotspotItem={value.product}
      hotspotItemSchemaType={productSchemaType}
      {...props}
    />
  );
}
