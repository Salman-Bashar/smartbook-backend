import {
  DocumentActionComponent,
  DocumentActionsContext,
  TemplateItem,
} from "sanity";
import { fixedPages, layouts, globalSchemas } from "../schemas";

const fixedSchemaNames: string[] = [
  ...fixedPages,
  ...layouts,
  ...globalSchemas,
].map((schema) => schema.name);

// Restrict ["delete", "duplicate", "unpublish"] action from fixed schemas
export function modifyDocumentActions(
  prev: DocumentActionComponent[],
  context: DocumentActionsContext
) {
  if (fixedSchemaNames.includes(context.schemaType)) {
    return prev.filter((originalAction: DocumentActionComponent) => {
      const action = originalAction.action;
      if (action) {
        return !["delete", "duplicate", "unpublish"].includes(action);
      }
    });
  }

  return prev;
}

// Prevent new doc creation option for specified schemas.
// Update the `targetSchemas` with the names of the schemas that
// the editors should not be able to create.
export function modifyNewDocumentOptions(prev: TemplateItem[]) {
  const targetSchemas = [...fixedSchemaNames, "media.tag"];

  const options = prev.filter((previousOption) => {
    return !targetSchemas.includes(previousOption.templateId);
  });

  return options;
}
