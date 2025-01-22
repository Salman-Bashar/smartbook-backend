import { defineField } from "sanity";
import { IEditorFieldArgs } from "./interface";

export function editorTitle(args: IEditorFieldArgs) {
  return defineField({
    title: "Editor Title",
    name: "editorTitle",
    group: args.group,
    description:
      "This title is only used in the studio. Please use a title that will help you refer to this document from somewhere else in the studio.",
    type: "string",
    validation: (rule) => [rule.required()],
  });
}
