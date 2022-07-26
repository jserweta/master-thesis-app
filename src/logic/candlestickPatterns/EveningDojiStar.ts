import { PatternFinderData } from "../../interfaces/patternFinderData";
import CandlestickPatternFinder from "../CandlestickPatternFinder";
import Doji from "./Doji";

export default class EveningDojiStar extends CandlestickPatternFinder {
  patternName: string;
  patternRequiredCandleCount: number;
  constructor() {
    super();
    this.patternName = "EveningDojiStar";
    this.patternRequiredCandleCount = 3;
  }
  patternLogic(data: PatternFinderData) {
    let openFirst = data.open[0];
    let closeFirst = data.close[0];
    let highFirst = data.high[0];
    let openSecond = data.open[1];
    let closeSecond = data.close[1];
    let highSecond = data.high[1];
    let lowSecond = data.low[1];
    let openThird = data.open[2];
    let closeThird = data.close[2];

    let midpointFirst = (openFirst + closeFirst) / 2;
    let isFirstBullish = closeFirst > openFirst;

    let dojiExists = new Doji().hasPattern({
      open: [openSecond],
      close: [closeSecond],
      high: [highSecond],
      low: [lowSecond],
    });
    let isThirdBearish = openThird > closeThird;

    let gapExists =
      highSecond > highFirst &&
      lowSecond > highFirst &&
      openThird < lowSecond &&
      closeSecond > openThird;

    let doesCloseBelowFirstMidpoint = closeThird < midpointFirst;

    return (
      isFirstBullish &&
      dojiExists &&
      gapExists &&
      isThirdBearish &&
      doesCloseBelowFirstMidpoint
    );
  }
}

export function eveningDojiStar(data: PatternFinderData) {
  return new EveningDojiStar().getAllPatternIndex(data);
}
