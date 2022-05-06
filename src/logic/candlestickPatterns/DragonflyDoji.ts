import { PatternFinderData } from "../../interfaces/patternFinderData";
import CandlestickPatternFinder from "../CandlestickPatternFinder";

export default class DragonflyDoji extends CandlestickPatternFinder {
  patternName: string;
  patternRequiredCandleCount: number;
  constructor() {
    super();
    this.patternName = "DragonFlyDoji";
    this.patternRequiredCandleCount = 1;
  }
  patternLogic(data: PatternFinderData) {
    let open = data.open[0];
    let close = data.close[0];
    let high = data.high[0];
    let low = data.low[0];

    let isOpenEqualsClose = this.approximateEqual(open, close);
    let isHighEqualsOpen =
      isOpenEqualsClose && this.approximateEqual(open, high);
    let isLowEqualsClose =
      isOpenEqualsClose && this.approximateEqual(close, low);

    return isOpenEqualsClose && isHighEqualsOpen && !isLowEqualsClose;
  }
}

export function dragonflyDoji(data: PatternFinderData) {
  return new DragonflyDoji().getAllPatternIndex(data);
}
