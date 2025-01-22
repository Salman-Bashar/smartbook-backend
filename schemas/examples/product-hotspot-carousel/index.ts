import { defineField, defineType } from "sanity";
import { hotspotField } from "../../common/hotspot";
import { productHotspots } from "./sub-schema/product-hotspot";
import { MdViewCarousel } from "react-icons/md";

/**
 * This is a an example schema of a hotspot section.
 *
 * We have an array of items. Each item will have two properties
 * - image
 * - hotspots
 * So each item will be an image with hotspots (array) on the image. Each hotspot
 * will be a reference of a product.
 *
 * With this data structure we will be able to render a carousel of
 * images with hotspots on them.
 */
export default defineType({
  name: "productHotspotCarousel",
  type: "document",
  title: "Product Hotspot Carousel",
  icon: MdViewCarousel,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      type: "array",
      of: [
        hotspotField(
          {
            name: "item",
            title: "item",
            hotspotsField: productHotspots,
            validation: (rule) => rule.required(),
          },
          {
            select: {
              productHotspots: "productHotspots",
              image: "image.file",
            },
            prepare({ productHotspots, image }) {
              const totalHotspots = productHotspots?.length || 0;

              return {
                title: `Product Hotspots: ${totalHotspots}`,
                media: image,
              };
            },
          }
        ),
      ],
    }),
  ],
});
