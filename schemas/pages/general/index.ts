import { defineType } from "sanity";
import { seo, seoGroup } from "../../_root/seo";
import { RiFoldersFill } from "react-icons/ri";
import { CgWebsite } from "react-icons/cg";
import { sectionsField } from "../../common/sections";
import { heroField } from "../../common/hero";
import { SiSanity } from "react-icons/si";

export default defineType({
  name: "generalPage",
  type: "document",
  title: "General Page",
  icon: RiFoldersFill,
  groups: [
    seoGroup,
    {
      name: "content",
      title: "Content",
      icon: SiSanity,
    },
  ],
  fields: [
    seo({
      slugOptions: { isFixed: false },
      group: "seo",
      renderTitleInput: true,
    }),
    heroField({ group: "content", required: true }),
    sectionsField({ group: "content" }),
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
