import { ResolveProductionUrlContext } from "sanity";
import { fixedPages, dynamicPages, entitiesWthPages } from "../schemas";
import { IWorkspace } from "../utils/types";
import { generatePreviewUrl } from "./generate-preview-url";

/**
 * We have to export the fixed pages array separately as it is needed in
 * a few other places. Such as `generate-preview-url` file and `sanity-config` file.
 *
 * If any other document type is needed for especial functionality you can export it
 * separately.
 */
export const fixedPagesArray: string[] = fixedPages.map((page) => page.name);

export const documentsWithPagesArray: string[] = [
  ...fixedPages,
  ...dynamicPages,
  ...entitiesWthPages,
].map((page) => page.name);

export async function resolveProductionUrl(
  prev: string | undefined,
  context: ResolveProductionUrlContext,
  workspace: IWorkspace
) {
  const { getClient, document } = context;

  /**
   * This if condition decides if a document will have the `open preview` option.
   * Returning `prev` means the `Open Preview` option is not available.
   */
  if (documentsWithPagesArray.includes(document._type)) {
    const doc = await getClient({
      apiVersion: import.meta.env.SANITY_STUDIO_API_VERSION,
    }).fetch(`*[_type == $type && _id == $id][0]`, {
      type: document._type,
      id: document._id,
    });

    if (doc) {
      const previewUrl = generatePreviewUrl(workspace, doc);

      return previewUrl || prev;
    }

    return prev;
  }

  return prev;
}
