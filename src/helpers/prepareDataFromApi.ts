import { ApiSearchDataFormat } from "../interfaces/apiSearchDataFormat";
import { ApiChartDataFormat } from "../interfaces/apiChartDataFormat";
import { SearchData } from "../interfaces/searchData";
import {
  MetaData,
  OhlcItem,
  VolumeItem,
  ChartData,
} from "../interfaces/chartData";

export const prepareSearchData = (
  response: ApiSearchDataFormat
): SearchData[] => {
  let returnObj = [] as SearchData[];
  for (let key in response["bestMatches"]) {
    let newCompany: SearchData = {
      symbol: (response["bestMatches"][key] as any)["1. symbol"],
      name: (response["bestMatches"][key] as any)["2. name"],
      region: (response["bestMatches"][key] as any)["4. region"],
      currency: (response["bestMatches"][key] as any)["8. currency"],
      matchScore: parseFloat(
        (response["bestMatches"][key] as any)["9. matchScore"]
      ),
    };
    returnObj.push(newCompany);
  }

  return returnObj;
};

export const prepareChartData = (response: ApiChartDataFormat): ChartData => {
  let metaData = {} as MetaData;
  let ohlcData = [] as OhlcItem[];
  let volumeData = [] as VolumeItem[];
  let returnObj = {} as ChartData;

  metaData.information = response["Meta Data"]["1. Information"];
  metaData.symbol = response["Meta Data"]["2. Symbol"];
  metaData.lastRefresh = response["Meta Data"]["3. Last Refreshed"];

  for (let key in response["Time Series (Daily)"]) {
    let newOhlcEntry: OhlcItem = {
      timestamp: toTimestamp(key),
      open: parseFloat(
        (response["Time Series (Daily)"][key] as any)["1. open"]
      ),
      high: parseFloat(
        (response["Time Series (Daily)"][key] as any)["2. high"]
      ),
      low: parseFloat((response["Time Series (Daily)"][key] as any)["3. low"]),
      close: parseFloat(
        (response["Time Series (Daily)"][key] as any)["4. close"]
      ),
    };

    let newVolumeEntry: VolumeItem = {
      timestamp: toTimestamp(key),
      volume: parseInt(
        (response["Time Series (Daily)"][key] as any)["5. volume"]
      ),
    };
    ohlcData.push(newOhlcEntry);
    volumeData.push(newVolumeEntry);
  }
  ohlcData.sort(function (x, y) {
    return x.timestamp - y.timestamp;
  });

  volumeData.sort(function (x, y) {
    return x.timestamp - y.timestamp;
  });

  returnObj.metaData = metaData;
  returnObj.ohlcData = ohlcData;
  returnObj.volumeData = volumeData;

  return returnObj;
};

const toTimestamp = (strDate: string): number => {
  const dt = Date.parse(strDate);
  return dt;
};
