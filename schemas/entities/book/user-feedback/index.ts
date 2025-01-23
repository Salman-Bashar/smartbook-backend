import { defineField } from "sanity";
import { VscFeedback } from "react-icons/vsc";

export const userFeedback = defineField({
  name: "userFeedback",
  title: "User Feedback",
  type: "object",
  fields: [
    defineField({
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "user" }],
      options: {
        disableNew: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: "comment",
      title: "Comment",
      type: "text",
      rows: 5,
      validation: (rule) => rule.max(500),
    }),
  ],
  preview: {
    select: {
      fullName: "user.fullName",
      avatar: "user.avatar.file",
      rating: "rating",
    },
    prepare({ fullName, avatar, rating }) {
      return {
        title: fullName,
        media: avatar || VscFeedback,
        subtitle: `Rating: ${rating}`,
      };
    },
  },
});
