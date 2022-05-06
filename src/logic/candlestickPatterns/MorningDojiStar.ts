import { PatternFinderData } from "../../interfaces/patternFinderData";
import CandlestickPatternFinder from "../CandlestickPatternFinder";
import Doji from "./Doji";

export default class MorningDojiStar extends CandlestickPatternFinder {
  patternName: string;
  patternRequiredCandleCount: number;
  constructor() {
    super();
    this.patternName = "MorningDojiStar";
    this.patternRequiredCandleCount = 3;
  }
  patternLogic(data: PatternFinderData) {
    let openFirst = data.open[0];
    let closeFirst = data.close[0];
    let lowFirst = data.low[0];
    let openSecond = data.open[1];
    let closeSecond = data.close[1];
    let highSecond = data.high[1];
    let lowSecond = data.low[1];
    let openThird = data.open[2];
    let closeThird = data.close[2];

    let midpointFirst = (openFirst + closeFirst) / 2;
    let isFirstBearish = closeFirst < openFirst;

    let dojiExists = new Doji().hasPattern({
      open: [openSecond],
      close: [closeSecond],
      high: [highSecond],
      low: [lowSecond],
    });
    let isThirdBullish = openThird < closeThird;

    let gapExists =
      highSecond < lowFirst &&
      lowSecond < lowFirst &&
      openThird > highSecond &&
      closeSecond < openThird;
    let doesCloseAboveFirstMidpoint = closeThird > midpointFirst;

    return (
      isFirstBearish &&
      dojiExists &&
      isThirdBullish &&
      gapExists &&
      doesCloseAboveFirstMidpoint
    );
  }
}

export function morningDojiStar(data: PatternFinderData) {
  return new MorningDojiStar().getAllPatternIndex(data);
}
