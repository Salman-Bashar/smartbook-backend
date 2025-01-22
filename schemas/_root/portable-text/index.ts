import { ArrayDefinition, defineArrayMember, defineField } from "sanity";
import { image } from "../media/image";
import { video } from "../media/video";
import { block } from "./block";
import { portableTextIframe } from "./iframe";

interface Args {
  name: string;
  title?: string;
  isRequired: boolean;
  group?: string | string[];
}

export function portableText({
  name,
  title,
  isRequired,
  group,
}: Args): ArrayDefinition {
  return defineField({
    name: name,
    type: "array",
    title: title,
    group: group,
    of: [
      defineArrayMember(block),
      defineArrayMember(
        image({
          name: "portableTextImage",
          title: "Image",
        })
      ),
      defineArrayMember(video({ name: "portableTextVideo", title: "Video" })),
      defineArrayMember(portableTextIframe),
    ],
    validation: (rule) =>
      rule.custom((currentValue) => {
        if (isRequired && currentValue == undefined) {
          return "Required";
        }
        return true;
      }),
  });
}
