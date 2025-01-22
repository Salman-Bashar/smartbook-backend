import { orderBy } from "lodash";
import { defineField } from "sanity";
import { IHeroFieldArgs } from "./interface";

/**
 * This array contains the names of hero schemas.
 *
 * Please update this array when new hero sections are created.
 */
const heroes = orderBy(
  [{ title: "Primary Hero Section", name: "primaryHeroSection" }],
  "name",
  "asc"
);

/**
 * This function exports a hero field to link a hero to a page.
 */
export function heroField(args: IHeroFieldArgs) {
  return defineField({
    name: "hero",
    title: "Hero",
    type: "reference",
    group: args.group,
    to: heroes.map(({ title, name }) => {
      return { type: name, title: title };
    }),
    validation: (rule) =>
      rule.custom((value) => {
        if (args.required) {
          if (!value) {
            return "Required";
          }
        }
        return true;
      }),
  });
}
