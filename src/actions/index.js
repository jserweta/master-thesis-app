import { API_KEY, API_URL } from "../constants/global";
export const doFetch = async (path) => {
  let returnObj = {};
  let metaData = [];
  let ohlcData = [];
  let volumeData = [];
  const res = await fetch(`${API_URL}${path}&apikey=${API_KEY}`);

  if (res.ok) {
    let response = await res.json();

    metaData.push(
      response["Meta Data"]["3. Last Refreshed"],
      response["Meta Data"]["2. Symbol"],
      response["Meta Data"]["3. Last Refreshed"],
      response["Meta Data"]["4. Interval"]
    );

    for (let key in response["Time Series (5min)"]) {
      ohlcData.push([
        key,
        response["Time Series (5min)"][key]["1. open"],
        response["Time Series (5min)"][key]["2. high"],
        response["Time Series (5min)"][key]["3. low"],
        response["Time Series (5min)"][key]["4. close"],
      ]);

      volumeData.push([key, response["Time Series (5min)"][key]]);
    }

    returnObj["metaData"] = metaData;
    returnObj["ohlcData"] = ohlcData;
    returnObj["volumeData"] = volumeData;

    return returnObj;
  }
  throw await returnObj;
};
