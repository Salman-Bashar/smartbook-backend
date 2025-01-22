import { defineArrayMember, defineField } from "sanity";
import { link } from "../../_root/link";
import { ITextComponentArgs } from "./interface";
import { SiSanity } from "react-icons/si";
import { MdStyle } from "react-icons/md";

export function textComponent(args: ITextComponentArgs) {
  return defineField({
    name: "textComponent",
    type: "object",
    title: "Text Component",
    description: "Provide the content for the text component of this section",
    group: args.group,
    groups: [
      {
        name: "content",
        title: "Content",
        icon: SiSanity,
        default: true,
      },
      {
        name: "style",
        title: "Style",
        icon: MdStyle,
      },
    ],
    fields: [
      defineField({
        name: "overline",
        type: "string",
        title: "Overline",
        group: "content",
      }),
      defineField({
        name: "title",
        type: "string",
        title: "Title",
        validation: (rule) => rule.required(),
        group: "content",
      }),
      defineField({
        name: "description",
        type: "text",
        title: "Description",
        rows: 6,
        group: "content",
      }),
      defineField({
        name: "buttons",
        type: "array",
        title: "Buttons",
        description: "Render link buttons after the description block.",
        of: [
          defineArrayMember(
            link({ name: "button", isOptional: false, title: "Button" })
          ),
        ],
        validation: (rule) => rule.max(4).error("Maximum Items: 04"),
        group: "content",
      }),
      defineField({
        name: "alignment",
        type: "string",
        title: "Alignment",
        description: "Control the horizontal aligment of all the elements.",
        options: {
          list: [
            { title: "Start", value: "start" },
            { title: "Center", value: "center" },
            { title: "End", value: "end" },
          ],
          layout: "radio",
          direction: "horizontal",
        },
        initialValue: "start",
        group: "style",
      }),
      defineField({
        name: "style",
        type: "string",
        title: "Style",
        description: "This controls additional styling attributes.",
        options: {
          list: [
            { title: "Default", value: "default" },
            { title: "Light", value: "light" },
          ],
          layout: "radio",
          direction: "horizontal",
        },
        initialValue: "default",
        group: "style",
      }),
    ],
    options: {
      collapsed: true,
    },
  });
}
