import { PatternFinderData } from "../../interfaces/patternFinderData";
import CandlestickPatternFinder from "../CandlestickPatternFinder";

export default class BullishHammerStick extends CandlestickPatternFinder {
  patternName: string;
  patternRequiredCandleCount: number;
  constructor() {
    super();
    this.patternName = "BullishHammerStick";
    this.patternRequiredCandleCount = 1;
  }
  patternLogic(data: PatternFinderData) {
    let open = data.open[0];
    let close = data.close[0];
    let high = data.high[0];
    let low = data.low[0];

    let isBullishHammer = close > open;
    isBullishHammer = isBullishHammer && this.approximateEqual(close, high);
    isBullishHammer = isBullishHammer && close - open <= 2 * (open - low);

    return isBullishHammer;
  }
}

export function bullishHammerStick(data: PatternFinderData) {
  return new BullishHammerStick().getAllPatternIndex(data);
}
