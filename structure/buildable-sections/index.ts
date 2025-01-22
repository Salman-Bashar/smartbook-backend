import { StructureBuilder } from "sanity/structure";
import { RxSection } from "react-icons/rx";
import { orderBy } from "lodash";
import { buildableSections } from "../../schemas";
import { createDynamicDocumentStructure } from "../utils/create-document-structure";

export default function buildableSectionsStructure(S: StructureBuilder) {
  return S.listItem()
    .title("Buildable Sections")
    .icon(RxSection)
    .child(
      S.list()
        .title("Buildable Sections")
        .items(
          orderBy(buildableSections, "name", "asc").map((section) =>
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
