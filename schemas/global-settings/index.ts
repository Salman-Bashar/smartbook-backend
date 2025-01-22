import { defineType } from "sanity";
import { FiSettings } from "react-icons/fi";
import { globalSeoField } from "./global-seo";
import { seoGroup } from "../common/field-groups";

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
  groups: [seoGroup],
  fields: [globalSeoField],
  preview: {
    prepare() {
      return {
        title: "Global Settings",
      };
    },
  },
});
