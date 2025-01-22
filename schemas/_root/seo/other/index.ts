import { defineField } from "sanity";

export const otherSeoData = defineField({
  name: "others",
  title: "Other",
  type: "object",
  fields: [
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
  ],
});
