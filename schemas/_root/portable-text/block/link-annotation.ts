import { link } from "../../link";

export const linkAnnotation = {
  ...link({ isOptional: false, name: "link" }),
  fields: [
    ...link({ isOptional: false, name: "link", hideLabel: true }).fields.filter(
      (fields) => fields.name !== "disabled"
    ),
  ],
  // This option settings makes it easier to work in links in the portable
  // text editor.
  options: {
    modal: {
      type: "dialog",
    },
  },
};
