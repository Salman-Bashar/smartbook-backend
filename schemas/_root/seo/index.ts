import { slug } from "./slug";
import { ISanitySlug } from "./slug/interface";
import { defineField, ObjectRule, StringRule } from "sanity";
import { openGraph } from "./open-graph";
import { otherSeoData } from "./other";
import { link } from "../link";
import { seoConfigFields } from "../seo-config-fields";
import { seoGroup } from "../../common/field-groups";

interface SEOInputArgs {
  slugOptions: ISanitySlug;
  group?: string | string[];
  renderTitleInput: boolean;
}

/**
 * This function exports the main data schema. This should be used in all schemas
 * that will be used to build a page.
 *
 * @param slugOptions: Sanity slug options.
 * @param group: (optional) The group this schema belongs to.
 */
export function seo(args: SEOInputArgs) {
  const titleField = defineField({
    name: "title",
    title: "Title",
    type: "string",
    validation: (rule: StringRule) => [
      rule.required().error("Required"),
      rule
        .max(60)
        .warning(
          "It is recommended keep the main title between 30 and 50 characters."
        ),
    ],
    group: "main",
  });

  const seoField = defineField({
    name: "seo",
    title: "SEO",
    type: "object",
    group: args.group || seoGroup.name,
    groups: [
      {
        name: "main",
        title: "Main",
        default: true,
      },
      {
        name: "openGraph",
        title: "Open Graph",
      },
      {
        name: "otherSeoData",
        title: "Others",
      },
    ],
    fields: [
      slug({
        source: args.slugOptions.source ? args.slugOptions.source : "seo.title",
        ...args.slugOptions,
        group: "main",
      }),
      defineField({
        name: "description",
        title: "Description",
        type: "text",
        rows: 3,
        validation: (rule: StringRule) => [
          rule
            .required()
            .warning("Please provide a description to improve SEO scores."),
          rule
            .max(160)
            .warning(
              "It is recommended to keep the main description below 160 characters."
            ),
        ],
        group: "main",
      }),
      ...seoConfigFields({ group: "main" }),
      defineField({
        name: "redirect",
        title: "Redirect",
        type: "url",
        validation: (rule) => [rule.uri({ scheme: ["https"] })],
        group: "main",
      }),
      defineField({
        name: "canonicalLink",
        title: "Canonical Link",
        type: "object",
        fields: [
          ...link({
            isOptional: true,
            name: "canonicalLink",
            title: "Canonical Link",
            hideLabel: true,
          }).fields.filter(
            (field) => field.name !== "openNewTab" && field.name !== "disabled"
          ),
        ],
        group: "main",
      }),
      defineField({ ...openGraph, group: "openGraph" }),
      defineField({ ...otherSeoData, group: "otherSeoData" }),
    ],
    validation: (rule: ObjectRule) => rule.required(),
  });

  if (args.renderTitleInput) {
    seoField.fields.unshift(titleField);
  }

  return seoField;
}
