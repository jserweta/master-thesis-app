import CandleFinderData from "../CandleFinderData";
import CandlestickFinder from "../CandlestickFinder";

export default class BullishHammerStick extends CandlestickFinder {
  constructor() {
    super(1, "BullishHammerStick");
    // this.name = ;
    // this.requiredCount  = 1;
  }
  logic(data: CandleFinderData) {
    let daysOpen = data.open[0];
    let daysClose = data.close[0];
    let daysHigh = data.high[0];
    let daysLow = data.low[0];

    let isBullishHammer = daysClose > daysOpen;
    isBullishHammer =
      isBullishHammer && this.approximateEqual(daysClose, daysHigh);
    isBullishHammer =
      isBullishHammer && daysClose - daysOpen <= 2 * (daysOpen - daysLow);

    return isBullishHammer;
  }
}

export function bullishHammerStick(data: CandleFinderData) {
  return new BullishHammerStick().getAllPatternIndex(data);
}
