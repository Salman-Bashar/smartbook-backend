import { defineField } from "sanity";
import { image } from "../../media/image";

export const openGraph = defineField({
  name: "openGraph",
  title: "Open Graph",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField(
      image({
        name: "image",
        title: "Image",
      })
    ),
  ],
});
