import { PatternFinderData } from "../../interfaces/patternFinderData";
import CandlestickPatternFinder from "../CandlestickPatternFinder";

export default class BullishSpinningTop extends CandlestickPatternFinder {
  patternName: string;
  patternRequiredCandleCount: number;
  constructor() {
    super();
    this.patternName = "BullishSpinningTop";
    this.patternRequiredCandleCount = 1;
  }
  patternLogic(data: PatternFinderData) {
    let open = data.open[0];
    let close = data.close[0];
    let high = data.high[0];
    let low = data.low[0];

    let bodyLength = Math.abs(close - open);
    let upperShadowLength = Math.abs(high - close);
    let lowerShadowLength = Math.abs(open - low);
    let isBullishSpinningTop =
      bodyLength < upperShadowLength && bodyLength < lowerShadowLength;

    return isBullishSpinningTop;
  }
}

export function bullishSpinningTop(data: PatternFinderData) {
  return new BullishSpinningTop().getAllPatternIndex(data);
}
