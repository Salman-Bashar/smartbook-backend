import { defineField } from "sanity";

export function schemaMarkupDefinitions(args: { group?: string }) {
  return defineField({
    name: "schemaMarkupDefinitions",
    title: "Schema Markup Definitions",
    type: "array",
    group: args.group,
    of: [
      defineField({
        name: "schemaMarkup",
        title: "Schema Markup",
        type: "code",
        description:
          "You can validate your structured data in this link 'https://validator.schema.org/'",
        options: {
          language: "json",
          languageAlternatives: [
            {
              title: "JSON",
              value: "json",
            },
          ],
        },
      }),
    ],
  });
}
