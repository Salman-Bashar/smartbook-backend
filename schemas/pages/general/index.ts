import { defineType } from "sanity";
import { seo } from "../../_root/seo";
import { RiFoldersFill } from "react-icons/ri";
import { CgWebsite } from "react-icons/cg";
import { sectionsField } from "../../common/sections";
import { heroField } from "../../common/hero";
import { contentGroup, seoGroup } from "../../common/field-groups";

export default defineType({
  name: "generalPage",
  type: "document",
  title: "General Page",
  icon: RiFoldersFill,
  groups: [seoGroup, contentGroup],
  fields: [
    seo({
      slugOptions: { isFixed: false },
      group: "seo",
      renderTitleInput: true,
    }),
    heroField({ group: [contentGroup.name], required: true }),
    sectionsField({ group: [contentGroup.name] }),
  ],
  preview: {
    select: {
      title: "seo.title",
    },
    prepare({ title }) {
      return {
        title: title,
        subtitle: "General Page",
        media: CgWebsite,
      };
    },
  },
  orderings: [
    {
      title: "A to Z",
      name: "titleAsc",
      by: [{ field: "seo.title", direction: "asc" }],
    },
  ],
});
