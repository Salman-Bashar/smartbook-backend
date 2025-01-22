import pluralize from "pluralize";
import { StructureBuilder } from "sanity/structure";

/**
 * This function returns a single sanity structure.
 * This is used to render a single document instead of a list of documents.
 * @param schemaName
 * @param title
 * @param S
 * @returns
 */
export function createSingleDocumentStructure(
  schemaName: string,
  title: string,
  S: StructureBuilder,
  icon?: React.ComponentType | React.ReactNode
) {
  if (icon !== undefined) {
    return S.documentListItem()
      .icon(icon)
      .schemaType(schemaName)
      .id(schemaName)
      .title(title);
  } else {
    return S.documentListItem()
      .schemaType(schemaName)
      .id(schemaName)
      .title(title);
  }
}

/**
 * This function returns a single sanity structure.
 * This is used to render a list of documents.
 * @param schemaName
 * @param title
 * @param S
 * @returns
 */
export function createDynamicDocumentStructure(
  schemaName: string,
  title: string,
  S: StructureBuilder,
  icon?: React.ComponentType | React.ReactNode
) {
  if (icon !== undefined) {
    return S.documentTypeListItem(schemaName)
      .title(pluralize(title))
      .icon(icon);
  } else {
    return S.documentTypeListItem(schemaName).title(pluralize(title));
  }
}
