import { orderBy } from "lodash";
import { miscellaneous } from "./../../schemas/index";
import { StructureBuilder } from "sanity/structure";
import { createDynamicDocumentStructure } from "../utils/create-document-structure";
import { VscSymbolMisc } from "react-icons/vsc";

export default function miscellaneousStructure(S: StructureBuilder) {
  return S.listItem()
    .title("Miscellaneous")
    .icon(VscSymbolMisc)
    .child(
      S.list()
        .title("Miscellaneous")
        .items([
          ...orderBy(miscellaneous, "name", "asc").map((item) =>
            createDynamicDocumentStructure(
              item.name,
              item.title ? item.title : "Unnamed Entity",
              S,
              item.icon
            )
          ),
        ])
    );
}
