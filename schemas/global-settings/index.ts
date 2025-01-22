import { defineType } from "sanity";
import { FiSettings } from "react-icons/fi";
import { FaCode, FaGlobe } from "react-icons/fa";
import { schemaMarkupDefinitions } from "../_root/schema-markup-definitions";
import { globalSeoField } from "./global-seo";

/**
 * This document will hold all kinds of global settings data.
 *
 * For example:
 * - Social Links to show on header and footer
 * - Submission link for all kinds of forms (if required)
 */
export default defineType({
  name: "globalSettings",
  title: "Global Settings",
  type: "document",
  icon: FiSettings,
  groups: [
    {
      name: "seo",
      title: "SEO",
      icon: FaGlobe,
      default: true,
    },
    {
      name: "schemaMarkupDefinitions",
      title: "Schema Markup Definitions",
      icon: FaCode,
    },
  ],
  fields: [
    globalSeoField,
    schemaMarkupDefinitions({ group: "schemaMarkupDefinitions" }),
  ],
  preview: {
    prepare() {
      return {
        title: "Global Settings",
      };
    },
  },
});
