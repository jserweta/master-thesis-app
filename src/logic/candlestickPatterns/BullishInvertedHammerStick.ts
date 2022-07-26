import { PatternFinderData } from "../../interfaces/patternFinderData";
import CandlestickPatternFinder from "../CandlestickPatternFinder";

export default class BullishInvertedHammerStick extends CandlestickPatternFinder {
  patternName: string;
  patternRequiredCandleCount: number;
  constructor() {
    super();
    this.patternName = "BullishInvertedHammerStick";
    this.patternRequiredCandleCount = 1;
  }
  patternLogic(data: PatternFinderData) {
    let open = data.open[0];
    let close = data.close[0];
    let high = data.high[0];
    let low = data.low[0];

    let isBullishInvertedHammer = close > open;
    isBullishInvertedHammer =
      isBullishInvertedHammer && this.approximateEqual(open, low);
    isBullishInvertedHammer =
      isBullishInvertedHammer && close - open <= 2 * (high - close);

    return isBullishInvertedHammer;
  }
}

export function bullishInvertedHammerStick(data: PatternFinderData) {
  return new BullishInvertedHammerStick().getAllPatternIndex(data);
}
