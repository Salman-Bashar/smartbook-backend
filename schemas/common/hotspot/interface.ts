import {
  FieldDefinition,
  ObjectRule,
  SanityDocument,
  ValidationBuilder,
} from "sanity";

export interface IHotspotField {
  name: string;
  title: string;
  description?: string;
  group?: string | string[];
  hotspotsField: FieldDefinition;
  validation?: ValidationBuilder<ObjectRule, Record<string, unknown>>;
  hidden?: (
    parent: SanityDocument | undefined,
    document: SanityDocument | undefined
  ) => boolean;
}
