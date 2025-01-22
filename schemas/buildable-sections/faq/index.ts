import { defineArrayMember, defineField, defineType } from "sanity";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import faqItem from "./faq-item";
import { textComponent } from "../../common/text-component";
import { editorTitle } from "../../common/editor-title";

export default defineType({
  name: "faqSection",
  type: "document",
  title: "FAQ Section",
  icon: MdOutlineQuestionAnswer,
  fields: [
    editorTitle({}),
    defineField(textComponent({})),
    defineField({
      name: "faqItems",
      title: "Faq Items",
      type: "array",
      of: [defineArrayMember(faqItem)],
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .error("Please provide at least one FAQ for the FAQ section"),
    }),
  ],
  preview: {
    select: {
      title: "editorTitle",
      faqItems: "faqItems",
    },
    prepare({ title, faqItems }) {
      const faqItemCount =
        faqItems && faqItems.length
          ? String(faqItems.length).padStart(2, "0")
          : 0;
      return {
        media: MdOutlineQuestionAnswer,
        title: title,
        subtitle: `FAQ | Item Count: ${faqItemCount}`,
      };
    },
  },
});
