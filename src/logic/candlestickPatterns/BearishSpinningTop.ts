import { PatternFinderData } from "../../interfaces/patternFinderData";
import CandlestickPatternFinder from "../CandlestickPatternFinder";

export default class BearishSpinningTop extends CandlestickPatternFinder {
  patternName: string;
  patternRequiredCandleCount: number;
  constructor() {
    super();
    this.patternName = "BearishSpinningTop";
    this.patternRequiredCandleCount = 1;
  }
  patternLogic(data: PatternFinderData) {
    let open = data.open[0];
    let close = data.close[0];
    let high = data.high[0];
    let low = data.low[0];

    let bodyLength = Math.abs(close - open);
    let upperShadowLength = Math.abs(high - open);
    let lowerShadowLength = Math.abs(high - low);
    let isBearishSpinningTop =
      bodyLength < upperShadowLength && bodyLength < lowerShadowLength;

    return isBearishSpinningTop;
  }
}

export function bearishSpinningTop(data: PatternFinderData) {
  return new BearishSpinningTop().getAllPatternIndex(data);
}
