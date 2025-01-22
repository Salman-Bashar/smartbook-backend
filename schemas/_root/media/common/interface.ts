import { ObjectRule, SanityDocument, ValidationBuilder } from "sanity";

export interface IMediaOptions {
  name?: string;
  title?: string;
  group?: string | string[];
  description?: string;
  hidden?: (
    parent: SanityDocument | undefined,
    document: SanityDocument | undefined
  ) => boolean;
  validation?: ValidationBuilder<ObjectRule, Record<string, unknown>>;
}
