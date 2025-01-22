import { defineField } from "sanity";
import { ImageIcon } from "@sanity/icons";
import { IMediaOptions } from "../common/interface";

/**
 * This function returns an image object schema. It takes the following props.
 *
 * `isRequired` - (Required) This prop will define the validation checks for this schema. Pass
 * true if an image is required for the parent schema.
 *
 * `name` - (Required) This props will define the name of the field. We can't have multiple fields with
 * the same name. **Do not use `image` as name.**
 *
 * `title` - (Optional) This title is only to help the content editors understand what content they
 * are controlling.
 *
 * The validation logic used in this component is **tried and tested**. Please consult with a senior
 * sanity dev before moving forward.
 * @param options
 * @returns
 */
export function image(options: IMediaOptions) {
  return defineField({
    name: options.name || "image",
    title: options.title,
    description: options.description,
    icon: ImageIcon,
    type: "object",
    group: options.group,
    fields: [
      defineField({
        name: "file",
        title: "Image File",
        type: "image",
        options: {
          hotspot: true,
        },
      }),
      defineField({
        name: "alt",
        title: "Alt",
        type: "string",
        validation: (rule) =>
          rule.warning(
            "Please provide an alternate text to improve SEO scores."
          ),
      }),
    ],
    validation: options.validation,
    hidden: ({ parent, document }) => {
      if (options.hidden) {
        return options.hidden(parent, document);
      }
      return false;
    },
    preview: {
      select: {
        file: "file",
        alt: "alt",
      },
      prepare(select) {
        return {
          title: select.alt || "Image",
          media: select.file,
        };
      },
    },
  });
}
