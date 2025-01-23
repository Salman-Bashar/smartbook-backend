import { StringRule, defineArrayMember, defineField, defineType } from "sanity";
import { portableText } from "../../_root/portable-text";
import { seo } from "../../_root/seo";
import { GiWhiteBook } from "react-icons/gi";
import { image } from "../../_root/media/image";
import { contentGroup, seoGroup } from "../../common/field-groups";
import { priceInfo } from "./price-info";
import { userFeedback } from "./user-feedback";

export default defineType({
  name: "book",
  type: "document",
  title: "Book",
  icon: GiWhiteBook,
  groups: [seoGroup, contentGroup],
  fields: [
    seo({
      slugOptions: { source: "_id", isFixed: false, prefix: "books" },
      group: "seo",
      renderTitleInput: false,
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The title of the book.",
      validation: (rule: StringRule) =>
        rule.required().error("Please provide the title."),
      group: [contentGroup.name],
    }),
    defineField(
      image({
        name: "cover",
        title: "Book Cover",
        group: [contentGroup.name],
        validation: (rule) =>
          rule.required().error("Please provide the cover image."),
      })
    ),
    defineField(
      portableText({
        name: "description",
        title: "Description",
        isRequired: true,
        group: [contentGroup.name],
      })
    ),
    defineField({
      name: "authors",
      title: "Author(s)",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "author" }] })],
      validation: (rule) =>
        rule.required().min(1).error("Please provide at least one author."),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        defineArrayMember({ type: "reference", to: [{ type: "category" }] }),
      ],
    }),

    priceInfo({ group: [contentGroup.name] }),

    defineField({
      name: "feedbacks",
      title: "Feedbacks",
      type: "array",
      of: [defineArrayMember(userFeedback)],
    }),
  ],
  preview: {
    select: {
      title: "title",
      cover: "cover.file",
    },
    prepare({ title, cover }) {
      return {
        title,
        media: cover || GiWhiteBook,
        subtitle: "Book",
      };
    },
  },
});
