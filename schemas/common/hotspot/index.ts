import { FaImage } from "react-icons/fa";
import { MdHighlightAlt } from "react-icons/md";
import { defineField, PreviewConfig } from "sanity";
import { image } from "../../_root/media/image";
import { IHotspotField } from "./interface";

/**
 * This is a generic hotspot schema. You should be able to create any kind
 * of hotspot content with this.
 *
 * The `hotspotsField` property has some requirements.
 * - It must be an array of objects with a single object type
 * - The object contains two number fields named x and y
 *
 * This should be used together with the HotspotPreviewTooltip component.
 *
 * Please @see https://www.sanity.io/plugins/hotspot-array for more information
 *
 * You can look at `src/sections/general/shop-the-look/item` to get an example.
 * @param args
 * @returns
 */
export function hotspotField(args: IHotspotField, preview?: PreviewConfig) {
  return defineField({
    name: args.name,
    title: args.title,
    description: args.description,
    type: "object",
    group: args?.group,
    groups: [
      {
        name: "baseImage",
        title: "Base Image",
        default: true,
        icon: FaImage,
      },
      {
        name: "hotspots",
        title: "Hotspots",
        icon: MdHighlightAlt,
      },
    ],
    fields: [
      image({
        title: "Base Image",
        description:
          "The base image on which you want to apply hotspots. In order to get the best editing experience please upload 1:1 images.",
        group: "baseImage",
      }),
      defineField({ ...args.hotspotsField, group: "hotspots" }),
    ],
    preview,
    validation: args.validation,
    hidden: ({ parent, document }) => {
      if (args.hidden) {
        return args.hidden(parent, document);
      }

      return false;
    },
  });
}
