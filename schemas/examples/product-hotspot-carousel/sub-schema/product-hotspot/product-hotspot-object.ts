import { defineField } from "sanity";

/**
 * A single product hotspot object definition
 */
export const productHotspotObject = defineField({
  name: "spot",
  title: "Spot",
  type: "object",
  fieldsets: [{ name: "position", options: { columns: 2 } }],
  fields: [
    defineField({
      name: "product",
      title: "Product",
      type: "reference",
      to: { type: "product" },
      weak: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "x",
      type: "number",
      readOnly: true,
      fieldset: "position",
      initialValue: 50,
      validation: (Rule) => Rule.required().min(0).max(100),
    }),
    defineField({
      name: "y",
      type: "number",
      readOnly: true,
      fieldset: "position",
      initialValue: 50,
      validation: (Rule) => Rule.required().min(0).max(100),
    }),
  ],
  preview: {
    select: {
      title: "product.title",
      image: "product.image.file",
      x: "x",
      y: "y",
    },
    prepare(selection) {
      const { title, image, x, y } = selection;
      return {
        title: title,
        media: image,
        subtitle: x && y ? `[${x}%, ${y}%]` : `No position set`,
      };
    },
  },
});
