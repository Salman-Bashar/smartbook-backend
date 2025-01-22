import { Reference, SanityDocument } from "sanity";

export type ISanityLinkType = "internal" | "external";

export enum LinkType {
  Internal = "internal",
  External = "external",
}

export interface ISanityLink extends SanityDocument {
  addLink: boolean;
  disabled: boolean;
  openNewTab: boolean;
  label?: string;
  type?: ISanityLinkType;
  reference?: Reference;
  href?: string;
}
