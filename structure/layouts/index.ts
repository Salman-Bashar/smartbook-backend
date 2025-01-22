import { orderBy } from "lodash";
import { layouts } from "./../../schemas/index";
import { StructureBuilder } from "sanity/structure";
import { createSingleDocumentStructure } from "../utils/create-document-structure";
import { AiOutlineLayout } from "react-icons/ai";

export default function layoutsStructure(S: StructureBuilder) {
  return S.listItem()
    .title("Layout")
    .icon(AiOutlineLayout)
    .child(
      S.list()
        .title("Layout")
        .items([
          ...orderBy(layouts, "name", "desc").map((layout) =>
            createSingleDocumentStructure(
              layout.name,
              layout.title ? layout.title : "Unnamed Layout",
              S,
              layout.icon
            )
          ),
        ])
    );
}
