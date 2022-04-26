class Company {
  constructor(symbol, name, region, currency, matchScore) {
    this.symbol = symbol;
    this.name = name;
    this.region = region;
    this.currency = currency;
    this.machScore = matchScore;
  }
}

export const prepareSearchData = (response) => {
  let returnObj = {};

  for (let key in response["bestMatches"]) {
    returnObj[key] = new Company(
      response["bestMatches"][key]["1. symbol"],
      response["bestMatches"][key]["2. name"],
      response["bestMatches"][key]["4. region"],
      response["bestMatches"][key]["8. currency"],
      parseFloat(response["bestMatches"][key]["9. matchScore"])
    );
  }

  // console.log(returnObj);

  // returnObj.sort(function (x, y) {
  //   return x[0].matchScore - y[0].matchScore;
  // });

  return returnObj;
};

export const prepareChartData = (response) => {
  let returnObj = {};
  let metaData = [];
  let ohlcData = [];
  let volumeData = [];

  metaData.push(
    response["Meta Data"]["1. Information"],
    response["Meta Data"]["2. Symbol"],
    response["Meta Data"]["3. Last Refreshed"],
    response["Meta Data"]["4. Interval"]
  );

  for (let key in response["Time Series (Daily)"]) {
    ohlcData.push([
      toTimestamp(key),
      parseFloat(response["Time Series (Daily)"][key]["1. open"]),
      parseFloat(response["Time Series (Daily)"][key]["2. high"]),
      parseFloat(response["Time Series (Daily)"][key]["3. low"]),
      parseFloat(response["Time Series (Daily)"][key]["4. close"]),
    ]);

    volumeData.push([
      toTimestamp(key),
      parseInt(response["Time Series (Daily)"][key]["5. volume"]),
    ]);
  }

  ohlcData.sort(function (x, y) {
    return x[0] - y[0];
  });

  volumeData.sort(function (x, y) {
    return x[0] - y[0];
  });

  returnObj["metaData"] = metaData;
  returnObj["ohlcData"] = ohlcData;
  returnObj["volumeData"] = volumeData;

  return returnObj;
};

const toTimestamp = (strDate) => {
  const dt = Date.parse(strDate);
  return dt;
};
