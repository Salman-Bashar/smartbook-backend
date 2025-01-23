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
    seo({
      slugOptions: { source: "_id", isFixed: false, prefix: "authors" },
      group: "seo",
      renderTitleInput: false,
    }),
    defineField({
      name: "fullName",
      title: "Fullname",
      type: "string",
      description: "The fullname of the author",
      validation: (rule: StringRule) =>
        rule.required().error("Please provide the fullname."),
      group: [contentGroup.name],
    }),
    defineField(
      image({ name: "avatar", title: "Avatar", group: [contentGroup.name] })
    ),
    defineField(
      portableText({
        name: "about",
        title: "About",
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
