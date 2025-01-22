import { defineField, defineType } from "sanity";
import { image } from "../../_root/media/image";
import { FaProductHunt } from "react-icons/fa6";

export default defineType({
  name: "product",
  type: "document",
  title: "Product",
  icon: FaProductHunt,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField(
      image({ name: "image", validation: (rule) => rule.required() })
    ),
  ],
  preview: {
    select: {
      title: "title",
      image: "image.file",
    },
    prepare({ title, image }) {
      return {
        title,
        media: image,
      };
    },
  },
});
