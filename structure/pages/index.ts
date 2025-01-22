import { orderBy } from "lodash";
import { StructureBuilder } from "sanity/structure";
import {
  createDynamicDocumentStructure,
  createSingleDocumentStructure,
} from "../utils/create-document-structure";
import { dynamicPages, fixedPages } from "../../schemas";
import { IoDocuments } from "react-icons/io5";

export default function pagesStructure(S: StructureBuilder) {
  return S.listItem()
    .title("Pages")
    .icon(IoDocuments)
    .child(
      S.list()
        .title("Pages")
        .items([
          ...orderBy(fixedPages, "name", "asc").map((page) =>
            createSingleDocumentStructure(
              page.name,
              page.title ? page.title : "Unnamed Page",
              S,
              page.icon
            )
          ),
          S.divider(),
          ...orderBy(dynamicPages, "name", "asc").map((page) =>
            createDynamicDocumentStructure(
              page.name,
              page.title ? page.title : "Unnamed Page",
              S,
              page.icon
            )
          ),
        ])
    );
}
