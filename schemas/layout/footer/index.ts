import { defineArrayMember, defineField } from "sanity";
import { defineType } from "sanity";
import { RiLayoutBottom2Fill } from "react-icons/ri";
import { link } from "../../_root/link";

export default defineType({
  name: "footer",
  title: "Footer",
  icon: RiLayoutBottom2Fill,
  type: "document",
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
        title: "Footer",
      };
    },
  },
});
