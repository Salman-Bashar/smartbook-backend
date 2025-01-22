import { defineField } from "sanity";
import { seoConfigFields } from "../../_root/seo-config-fields";

export const globalSeoField = defineField({
  name: "globalSeo",
  title: "SEO",
  description:
    "Control sitewide SEO. These will overwrite corresponding settings defined at page level.",
  type: "object",
  fields: seoConfigFields({}),
  validation(rule) {
    return rule.required();
  },
  group: "seo",
});
