import { defineField } from "sanity";

type Props = {
  group?: string | string[];
};

export function priceInfo({ group }: Props) {
  return defineField({
    name: "priceInfo",
    title: "Price Info",
    type: "object",
    group: group,
    fields: [
      defineField({
        name: "regularPrice",
        title: "Regular Price",
        type: "number",
        initialValue: 0,
        description: "The regular price of the book.",
        validation: (rule) => rule.required().min(0),
      }),
      defineField({
        name: "hasDiscount",
        title: "Has Discount",
        type: "boolean",
        initialValue: false,
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: "discountPrice",
        title: "Discount Price",
        type: "number",
        initialValue: 0,
        description: "The discounted price of the book.",
        hidden: ({ parent }) => !parent.hasDiscount,
        validation: (rule) =>
          rule.custom((currentValue, { parent }) => {
            const typedParent = parent as {
              hasDiscount: boolean;
              regularPrice: number;
            };
            if (typedParent.hasDiscount) {
              if (!currentValue) {
                return "Please provide the discount price.";
              } else if (currentValue >= typedParent.regularPrice) {
                return "Discount price must be lower than the regular price.";
              }
            }
            return true;
          }),
      }),
      defineField({
        name: "discountText",
        title: "Discount Text",
        type: "string",
        description: "An optional text to show for the discount.",
        hidden: ({ parent }) => !parent.hasDiscount,
      }),
    ],
  });
}
