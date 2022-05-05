import { PatternFinderData } from "../../interfaces/patternFinderData";
import CandlestickFinder from "../CandlestickFinder";

export default class DarkCloudCover extends CandlestickFinder {
  // name = "DarkCloudCover";
  // requiredCount = 2;
  constructor(requiredCount: number, name: string) {
    super(2, "DarkCloudCover");
    // this.requiredCount = requiredCount;
    // name = "DarkCloudCover";
  }

  logic(data: PatternFinderData) {
    let firstdaysOpen = data.open[0];
    let firstdaysClose = data.close[0];
    let firstdaysHigh = data.high[0];
    // let firstdaysLow    = data.low[0]
    let seconddaysOpen = data.open[1];
    let seconddaysClose = data.close[1];
    // let seconddaysHigh  = data.high[1];
    // let seconddaysLow   = data.low[1]

    let firstdayMidpoint = (firstdaysClose + firstdaysOpen) / 2;
    let isFirstBullish = firstdaysClose > firstdaysOpen;
    let isSecondBearish = seconddaysClose < seconddaysOpen;
    let isDarkCloudPattern =
      seconddaysOpen > firstdaysHigh &&
      seconddaysClose < firstdayMidpoint &&
      seconddaysClose > firstdaysOpen;

    return isFirstBullish && isSecondBearish && isDarkCloudPattern;
  }
}

export function darkCloudCover(data: PatternFinderData) {
  return new DarkCloudCover(2, "DarkCloudCover").getAllPatternIndex(data);
}
