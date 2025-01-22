import { SanityDocument } from "@sanity/client";
import { fixedPagesArray } from ".";
import { getBaseUrl } from "../utils/get-base-url";
import { IWorkspace } from "../utils/types";

export function generatePreviewUrl(workspace: IWorkspace, doc: SanityDocument) {
  // Check if document has a slug
  const slug: string | null | undefined = doc.seo?.slug?.current;

  // If the slug is not set and doc is not a fixed page, disable `open preview`.
  if (!slug && !fixedPagesArray.includes(doc._type)) {
    return undefined;
  }

  const previewUrl = new URL(getBaseUrl(workspace));

  // Set frontend draft endpoint
  previewUrl.pathname = `/api/enable-draft`;

  // Set draft mode custom access secret
  previewUrl.searchParams.append(
    `secret`,
    import.meta.env.SANITY_STUDIO_PREVIEW_SECRET
  );

  // Set document type
  previewUrl.searchParams.append("type", doc._type);

  // Set page slug
  previewUrl.searchParams.append("slug", String(slug));

  return previewUrl.toString();
}
