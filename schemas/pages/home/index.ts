import { defineType } from "sanity";
import { seo } from "../../_root/seo";
import { sectionsField } from "../../common/sections";
import { CgWebsite } from "react-icons/cg";
import { heroField } from "../../common/hero";
import { contentGroup, seoGroup } from "../../common/field-groups";

export default defineType({
  name: "homePage",
  type: "document",
  title: "Home",
  icon: CgWebsite,
  groups: [seoGroup, contentGroup],
  fields: [
    seo({
      slugOptions: { isFixed: true },
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
        subtitle: "Home Page",
        media: CgWebsite,
      };
    },
  },
});
