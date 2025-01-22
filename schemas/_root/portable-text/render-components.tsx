import React from "react";
import { MdFormatColorText } from "react-icons/md";
import { AiTwotoneHighlight } from "react-icons/ai";
import { RenderComponentProps } from "./interface";
import { ColorsEnum, colorValues } from "./block/color";
import { Text } from "@sanity/ui";

export const HeadingOneComponent = ({ children }: RenderComponentProps) => {
  return (
    <Text
      style={{
        fontSize: "38px",
      }}
    >
      {children}
    </Text>
  );
};

export const HeadingTwoComponent = ({ children }: RenderComponentProps) => {
  return (
    <Text
      style={{
        fontSize: "30px",
      }}
    >
      {children}
    </Text>
  );
};

export const HeadingThreeComponent = ({ children }: RenderComponentProps) => {
  return (
    <Text
      style={{
        fontSize: "25px",
      }}
    >
      {children}
    </Text>
  );
};

export const TextColorIcon = (color: ColorsEnum) => {
  return (
    <span style={{ color: colorValues[color] }}>
      <MdFormatColorText />
    </span>
  );
};

export const TextColorRender = (props: RenderComponentProps) => {
  return (
    <span style={{ color: colorValues[props.value] }}>{props.children}</span>
  );
};

export const HightlightIcon = (color: ColorsEnum) => {
  return (
    <span style={{ color: colorValues[color] }}>
      <AiTwotoneHighlight />
    </span>
  );
};

export const HightlightContentRender = (props: RenderComponentProps) => {
  return (
    <span style={{ backgroundColor: colorValues[props.value] }}>
      {props.children}
    </span>
  );
};
