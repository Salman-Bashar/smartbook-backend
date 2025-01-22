import { defineField, defineType } from "sanity";
import { FaQuestion } from "react-icons/fa";
import { portableText } from "../../../_root/portable-text";

export default defineType({
  name: "faqItem",
  type: "object",
  title: "FAQ",
  fields: [
    defineField({
      name: "question",
      type: "string",
      title: "Question",
      validation: (rule) => rule.required(),
    }),
    defineField(
      portableText({ name: "answer", isRequired: true, title: "Answer" })
    ),
  ],
  preview: {
    select: {
      question: "question",
    },
    prepare({ question }) {
      return {
        title: question,
        media: FaQuestion,
      };
    },
  },
});
