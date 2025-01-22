import { defineField } from "sanity";
import { IMediaOptions } from "../common/interface";
import { FaRegFileVideo } from "react-icons/fa";
import { ImEmbed2 } from "react-icons/im";
import { VideoInputPreview } from "../../../../components/video-input-preview";

interface IVideo {
  type: "file" | "embed";
}

export function video(options: IMediaOptions) {
  return defineField({
    name: options.name || "video",
    title: options.title,
    description: options.description,
    type: "object",
    group: options.group,
    fields: [
      defineField({
        name: "type",
        title: "Type",
        type: "string",
        description:
          "Please select if you want to upload a file or use an embedded link",
        options: {
          layout: "radio",
          list: [
            {
              title: "Embed",
              value: "embed",
            },
            {
              title: "File",
              value: "file",
            },
          ],
        },
        initialValue: "embed",
      }),
      defineField({
        name: "file",
        title: "File",
        type: "file",
        icon: FaRegFileVideo,
        hidden: ({ parent }) => {
          const typedParent = parent as IVideo | undefined;

          if (typedParent?.type == "file") {
            return false;
          }

          return true;
        },
        options: {
          accept: "video/*",
        },
      }),
      defineField({
        name: "embed",
        title: "Video URL",
        type: "url",
        icon: ImEmbed2,
        hidden: ({ parent }) => {
          const typedParent = parent as IVideo | undefined;

          if (typedParent?.type == "embed") {
            return false;
          }

          return true;
        },
        validation: (rule) => rule.uri({ scheme: ["https"] }),
      }),
    ],
    validation: options.validation,
    hidden: ({ parent, document }) => {
      if (options.hidden) {
        return options.hidden(parent, document);
      }
      return false;
    },
    components: {
      input: VideoInputPreview,
    },
    preview: {
      select: {
        type: "type",
        embed: "embed",
        file: "file.asset.url",
      },
      prepare(select) {
        let title;

        if (select.type == "embed") {
          title = "Video | URL";
        }

        if (select.type == "file") {
          title = "Video | File";
        }

        return {
          title,
          subtitle: select.type == "embed" ? select.embed : select.file,
          media: select.type == "embed" ? ImEmbed2 : FaRegFileVideo,
        };
      },
    },
  });
}
