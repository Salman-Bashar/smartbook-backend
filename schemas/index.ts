// Pages
import generalPages from "./pages/general";
import homePage from "./pages/home";

// Entities (Page Types)
import author from "./entities/author";

// Entities (Non-Page Types)
import category from "./entities/category";

// General Sections
import faqSection from "./buildable-sections/faq";
import richTextSection from "./buildable-sections/rich-text";

// Hero Sections
import primaryHero from "./buildable-hero-sections/primary";

// Layouts
import header from "./layout/header";
import footer from "./layout/footer";

// Miscellaneous
// TODO: Import Miscellaneous schemas here

// Global Settings
import globalSettings from "./global-settings";

/**
 * Keep schemas in the correct category of arrays.
 * This will make it easier to manage the studio layout
 * structure.
 *
 * Except for globalSchemas, the schemas will render in a folder
 * with a similar name to the array that contains them.
 *
 * i.e header and footer will be placed in a folder named Layout
 *
 * Each schema in globalSchemas will render separately at the top.
 */
export const globalSchemas = [globalSettings];
export const dynamicPages = [generalPages];
export const fixedPages = [homePage];
export const buildableSections = [faqSection, richTextSection];
export const buildableHeroSections = [primaryHero];
export const layouts = [header, footer];

/**
 * Some entities are used to render pages.
 * Please place your entity in the correct array.
 * The entities placed in `entitiesWthPages` will have a
 * preview option.
 */
export const entitiesWthPages = [author];
export const entitiesWithoutPages = [category];

/**
 * Some documents are only created as tools, to be reused in other documents.
 * They cannot be classified as entities, so we place them here.
 * The schemas used here should be kept in a `miscellaneous` folder.
 */
export const miscellaneous = [];

/**
 * Export schema types.
 */
export const schemaTypes = [
  ...globalSchemas,
  ...layouts,
  ...fixedPages,
  ...dynamicPages,
  ...entitiesWthPages,
  ...entitiesWithoutPages,
  ...buildableSections,
  ...buildableHeroSections,
  ...miscellaneous,
];
