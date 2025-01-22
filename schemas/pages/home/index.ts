import { defineType } from "sanity";
import { seo, seoGroup } from "../../_root/seo";
import { sectionsField } from "../../common/sections";
import { CgWebsite } from "react-icons/cg";
import { heroField } from "../../common/hero";
import { SiSanity } from "react-icons/si";

export default defineType({
  name: "homePage",
  type: "document",
  title: "Home",
  icon: CgWebsite,
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
      slugOptions: { isFixed: true },
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
        subtitle: "Home Page",
        media: CgWebsite,
      };
    },
  },
});
