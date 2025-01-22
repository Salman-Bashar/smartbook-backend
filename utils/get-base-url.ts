import { IWorkspace } from "./types";

export function getBaseUrl(workspace: IWorkspace) {
  switch (workspace) {
    case "development": {
      return import.meta.env.SANITY_STUDIO_PREVIEW_URL_DEVELOP;
    }
    case "production": {
      return import.meta.env.SANITY_STUDIO_PREVIEW_URL_PRODUCTION;
    }
    default: {
      const exhaustiveCheck: never = workspace;
      throw new Error(`Unhandled dataset: ${exhaustiveCheck}`);
    }
  }
}
