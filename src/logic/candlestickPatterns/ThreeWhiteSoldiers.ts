import { PatternFinderData } from "../../interfaces/patternFinderData";
import CandlestickPatternFinder from "../CandlestickPatternFinder";

export default class ThreeWhiteSoldiers extends CandlestickPatternFinder {
  patternName: string;
  patternRequiredCandleCount: number;
  constructor() {
    super();
    this.patternName = "ThreeWhiteSoldiers";
    this.patternRequiredCandleCount = 3;
  }
  patternLogic(data: PatternFinderData) {
    let openFirst = data.open[0];
    let closeFirst = data.close[0];
    let highFirst = data.high[0];
    let openSecond = data.open[1];
    let closeSecond = data.close[1];
    let highSecond = data.high[1];
    let openThird = data.open[2];
    let closeThird = data.close[2];
    let highThird = data.high[2];

    let isUpTrend = highSecond > highFirst && highThird > highSecond;
    let isAllBullish =
      openFirst < closeFirst &&
      openSecond < closeSecond &&
      openThird < closeThird;

    let doesOpenWithinPreviousBody =
      closeFirst > openSecond &&
      openSecond < highFirst &&
      highSecond > openThird &&
      openThird < closeSecond;

    return isUpTrend && isAllBullish && doesOpenWithinPreviousBody;
  }
}

export function threeWhiteSoldiers(data: PatternFinderData) {
  return new ThreeWhiteSoldiers().getAllPatternIndex(data);
}
