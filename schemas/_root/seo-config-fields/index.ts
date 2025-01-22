import { defineField } from "sanity";

export function seoConfigFields(args: { group?: string }) {
  return [
    defineField({
      name: "disableIndex",
      title: "Disable search indexing",
      description:
        "Turn ON to prevent this page from showing up in search engine results (noindex).",
      type: "boolean",
      initialValue: false,
      validation(rule) {
        return rule.required();
      },
      group: args.group,
    }),
    defineField({
      name: "disableFollow",
      title: "Disable link following",
      description:
        "Turn ON to instruct search engines not to follow links on this page (nofollow).",
      type: "boolean",
      initialValue: false,
      validation(rule) {
        return rule.required();
      },
      group: args.group,
    }),
    defineField({
      name: "disableImageIndex",
      title: "Disable image indexing",
      description:
        "Turn ON to prevent images on this page from being indexed and shown in search results.",
      type: "boolean",
      initialValue: false,
      validation(rule) {
        return rule.required();
      },
      group: args.group,
    }),
    defineField({
      name: "disableSnippet",
      title: "Disable search result snippet",
      description:
        "Turn ON to prevent search engines from displaying a snippet (description) of this page's content in search results.",
      type: "boolean",
      initialValue: false,
      validation(rule) {
        return rule.required();
      },
      group: args.group,
    }),
  ];
}
