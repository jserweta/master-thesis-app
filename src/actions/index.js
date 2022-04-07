import { API_KEY, API_URL } from "../constants/global";

export const doFetch = async (path) => {
  let returnObj = {};
  let metaData = [];
  let ohlcData = [];
  let volumeData = [];
  const res = await fetch(`${API_URL}${path}&apikey=${API_KEY}`);

  const toTimestamp = (strDate) => {
    const dt = Date.parse(strDate);
    return dt;
  };

  if (res.ok) {
    let response = await res.json();

    metaData.push(
      response["Meta Data"]["1. Information"],
      response["Meta Data"]["2. Symbol"],
      response["Meta Data"]["3. Last Refreshed"],
      response["Meta Data"]["4. Interval"]
    );

    for (let key in response["Monthly Time Series"]) {
      ohlcData.push([
        toTimestamp(key),
        parseFloat(response["Monthly Time Series"][key]["1. open"]),
        parseFloat(response["Monthly Time Series"][key]["2. high"]),
        parseFloat(response["Monthly Time Series"][key]["3. low"]),
        parseFloat(response["Monthly Time Series"][key]["4. close"]),
      ]);

      volumeData.push([
        toTimestamp(key),
        parseInt(response["Monthly Time Series"][key]["5. volume"]),
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
  }
  throw await returnObj;
};
