import { PatternFinderData } from "../../interfaces/patternFinderData";
import CandlestickPatternFinder from "../CandlestickPatternFinder";

export default class BullishEngulfing extends CandlestickPatternFinder {
  patternName: string;
  patternRequiredCandleCount: number;
  constructor() {
    super();
    this.patternName = "BullishEngulfing";
    this.patternRequiredCandleCount = 2;
  }
  patternLogic(data: PatternFinderData) {
    let openFirst = data.open[0];
    let closeFirst = data.close[0];
    let openSecond = data.open[1];
    let closeSecond = data.close[1];

    let isBullishEngulfing =
      closeFirst < openFirst &&
      openFirst > openSecond &&
      closeFirst > openSecond &&
      openFirst < closeSecond;

    return isBullishEngulfing;
  }
}

export function bullishEngulfing(data: PatternFinderData) {
  return new BullishEngulfing().getAllPatternIndex(data);
}
