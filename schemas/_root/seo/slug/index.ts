import { ISanitySlug } from "./interface";
import { defineField } from "sanity";
import { Slug } from "sanity";
import { generalPagesRestrictedSlugs } from "./restricted-slugs";
import SlugInput from "../../../../components/slug-input";

export function slugify(slug: string) {
  return (
    slug
      .toLowerCase()
      .replace(/[^A-Za-z0-9&/\s]/g, "")
      // Trimming after replacing all specified special symbols will prevent any unwanted "-" at the end of the slug
      .trim()
      .replace(/&/g, "and")
      .replace(/\//g, "or")
      .replace(/\s+/g, "-")
      .slice(0, 200)
  );
}

/**
 * This is a reusable slug field to page schemas.
 *
 * source: (optional) if provided the slug will generate from the given field name.
 * isFixed: boolean.
 *
 * To manage validation against fixed pages we have to maintain an enum `FixedPageSlugs` with the routes
 * of all the fixed pages.
 * @param source: (optional) If provided the slug will generate from the given field name
 * @param isFixed: Fixed Pages will not have a slug. Their slug will be fixed in the front-end.
 * @returns
 */
export function slug({ source, isFixed, group, prefix }: ISanitySlug) {
  return defineField(
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      group: group,
      options: {
        source: source,
        slugify: (input: string) => {
          return `${encodeURI(slugify(input))}`;
        },
        prefix,
        isFixed,
      },
      components: { input: SlugInput },
      validation: (rule) =>
        rule.custom<Slug>((currentValue, { document }) => {
          if (!isFixed) {
            if (currentValue !== undefined) {
              const slug = currentValue.current;

              if (slug.indexOf(" ") !== -1) {
                return "Please do not use spaces in a slug.";
              }

              if (slug.indexOf("/") !== -1) {
                return "Please remove any `/` from the slug.";
              }

              /**
               * Check if the slug matches any slug in the restrictions list.
               * This is used to prevent duplicate urls, incase we have fixed
               * hardcoded pages.
               */
              if (document) {
                if (document._type == "generalPage") {
                  if (
                    generalPagesRestrictedSlugs.includes(currentValue.current)
                  ) {
                    return "This is a reserved slug. Please use a different slug.";
                  }
                }
              }

              return true;
            } else {
              return "Please provide the url to this content.";
            }
          }
          return true;
        }),
    },
    /**
     * SlugInput component adds customizations to the schema that are not part of sanity core.
     * We are using `strict: false`, as it allows unknown properties, in this case "prefix," in the schema.
     * For a more type safe approach check into defineField & https://www.typescriptlang.org/docs/handbook/declaration-merging.html
     */
    { strict: false }
  );
}
