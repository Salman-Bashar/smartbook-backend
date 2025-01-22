import { Reference, defineField } from "sanity";
import { isValidLink, isLinkInputHidden } from "./util";
import { ISanityLink, LinkType } from "./interface";
import { referenceSchemaNames } from "./reference-schema-names";
import { LinkIcon } from "@sanity/icons";
/**
 * This function will return a link object schema. You have to provide
 * `isOptional` and `name` options.
 *
 * `name` is needed because you can't have multiple link fields in
 * sanity doc with the same name.
 *
 * `isOptional` is needed because it determines the fields and validation, hidden
 * functions for each field in the link object.
 *
 * In most cases you will want to use optional link.
 *
 * The validation rules in this function is **tried and tested**. Please consult
 * with the lead sanity dev before modifying this logic.
 *
 * @param args { Object } options
 * @returns Link object
 */
export function link(args: {
  name: string;
  title?: string;
  isOptional: boolean;
  group?: string | string[];
  hideLabel?: boolean;
}) {
  return defineField({
    type: "object",
    name: args.name,
    title: args.title,
    group: args.group,
    icon: LinkIcon,
    fields: [
      defineField({
        name: "addLink",
        title: "Add Link?",
        type: "boolean",
        initialValue: args.isOptional ? false : true,
        hidden: () => {
          if (args.isOptional) {
            return false;
          }
          return true;
        },
        validation: (Rule) => Rule.required(),
      }),
      // is disabled link option
      defineField({
        name: "disabled",
        title: "Disable Link?",
        type: "boolean",
        initialValue: false,
        hidden: ({ parent }) => {
          return isLinkInputHidden(args.isOptional, parent);
        },
        validation: (Rule) => Rule.required(),
      }),
      // open new tab option
      defineField({
        name: "openNewTab",
        title: "Open in new tab?",
        type: "boolean",
        initialValue: false,
        hidden: ({ parent }) => {
          if (parent && (parent as ISanityLink).disabled) {
            return true;
          }
          return isLinkInputHidden(args.isOptional, parent);
        },
        validation: (Rule) => Rule.required(),
      }),
      // label option
      defineField({
        name: "label",
        title: "Label",
        type: "string",
        hidden: ({ parent }) => {
          if (args.hideLabel == true) {
            return true;
          } else {
            return isLinkInputHidden(args.isOptional, parent);
          }
        },
        validation: (Rule) =>
          Rule.custom<string>((currentValue, { parent }) => {
            if (args.hideLabel) {
              return true;
            } else {
              const isValid = isValidLink(
                args.isOptional,
                currentValue,
                parent as ISanityLink
              );

              if (!isValid) {
                return "Required";
              }

              return true;
            }
          }),
      }),
      // link type option
      defineField({
        name: "type",
        title: "Type",
        type: "string",
        options: {
          layout: "radio",
          direction: "horizontal",
          list: [
            {
              title: "Internal",
              value: LinkType.Internal,
            },
            {
              title: "External",
              value: LinkType.External,
            },
          ],
        },
        initialValue: LinkType.External,
        hidden: ({ parent }) => {
          if (parent && (parent as ISanityLink).disabled) {
            return true;
          }
          return isLinkInputHidden(args.isOptional, parent);
        },
        validation: (Rule) =>
          Rule.custom<string>((currentValue, { parent }) => {
            if ((parent as ISanityLink).disabled) {
              return true;
            }
            const isValid = isValidLink(
              args.isOptional,
              currentValue,
              parent as ISanityLink
            );

            if (!isValid) {
              return "Required";
            }

            return true;
          }),
      }),
      // external link
      defineField({
        name: "href",
        title: "Link",
        type: "url",
        hidden: ({ parent }) => {
          if (parent && (parent as ISanityLink).disabled) {
            return true;
          }
          return isLinkInputHidden(args.isOptional, parent, "external");
        },
        validation: (Rule) =>
          Rule.custom<string>((currentValue, { parent }) => {
            if (parent && (parent as ISanityLink).disabled) {
              return true;
            }
            const isValid = isValidLink(
              args.isOptional,
              currentValue,
              parent as ISanityLink,
              LinkType.External
            );

            if (!isValid) {
              return "Required";
            }

            return true;
          })
            .uri({
              scheme: ["https", "mailto", "tel"],
            })
            .error(
              "Please provide a valid url. Use prefix 'https://' | 'mailto:' | 'tel:'."
            ),
      }),
      // internal link
      defineField({
        name: "reference",
        title: "Reference",
        type: "reference",
        to: referenceSchemaNames.map((type) => {
          return { type };
        }),
        options: {
          disableNew: true,
        },
        hidden: ({ parent }) => {
          if (parent && (parent as ISanityLink).disabled) {
            return true;
          }
          return isLinkInputHidden(args.isOptional, parent, "internal");
        },
        validation: (Rule) =>
          Rule.custom<Reference>((currentValue, { parent }) => {
            if (parent && (parent as ISanityLink).disabled) {
              return true;
            }
            const isValid = isValidLink(
              args.isOptional,
              currentValue,
              parent as ISanityLink,
              LinkType.Internal
            );

            if (!isValid) {
              return "Required";
            }

            return true;
          }),
      }),
    ],
    preview: {
      select: {
        title: "label",
        subtitle: "type",
      },
      prepare({ subtitle, title }) {
        return {
          title,
          subtitle:
            subtitle == LinkType.Internal ? "Internal Link" : "External Link",
          media: LinkIcon,
        };
      },
    },
  });
}
