import { PatternFinderData } from "../../interfaces/patternFinderData";
import CandlestickFinder from "../CandlestickFinder";

export default class ThreeBlackCrows extends CandlestickFinder {
  constructor() {
    super(3, "ThreeBlackCrows");
    // this.name = "ThreeBlackCrows";
    // this.requiredCount = 3;
  }
  logic(data: PatternFinderData) {
    let firstdaysOpen = data.open[0];
    let firstdaysClose = data.close[0];
    // let firstdaysHigh   = data.high[0];
    let firstdaysLow = data.low[0];
    let seconddaysOpen = data.open[1];
    let seconddaysClose = data.close[1];
    // let seconddaysHigh  = data.high[1];
    let seconddaysLow = data.low[1];
    let thirddaysOpen = data.open[2];
    let thirddaysClose = data.close[2];
    // let thirddaysHigh   = data.high[2];
    let thirddaysLow = data.low[2];

    let isDownTrend =
      firstdaysLow > seconddaysLow && seconddaysLow > thirddaysLow;
    let isAllBearish =
      firstdaysOpen > firstdaysClose &&
      seconddaysOpen > seconddaysClose &&
      thirddaysOpen > thirddaysClose;

    let doesOpenWithinPreviousBody =
      firstdaysOpen > seconddaysOpen &&
      seconddaysOpen > firstdaysClose &&
      seconddaysOpen > thirddaysOpen &&
      thirddaysOpen > seconddaysClose;

    return isDownTrend && isAllBearish && doesOpenWithinPreviousBody;
  }
}

export function threeBlackCrows(data: PatternFinderData) {
  return new ThreeBlackCrows().getAllPatternIndex(data);
}
