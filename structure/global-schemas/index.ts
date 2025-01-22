import { StructureBuilder } from "sanity/structure";
import { globalSchemas } from "../../schemas";
import { createSingleDocumentStructure } from "../utils/create-document-structure";

export default function globalSchemasStructure(S: StructureBuilder) {
  return globalSchemas.map((schema) =>
    createSingleDocumentStructure(schema.name, "Global Setting", S, schema.icon)
  );
}
