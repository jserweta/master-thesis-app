import { PatternFinderData } from "../../interfaces/patternFinderData";
import CandlestickPatternFinder from "../CandlestickPatternFinder";

export default class BearishInvertedHammerStick extends CandlestickPatternFinder {
  patternName: string;
  patternRequiredCandleCount: number;
  constructor() {
    super();
    this.patternName = "BearishInvertedHammerStick";
    this.patternRequiredCandleCount = 1;
  }
  patternLogic(data: PatternFinderData) {
    let open = data.open[0];
    let close = data.close[0];
    let high = data.high[0];
    let low = data.low[0];

    let isBearishInvertedHammer = open > close;
    isBearishInvertedHammer =
      isBearishInvertedHammer && this.approximateEqual(close, low);
    isBearishInvertedHammer =
      isBearishInvertedHammer && open - close <= 2 * (high - open);

    return isBearishInvertedHammer;
  }
}

export function bearishInvertedHammerStick(data: PatternFinderData) {
  return new BearishInvertedHammerStick().getAllPatternIndex(data);
}
