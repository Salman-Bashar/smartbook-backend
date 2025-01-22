import { defineConfig } from "sanity";
import { codeInput } from "@sanity/code-input";
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
import { Brand } from "./components/brand-icon";
import { imageHotspotArrayPlugin } from "sanity-plugin-hotspot-array";

const commonPlugins = [
  codeInput(),
  visionTool(),
  colorInput(),
  media(),
  imageHotspotArrayPlugin(),
];
const commonConfig = {
  schema: {
    types: schemaTypes,
  },
};

export default defineConfig([
  {
    name: "production-workspace",
    title: "Producion Workspace",
    projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
    dataset: "production",
    icon: Brand,
    plugins: [
      customDesktool("Starter: Production", "production"),
      ...commonPlugins,
    ],
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
  // {
  //   name: "development-workspace",
  //   title: "Development Workspace",
  //   projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  //   dataset: "development",
  //   plugins: [
  //     commonDesktoolSetup("Starter: Development", "development"),
  //     ...commonPlugins,
  //   ],
  //   document: {
  //     actions: (prev, context) => {
  //       return modifyDocumentActions(prev, context);
  //     },
  //     productionUrl: async (prev, context) => {
  //       return resolveProductionUrl(prev, context, "development");
  //     },
  //   },
  //   basePath: "/development",
  //   ...commonConfig,
  // },
]);
