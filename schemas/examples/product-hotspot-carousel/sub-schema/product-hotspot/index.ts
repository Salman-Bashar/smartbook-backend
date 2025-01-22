import { defineField } from "sanity";
import { productHotspotObject } from "./product-hotspot-object";
import { ProductHotspotPreview } from "./preview-component";

/**
 * An array of product hotspots for a specific image.
 */
export const productHotspots = defineField({
  name: "productHotspots",
  title: "Hotspots",
  type: "array",
  of: [productHotspotObject],
  options: {
    imageHotspot: {
      imagePath: "image.file",
      tooltip: ProductHotspotPreview,
      pathRoot: "parent",
    },
  },
});
