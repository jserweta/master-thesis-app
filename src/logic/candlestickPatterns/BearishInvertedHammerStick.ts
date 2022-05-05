import { PatternFinderData } from "../../interfaces/patternFinderData";
import CandlestickFinder from "../CandlestickFinder";

export default class BearishInvertedHammerStick extends CandlestickFinder {
  constructor() {
    super(1, "BearishInvertedHammerStick");
    // this.name = 'BearishInvertedHammerStick';
    // this.requiredCount  = 1;
  }
  logic(data: PatternFinderData) {
    let daysOpen = data.open[0];
    let daysClose = data.close[0];
    let daysHigh = data.high[0];
    let daysLow = data.low[0];

    let isBearishInvertedHammer = daysOpen > daysClose;
    isBearishInvertedHammer =
      isBearishInvertedHammer && this.approximateEqual(daysClose, daysLow);
    isBearishInvertedHammer =
      isBearishInvertedHammer &&
      daysOpen - daysClose <= 2 * (daysHigh - daysOpen);

    return isBearishInvertedHammer;
  }
}

export function bearishInvertedHammerStick(data: PatternFinderData) {
  return new BearishInvertedHammerStick().getAllPatternIndex(data);
}
