import { StringRule, defineArrayMember, defineField, defineType } from "sanity";
import { FaBookReader } from "react-icons/fa";
import { image } from "../../_root/media/image";

export default defineType({
  name: "user",
  type: "document",
  title: "User",
  icon: FaBookReader,
  fields: [
    defineField({
      name: "fullName",
      title: "Fullname",
      type: "string",
      description:
        "The fullname of the author. This is used to generate the slug.",
      validation: (rule: StringRule) =>
        rule.required().error("Please provide the fullname."),
    }),
    defineField({
      name: "emailAddress",
      title: "Email Address",
      type: "string",
      description: "The email address of the user. This is used to login.",
      validation: (rule: StringRule) => rule.required().email(),
    }),
    defineField({
      name: "password",
      title: "Password",
      type: "string",
      description: "The password of the user. This is used to login.",
      validation: (rule: StringRule) => rule.required().min(8),
    }),
    defineField(image({ name: "avatar", title: "Avatar" })),
    defineField({
      name: "preferences",
      title: "Preferences",
      type: "array",
      of: [
        defineArrayMember({ type: "reference", to: [{ type: "category" }] }),
      ],
    }),

    // ToDO: Add field - library

    defineField({
      name: "points",
      title: "Points",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
  ],
  preview: {
    select: {
      fullName: "fullName",
      avatar: "avatar.file",
    },
    prepare({ fullName, avatar }) {
      return {
        title: fullName,
        media: avatar || FaBookReader,
        subtitle: "User",
      };
    },
  },
});
