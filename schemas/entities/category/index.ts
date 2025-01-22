import { defineField, defineType } from "sanity";
import { MdCategory } from "react-icons/md";
import { image } from "../../_root/media/image";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: MdCategory,
  fields: [
    defineField({
      name: "name",
      title: "Category Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField(image({ name: "icon", title: "Icon" })),
  ],
  preview: {
    select: {
      name: "name",
      icon: "icon.file",
    },
    prepare({ name, icon }) {
      return {
        title: name,
        media: icon || MdCategory,
        subtitle: "Category",
      };
    },
  },
});
