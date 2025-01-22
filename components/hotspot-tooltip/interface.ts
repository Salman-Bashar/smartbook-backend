import { SanityReference } from "@sanity/client";
import { SanityDocument, SchemaType } from "sanity";
import { HotspotTooltipProps } from "sanity-plugin-hotspot-array";

/**
 * In order to render the tooltip preview, the caller has to provide
 * the following data.
 *
 * - hotspotItemSchemaType: For documents, this can be fetched using `useSchema().get($schemaName)` .
 *   For local schemas, you can import and pass the schema object as the
 *   value for this field.
 * - hotspotItem: The item being previewed. This has to be taken from the `value` prop.
 */
export interface IHotspotPreviewTooltip extends HotspotTooltipProps {
  hotspotItemSchemaType: SchemaType | undefined;
  hotspotItem: SanityReference | SanityDocument | undefined;
}
