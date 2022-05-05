import { PatternFinderData } from "../../interfaces/patternFinderData";
import CandlestickFinder from "../CandlestickFinder";

export default class BearishSpinningTop extends CandlestickFinder {
  constructor() {
    super(1, "BearishSpinningTop");
    // this.name = "BearishSpinningTop";
    // this.requiredCount = 1;
  }
  logic(data: PatternFinderData) {
    let daysOpen = data.open[0];
    let daysClose = data.close[0];
    let daysHigh = data.high[0];
    let daysLow = data.low[0];

    let bodyLength = Math.abs(daysClose - daysOpen);
    let upperShadowLength = Math.abs(daysHigh - daysOpen);
    let lowerShadowLength = Math.abs(daysHigh - daysLow);
    let isBearishSpinningTop =
      bodyLength < upperShadowLength && bodyLength < lowerShadowLength;

    return isBearishSpinningTop;
  }
}

export function bearishSpinningTop(data: PatternFinderData) {
  return new BearishSpinningTop().getAllPatternIndex(data);
}
