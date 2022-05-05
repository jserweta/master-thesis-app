import { PatternFinderData } from "../../interfaces/patternFinderData";
import CandlestickPatternFinder from "../CandlestickPatternFinder";

export default class DarkCloudCover extends CandlestickPatternFinder {
  patternName: string;
  patternRequiredCandleCount: number;
  constructor() {
    super();
    this.patternName = "DarkCloudCover";
    this.patternRequiredCandleCount = 2;
  }

  patternLogic(data: PatternFinderData) {
    let openFirst = data.open[0];
    let closeFirst = data.close[0];
    let highFirst = data.high[0];
    let openSecond = data.open[1];
    let closeSecond = data.close[1];

    let midpointFirst = (closeFirst + openFirst) / 2;
    let isFirstBullish = closeFirst > openFirst;
    let isSecondBearish = closeSecond < openSecond;
    let isDarkCloudPattern =
      openSecond > highFirst &&
      closeSecond < midpointFirst &&
      closeSecond > openFirst;

    return isFirstBullish && isSecondBearish && isDarkCloudPattern;
  }
}

export function darkCloudCover(data: PatternFinderData) {
  return new DarkCloudCover().getAllPatternIndex(data);
}
