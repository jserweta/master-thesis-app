import { OhlcItem } from "../interfaces/chartData";

export const getDataSelectedOnChart = (
  chartData: OhlcItem,
  min: number,
  max: number
) => {
  let filteredXValues = Object(chartData).filter((currentElement: OhlcItem) => {
    return currentElement.timestamp >= min && currentElement.timestamp <= max;
  });

  let preparedData = filteredXValues.reduce(
    (acc: any, current: any) => {
      acc.open.push(current.open);
      acc.high.push(current.high);
      acc.low.push(current.low);
      acc.close.push(current.close);
      acc.timestamp.push(current.timestamp);
      return acc;
    },
    {
      open: [],
      high: [],
      low: [],
      close: [],
      timestamp: [],
    }
  );

  return preparedData;
};
