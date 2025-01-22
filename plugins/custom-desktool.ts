import { SanityDocument } from "sanity";
import { Iframe } from "sanity-plugin-iframe-pane";
import { View, ViewBuilder, structureTool } from "sanity/structure";
import { documentsWithPagesArray } from "../resolve-production-url";
import { generatePreviewUrl } from "../resolve-production-url/generate-preview-url";
import structuredItems from "../structure";
import { IWorkspace } from "../utils/types";
import DocumentsPane from "sanity-plugin-documents-pane";

export function customDesktool(title: string, workspace: IWorkspace) {
  return structureTool({
    defaultDocumentNode: (S, { schemaType }) => {
      const views: (View | ViewBuilder)[] = [
        S.view.form(),
        S.view
          .component(DocumentsPane)
          .options({
            query: `*[references($id)]`,
            params: { id: `_id` },
            options: { perspective: "previewDrafts" },
          })
          .title("Incoming References"),
      ];

      if (documentsWithPagesArray.includes(schemaType)) {
        views.push(
          S.view
            .component(Iframe)
            .options({
              url: (doc: SanityDocument) => generatePreviewUrl(workspace, doc),
              showDisplayUrl: false,
            })
            .title("Preview")
        );
      }

      return S.document().views(views);
    },
    structure: (S) =>
      S.list()
        .title(title)
        .items([...structuredItems(S)]),
  });
}
