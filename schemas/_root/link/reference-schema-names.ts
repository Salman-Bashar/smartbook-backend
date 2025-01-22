/**
 * This array will be used to link to references of internal pages.
 * This will need to updated once we have more documents/entities.
 * Make sure to only have references with slugs.
 *
 * We can't import a array const from `schemas/index` file beacause sanity does
 * not allow it.
 *
 * TODO: Look for a better way to get array of reference docs.
 */
export const referenceSchemaNames = ["homePage", "generalPage", "blog"];
