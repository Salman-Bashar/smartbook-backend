import { IWorkspace } from "./types";

export function getBaseUrl(workspace: IWorkspace) {
  switch (workspace) {
    case "production": {
      return import.meta.env.SANITY_STUDIO_PREVIEW_URL;
    }
    default: {
      const exhaustiveCheck: never = workspace;
      throw new Error(`Unhandled dataset: ${exhaustiveCheck}`);
    }
  }
}
