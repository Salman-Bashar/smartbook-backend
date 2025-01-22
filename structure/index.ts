import { StructureBuilder } from "sanity/structure";
import pagesStructure from "./pages";
import entitiesStructure from "./entities";
import buildableSectionsStructure from "./buildable-sections";
import buildableHeroSectionsStructure from "./buildable-hero-sections";
import layoutsStructure from "./layouts";
import globalSchemasStructure from "./global-schemas";

/**
 * This function is responsible for controlling the studio structure.
 * Only the schemas defined here will show up in the studio page.
 * @param S
 * @returns
 */
export default function structuredItems(S: StructureBuilder) {
  return [
    ...globalSchemasStructure(S),
    layoutsStructure(S),
    S.divider(),
    pagesStructure(S),
    buildableHeroSectionsStructure(S),
    buildableSectionsStructure(S),
    S.divider(),
    entitiesStructure(S),
  ];
}
