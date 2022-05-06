import { PatternFinderData } from "../../interfaces/patternFinderData";
import CandlestickPatternFinder from "../CandlestickPatternFinder";

export default class BearishEngulfing extends CandlestickPatternFinder {
  patternName: string;
  patternRequiredCandleCount: number;
  constructor() {
    super();
    this.patternName = "BearishEngulfingPattern";
    this.patternRequiredCandleCount = 2;
  }
  patternLogic(data: PatternFinderData) {
    let openFirst = data.open[0];
    let closeFirst = data.close[0];
    let openSecond = data.open[1];
    let closeSecond = data.close[1];

    let isBearishEngulfing =
      closeFirst > openFirst &&
      openFirst < openSecond &&
      closeFirst < openSecond &&
      openFirst > closeSecond;

    return isBearishEngulfing;
  }
}

export function bearishEngulfing(data: PatternFinderData) {
  return new BearishEngulfing().getAllPatternIndex(data);
}
