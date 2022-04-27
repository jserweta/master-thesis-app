import { SearchDataFormat } from "../interfaces/apiSearchData";
import { ChartDataFormat } from "../interfaces/apiChartsData";

import { Company } from "../interfaces/company";
import { OhlcItem } from "../interfaces/ohlcItem";
import { VolumeItem } from "../interfaces/volumeItem";

export const prepareSearchData = (response: SearchDataFormat) => {
  let returnObj: Company[] = [];
  for (let key in response["bestMatches"]) {
    let newCompany: Company = {
      symbol: (
        response["bestMatches"][key] as {
          [key: string]: any;
        }
      )["1. symbol"],
      name: (
        response["bestMatches"][key] as {
          [key: string]: any;
        }
      )["2. name"],
      region: (
        response["bestMatches"][key] as {
          [key: string]: any;
        }
      )["4. region"],
      currency: (
        response["bestMatches"][key] as {
          [key: string]: any;
        }
      )["8. currency"],
      matchScore: parseFloat(
        (
          response["bestMatches"][key] as {
            [key: string]: any;
          }
        )["9. matchScore"]
      ),
    };
    returnObj.push(newCompany);
  }

  return returnObj;
};

export const prepareChartData = (response: ChartDataFormat) => {
  let metaData = [];
  let ohlcData = [];
  let volumeData = [];
  let returnObj = {};

  metaData.push(
    response["Meta Data"]["1. Information"],
    response["Meta Data"]["2. Symbol"],
    response["Meta Data"]["3. Last Refreshed"]
  );

  for (let key in response["Time Series (Daily)"]) {
    let newOhlcEntry: OhlcItem = {
      timestamp: toTimestamp(key),
      open: parseFloat(
        (
          response["Time Series (Daily)"][key] as {
            [key: string]: any;
          }
        )["1. open"]
      ),
      high: parseFloat(
        (
          response["Time Series (Daily)"][key] as {
            [key: string]: any;
          }
        )["2. high"]
      ),
      low: parseFloat(
        (
          response["Time Series (Daily)"][key] as {
            [key: string]: any;
          }
        )["3. low"]
      ),
      close: parseFloat(
        (
          response["Time Series (Daily)"][key] as {
            [key: string]: any;
          }
        )["4. close"]
      ),
    };

    let newVolumeEntry: VolumeItem = {
      timestamp: toTimestamp(key),
      volume: parseInt(
        (
          response["Time Series (Daily)"][key] as {
            [key: string]: any;
          }
        )["5. volume"]
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

  returnObj = {
    metaData: metaData,
    ohlcData: ohlcData,
    volumeData: volumeData,
  };
  return returnObj;
};

const toTimestamp = (strDate: string): number => {
  const dt = Date.parse(strDate);
  return dt;
};
