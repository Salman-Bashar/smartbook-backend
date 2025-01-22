# SmartBook Backend

This is the backend repository for SmartBook. This is mainly created to work with NextJS front-ends but can be made to work with any frontend with slight adjustments.

This codebase assumes you are an experienced sanity dev. Otherwise please go through the [sanity docs](https://www.sanity.io/docs) to learn how it works.

## Studio Structure

This project uses a custom studio structure with the goal of improving UX of the editors.

Currently we have the following folders for storing schemas:

- **Global Settings**: This will store site wide content.

  Currently we only have SEO controls.

  A sanity setup for an ecommerce site might store **promotions** related content in the global settings folder.

- **Layout**: This will store all the content we render in the layout (header/footer) of the frontend.
- **Pages**: This will contain all the **buildable** pages.
- **Buildable Hero Section**: This will contain all the types of hero sections.
- **Buildable Sections**: This will contain all the types of page sections.
- **Entities**: This will contain all types of entities required for the project.

  You can think of an **entity** as a class.

  An example of an entity is a `book`. This will contain all instances of the different books of our site.

  Another common entity could be `category`. This will contain all instances of book categories we are rendering on the site.

  The entities are referenced in multiple places across a project, for example they can be referenced in buildable sections.

  Entities can also have their own pages, for example an instance of `book` will have a page.

> You can checkout out how the studio structure is managed by looking through the `structure` folder.
> Additionally you will come across the use of functions like `createSingleDocumentStructure`. We go more into detail about these functions in the [Document Structure](#single-document-structure-vs-dynamic-document-structure) section.

# Root and Common schemas

In this section we will explain the root and common sections and their differences.

## `schemas/_root`

This folder contains root schemas that you should reuse.

> Please do not make any updates to the code in this folder without consulting a the lead sanity developer for the project.

Changing this code will require massive changes to the frontend, it should only be done when absolutely necessary.

You should look through the schemas this folder provides and reuse them instead of making your own.

## `schemas/common`

This folder will contain re-usable `field` definitions.

As the project grows this folder is likely to get populated with many re-usable code.

A re-usable field definition is a piece of code that you are likely to use in multiple schema definitions.

For example, the `editorTitle` field definition is used in most `buildable-sections`.

Now in some projects you might not need the `editorTitle` field definition. This is why its stored in a `common` folder and not the `_root` folder.

The contents of the `common` folder will change from project to project and as a project progresses.

> The other folders in `schemas` is self explanatory.

# Studio Configuration

We can use plugins to customize the look and feel of the Sanity studio.

Sanity studio is configured using the `sanity.config.ts` file.

This file exports and array of **config** objects.

> In our system we separate the configurations based on **datasets**. You can think of a **dataset** as a **database**. Sanity studio is a frontend to entry data into the database. Sanity is setup to support multiple databases, so we can have like a `staging` database and a `production` database.

## Plugins

The config object has a `plugins` property. This accepts an array of valid plugins that add new features or modify existing features of the sanity studio.

We use a number of official/community sanity plugins in our studio, you can learn more about them by checking the config file.

We also have a custom plugin called `customDesktool`. This is a simple plugin that does the following:

- Modifies the document pane with extra `tabs` or `views`.

  The logic here is as follows. All documents have a `Incoming References` tab that shows a list of other documents that are referencing it.

  Only documents that render pages in the frontend have a `Preview` tab that renders an Iframe in the document pane.

- Modifies the studio structure to organize all our schemas into the folder structure described in the [Studio Structure](#studio-structure) section.

  The main logic for the studio structure is in not in this file, it is in the `structure` folder.

  In this file we are passing it to sanity configuration.

## Document Actions

The sanity config object has a `document` property.

We use this to manipulate a `document` in the following ways:

- We modify the `CRUD` operations of a document.

  Currently we are only modifying which documents can be created/deleted.

  We can also do things like add additional logic to specific `CRUD` operations, so we could do things like cascade delete operation for specific documents.

- We can have have specific documents have a `Open Preview` option that opens a new tab with Live Preview of the document on our frontend.

# Preview Logic

Both our preview options depend on a single block of code to generate the preview URL of the document.

This logic is contained in the `generate-preview-url` file.

The logic here is setup to work with our `nextjs-starter` repository.

Here is a breakdown of the logic:

- First we check if the document has slug.
- If not, then we check if the document is a **fixed** document. (Fixed documents are documents with fixed slugs, i.e the home page. They do not have slugs.) If the document is not a fixed document either, then we conclude that this document is not supposed to have a preview option and return undefined.
- Otherwise, we proceed to generate the preview url.
- We start with setting the base/domain of the url, using information from our `.env` and active dataset.
- Next, we set the endpoint of our frontend we want to hit. Our NextJS starter has an API endpoint `/api/enable-draft` which enables the site to enter draft mode.
- Then we add the necessary search params to our url, so our frontend can validate the preview request and open the correct page.
- We add the `secret` param for a security check, this value is store in the `.env` of the frontend and backend. It has to be same for preview to work.
- We add the `type` and `slug` params, so our frontend know which type of document the editor wants to preview.
- Then we return the final url.

> The slug param can be undefined because fixed pages don't have slugs.
> The frontend has a `SANITY_PAGE_ROUTES` object which maps a document type with a valid url for the document. Its important for the keys of that object to match the `_type` values of our documents in sanity.
> If the frontend is setup correctly you should be able to preview the document.

# Single Document Structure vs Dynamic Document Structure

We have a file called `create-document-structure` which exports two functions.

These two functions are used extensively in our `structure` folder when we are defining the structure of the studio documents.

In sanity there are some documents for which we only want a single instance, such as the following:

- Global Settings
- Home Page

Normally it would not make sense to be able to create and maintain more than one instance of a home page. Depending on your project you will have more documents that must be a single instance.

For documents like this we use the `createSingleDocumentStructure` when we are adding those documents to our studio.

> IMPORTANT: Along with using this function you also have to limit the `create` and `delete` functionality of these documents. It would not make sense to be able to delete a home page. Checkout the [Document Actions](#document-actions) section for more information.

For other documents that can have multiple instances we use the `createDynamicDocumentStructure` function.
