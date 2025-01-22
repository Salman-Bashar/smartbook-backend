export enum ColorsEnum {
  TextColorOne = "text-color-1",
  TextColorTwo = "text-color-2",
  TextColorThree = "text-color-3",
  HighlightColorOne = "highlight-1",
}

export const colorValues: Record<ColorsEnum, string> = {
  [ColorsEnum.TextColorOne]: "#FFDD00",
  [ColorsEnum.TextColorTwo]: "#FFE875",
  [ColorsEnum.TextColorThree]: "#FFF5B1",
  [ColorsEnum.HighlightColorOne]: "#89C700",
};
