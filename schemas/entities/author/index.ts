import { StringRule, defineField, defineType } from "sanity";
import { portableText } from "../../_root/portable-text";
import { seo } from "../../_root/seo";
import { BsPersonBoundingBox } from "react-icons/bs";
import { image } from "../../_root/media/image";
import { contentGroup, seoGroup } from "../../common/field-groups";

export default defineType({
  name: "author",
  type: "document",
  title: "Author",
  icon: BsPersonBoundingBox,
  groups: [seoGroup, contentGroup],
  fields: [
    defineField({
      name: "fullName",
      title: "Fullname",
      type: "string",
      description:
        "The fullname of the author. This is used to generate the slug.",
      validation: (rule: StringRule) =>
        rule.required().error("Please provide the fullname."),
      group: [contentGroup.name],
    }),
    seo({
      slugOptions: { source: "title", isFixed: false, prefix: "authors" },
      group: "seo",
      renderTitleInput: false,
    }),
    defineField(image({ name: "avatar", title: "Avatar", group: "content" })),
    defineField(
      portableText({
        name: "fullDescription",
        title: "Full Description",
        isRequired: true,
        group: [contentGroup.name],
      })
    ),
  ],
  preview: {
    select: {
      fullName: "fullName",
      avatar: "avatar.file",
    },
    prepare({ fullName, avatar }) {
      return {
        title: fullName,
        media: avatar || BsPersonBoundingBox,
        subtitle: "Author",
      };
    },
  },
});
