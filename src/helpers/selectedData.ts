import { OhlcItem } from "../interfaces/ohlcItem";

export const getSelectedData = (
  chartData: OhlcItem,
  min: number,
  max: number
) => {
  let filterdValues = Object(chartData).filter((currentElement: OhlcItem) => {
    return currentElement.timestamp >= min && currentElement.timestamp <= max;
  });
  return filterdValues;
};
