import {
  TextColorRender,
  TextColorIcon,
  HeadingOneComponent,
  HeadingThreeComponent,
  HeadingTwoComponent,
  HightlightContentRender,
  HightlightIcon,
} from "../render-components";
import { ColorsEnum } from "./color";
import { linkAnnotation } from "./link-annotation";

export const block = {
  name: "block",
  type: "block",
  title: "Block",
  styles: [
    {
      title: "Normal",
      value: "normal",
    },
    {
      title: "H1",
      value: "h1",
      component: HeadingOneComponent,
    },
    {
      title: "H2",
      value: "h2",
      component: HeadingTwoComponent,
    },
    {
      title: "H3",
      value: "h3",
      component: HeadingThreeComponent,
    },
    {
      title: "Quote",
      value: "blockquote",
    },
  ],
  lists: [
    {
      title: "Bullet",
      value: "bullet",
    },
    {
      title: "Number",
      value: "number",
    },
  ],
  marks: {
    decorators: [
      {
        title: "Strong",
        value: "strong",
      },
      {
        title: "Emphasis",
        value: "em",
      },
      {
        title: "Underline",
        value: "underline",
      },
      {
        title: "Color 1",
        value: ColorsEnum.TextColorOne,
        icon: TextColorIcon(ColorsEnum.TextColorOne),
        component: TextColorRender,
      },
      {
        title: "Color 2",
        value: ColorsEnum.TextColorTwo,
        icon: TextColorIcon(ColorsEnum.TextColorTwo),
        component: TextColorRender,
      },
      {
        title: "Color 3",
        value: ColorsEnum.TextColorThree,
        icon: TextColorIcon(ColorsEnum.TextColorThree),
        component: TextColorRender,
      },
      {
        title: "Highlight 1",
        value: ColorsEnum.HighlightColorOne,
        icon: HightlightIcon(ColorsEnum.HighlightColorOne),
        component: HightlightContentRender,
      },
    ],
    annotations: [linkAnnotation],
  },
};
