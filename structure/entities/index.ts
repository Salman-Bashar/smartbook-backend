import { entitiesWthPages, entitiesWithoutPages } from "./../../schemas/index";
import { StructureBuilder } from "sanity/structure";
import { createDynamicDocumentStructure } from "../utils/create-document-structure";
import { RiFoldersFill } from "react-icons/ri";
import { orderBy } from "lodash";

export default function entitiesStructure(S: StructureBuilder) {
  return S.listItem()
    .title("Entities")
    .icon(RiFoldersFill)
    .child(
      S.list()
        .title("Entities")
        .items([
          ...orderBy(
            [...entitiesWthPages, ...entitiesWithoutPages],
            "name",
            "asc"
          ).map((entity) =>
            createDynamicDocumentStructure(
              entity.name,
              entity.title ? entity.title : "Unnamed Entity",
              S,
              entity.icon
            )
          ),
        ])
    );
}
