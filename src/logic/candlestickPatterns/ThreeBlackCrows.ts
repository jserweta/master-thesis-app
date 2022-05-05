import { PatternFinderData } from "../../interfaces/patternFinderData";
import CandlestickPatternFinder from "../CandlestickPatternFinder";

export default class ThreeBlackCrows extends CandlestickPatternFinder {
  patternName: string;
  patternRequiredCandleCount: number;
  constructor() {
    super();
    this.patternName = "ThreeBlackCrows";
    this.patternRequiredCandleCount = 3;
  }
  patternLogic(data: PatternFinderData) {
    let openFirst = data.open[0];
    let closeFirst = data.close[0];
    let lowFirst = data.low[0];
    let openSecond = data.open[1];
    let closeSecond = data.close[1];
    let lowSecond = data.low[1];
    let openThird = data.open[2];
    let closeThird = data.close[2];
    let lowThird = data.low[2];

    let isDownTrend = lowFirst > lowSecond && lowSecond > lowThird;
    let isAllBearish =
      openFirst > closeFirst &&
      openSecond > closeSecond &&
      openThird > closeThird;

    let doesOpenWithinPreviousBody =
      openFirst > openSecond &&
      openSecond > closeFirst &&
      openSecond > openThird &&
      openThird > closeSecond;

    return isDownTrend && isAllBearish && doesOpenWithinPreviousBody;
  }
}

export function threeBlackCrows(data: PatternFinderData) {
  return new ThreeBlackCrows().getAllPatternIndex(data);
}
