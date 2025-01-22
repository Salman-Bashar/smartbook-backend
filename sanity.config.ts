import { defineConfig } from "sanity";
import { colorInput } from "@sanity/color-input";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./schemas";
import { resolveProductionUrl } from "./resolve-production-url";
import {
  modifyDocumentActions,
  modifyNewDocumentOptions,
} from "./document-config";
import { customDesktool } from "./plugins/custom-desktool";
import { GiBookAura } from "react-icons/gi";

const commonPlugins = [visionTool(), colorInput(), media()];
const commonConfig = {
  schema: {
    types: schemaTypes,
  },
};

export default defineConfig([
  {
    name: "production-workspace",
    title: "Production Workspace",
    projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
    dataset: "production",
    icon: GiBookAura,
    plugins: [customDesktool("SmartBook", "production"), ...commonPlugins],
    document: {
      actions: (prev, context) => {
        return modifyDocumentActions(prev, context);
      },
      productionUrl: async (prev, context) => {
        return resolveProductionUrl(prev, context, "production");
      },
      newDocumentOptions: (prev) => {
        return modifyNewDocumentOptions(prev);
      },
    },
    basePath: "/production",
    ...commonConfig,
  },
]);
