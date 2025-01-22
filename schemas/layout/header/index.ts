import { defineArrayMember, defineField } from "sanity";
import { defineType } from "sanity";
import { RiLayoutTop2Fill } from "react-icons/ri";
import { link } from "../../_root/link";

export default defineType({
  name: "header",
  title: "Header",
  type: "document",
  icon: RiLayoutTop2Fill,
  fields: [
    defineField({
      name: "menuLinks",
      title: "Menu Links",
      type: "array",
      of: [
        defineArrayMember(
          link({ name: "menuLink", title: "Menu Link", isOptional: false })
        ),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Header",
      };
    },
  },
});
