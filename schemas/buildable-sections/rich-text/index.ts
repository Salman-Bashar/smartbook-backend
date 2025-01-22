import { defineField, defineType } from "sanity";
import { BsFileRichtextFill } from "react-icons/bs";
import { portableText } from "../../_root/portable-text";
import { editorTitle } from "../../common/editor-title";

export default defineType({
  name: "richTextSection",
  type: "document",
  title: "Rich Text Section",
  icon: BsFileRichtextFill,
  fields: [
    defineField(editorTitle({})),
    defineField(
      portableText({
        isRequired: true,
        name: "content",
      })
    ),
  ],
  preview: {
    select: {
      title: "editorTitle",
    },
    prepare({ title }) {
      return {
        title,
        subtitle: "Rich Text Section",
        media: BsFileRichtextFill,
      };
    },
  },
});
