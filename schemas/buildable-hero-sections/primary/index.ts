import { defineField, defineType } from "sanity";
import { image } from "../../_root/media/image";
import { editorTitle } from "../../common/editor-title";
import { RxSection } from "react-icons/rx";

export default defineType({
  name: "primaryHeroSection",
  type: "document",
  title: "Primary Hero",
  icon: RxSection,
  fields: [
    editorTitle({}),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
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
  preview: {
    select: {
      title: "editorTitle",
      image: "image.file",
    },
    prepare({ title, image }) {
      return {
        title: title,
        media: image,
        subtitle: "Primary Hero",
      };
    },
  },
});
