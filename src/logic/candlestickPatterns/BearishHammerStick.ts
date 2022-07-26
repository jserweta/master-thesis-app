import { PatternFinderData } from "../../interfaces/patternFinderData";
import CandlestickPatternFinder from "../CandlestickPatternFinder";

export default class BearishHammerStick extends CandlestickPatternFinder {
  patternName: string;
  patternRequiredCandleCount: number;
  constructor() {
    super();
    this.patternName = "BearishHammerStick";
    this.patternRequiredCandleCount = 1;
  }

  patternLogic(data: PatternFinderData) {
    let open = data.open[0];
    let close = data.close[0];
    let high = data.high[0];
    let low = data.low[0];

    let isBearishHammer = open > close;
    isBearishHammer = isBearishHammer && this.approximateEqual(open, high);
    isBearishHammer = isBearishHammer && open - close <= 2 * (close - low);

    return isBearishHammer;
  }
}

export function bearishHammerStick(data: PatternFinderData) {
  return new BearishHammerStick().getAllPatternIndex(data);
}
