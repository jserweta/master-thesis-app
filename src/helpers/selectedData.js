export const getSelectedData = (chartData, min, max) => {
  let filterdValues = chartData.ohlcData.filter((currentElement) => {
    return currentElement[0] >= min && currentElement[0] <= max;
  });
  return filterdValues;
};
