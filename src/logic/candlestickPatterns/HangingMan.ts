import { PatternFinderData } from "../../interfaces/patternFinderData";
import CandlestickPatternFinder from "../CandlestickPatternFinder";

export default class HangingMan extends CandlestickPatternFinder {
  patternName: string;
  patternRequiredCandleCount: number;
  constructor() {
    super();
    this.patternName = "HangingMan";
    this.patternRequiredCandleCount = 1;
  }

  patternLogic(data: PatternFinderData) {
    let open = data.open[0];
    let close = data.close[0];
    let high = data.high[0];
    let low = data.low[0];

    let isHangingMan = open > close;
    isHangingMan = isHangingMan && this.approximateEqual(open, high);
    isHangingMan = isHangingMan && open - close <= 2 * (close - low);

    return isHangingMan;
  }
}

export function hangingMan(data: PatternFinderData) {
  return new HangingMan().getAllPatternIndex(data);
}
