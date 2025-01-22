import { orderBy } from "lodash";
import { Rule, defineField } from "sanity";
import { ISectionsFieldArgs } from "./interface";

/**
 * This array contains the names of sections schemas.
 *
 * Please update this array when new sections are created.
 */
const sections = orderBy(
  [
    {
      title: "Faq Section",
      name: "faqSection",
    },
    {
      title: "Rich Text Section",
      name: "richTextSection",
    },
  ],
  "name",
  "asc"
);

/**
 * This function exports a sections field to link sections to pages.
 */
export function sectionsField(args: ISectionsFieldArgs) {
  return defineField({
    name: "sections",
    title: "Page Sections",
    type: "array",
    group: args.group,
    of: sections.map(({ title, name }) => {
      return {
        type: "reference",
        to: [{ type: name }],
        name: name,
        title: title,
        validation: (rule: Rule) =>
          rule.required().error("Please select a section."),
      };
    }),
  });
}
