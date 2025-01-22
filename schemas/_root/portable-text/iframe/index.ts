import { defineField } from "sanity";
import { PiFrameCorners } from "react-icons/pi";

export const portableTextIframe = defineField({
  name: "iframe",
  title: "Iframe",
  type: "object",
  icon: PiFrameCorners,
  description:
    "Please provide embeddable links. Currently we do not support private links",
  fields: [
    defineField({
      name: "embedLink",
      title: "Embed Link",
      type: "url",
      validation: (rule) => rule.required().uri({ scheme: ["https"] }),
    }),
  ],
  validation: (rule) => rule.required(),
  preview: {
    prepare() {
      return {
        title: "IFrame",
        media: PiFrameCorners,
      };
    },
  },
});
