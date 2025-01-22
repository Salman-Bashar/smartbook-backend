import { StringRule, defineField, defineType } from "sanity";
import { portableText } from "../../_root/portable-text";
import { FaBlog, FaStar } from "react-icons/fa";
import { seo, seoGroup } from "../../_root/seo";
import { SiSanity } from "react-icons/si";
import { sectionsField } from "../../common/sections";
import { heroField } from "../../common/hero";

export default defineType({
  name: "blog",
  type: "document",
  title: "Blog",
  icon: FaBlog,
  groups: [
    seoGroup,
    {
      name: "content",
      title: "Content",
      icon: SiSanity,
    },
    {
      name: "featured",
      title: "Featured",
      icon: FaStar,
    },
  ],
  fields: [
    seo({
      slugOptions: { source: "title", isFixed: false, prefix: "blogs" },
      group: "seo",
      renderTitleInput: false,
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        "The title of the entity. This is used to generate the slug.",
      validation: (rule: StringRule) =>
        rule.required().error("Please provide the title."),
      group: ["content"],
    }),
    defineField({
      name: "isFeaturedBlog",
      title: "Featured Blog",
      description: "This blog will be featured in the blogs page.",
      type: "boolean",
      initialValue: false,
      group: "featured",
    }),
    heroField({ group: "content", required: true }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "A short description of the blog to be used in blog cards.",
      validation: (rule: StringRule) =>
        rule.required().error("Please provide a short description."),
      group: "content",
    }),
    defineField(
      portableText({
        name: "blogContent",
        title: "Blog Content",
        isRequired: true,
        group: "content",
      })
    ),
    sectionsField({ group: "content" }),
  ],
  preview: {
    select: {
      title: "title",
      isFeaturedBlog: "isFeaturedBlog",
    },
    prepare({ title, isFeaturedBlog }) {
      return {
        title: title,
        media: FaBlog,
        subtitle: isFeaturedBlog ? "Featured Blog" : "",
      };
    },
  },
});
