import { StructureBuilder } from "sanity/structure";
import { RxSection } from "react-icons/rx";
import { orderBy } from "lodash";
import { createDynamicDocumentStructure } from "../utils/create-document-structure";
import { buildableHeroSections } from "../../schemas";

export default function buildableHeroSectionsStructure(S: StructureBuilder) {
  return S.listItem()
    .title("Buildable Hero Sections")
    .icon(RxSection)
    .child(
      S.list()
        .title("Buildable Hero Sections")
        .items(
          orderBy(buildableHeroSections, "name", "asc").map((section) =>
            createDynamicDocumentStructure(
              section.name,
              section.title ? section.title : "Unnamed Section",
              S,
              section.icon
            )
          )
        )
    );
}
