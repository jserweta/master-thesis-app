import { PatternFinderData } from "../../interfaces/patternFinderData";
import CandlestickPatternFinder from "../CandlestickPatternFinder";

export default class EveningStar extends CandlestickPatternFinder {
  patternName: string;
  patternRequiredCandleCount: number;
  constructor() {
    super();
    this.patternName = "EveningStar";
    this.patternRequiredCandleCount = 3;
  }
  patternLogic(data: PatternFinderData) {
    let openFirst = data.open[0];
    let closeFirst = data.close[0];
    let highFirst = data.high[0];
    let closeSecond = data.close[1];
    let highSecond = data.high[1];
    let lowSecond = data.low[1];
    let openThird = data.open[2];
    let closeThird = data.close[2];

    let midpointFirst = (openFirst + closeFirst) / 2;
    let isFirstBullish = closeFirst > openFirst;
    let isSmallBodyExists = highFirst < lowSecond && highFirst < highSecond;
    let isThirdBearish = openThird > closeThird;

    let gapExists =
      highSecond > highFirst &&
      lowSecond > highFirst &&
      openThird < lowSecond &&
      closeSecond > openThird;
    let isCloseBelowFirstMidpoint = closeThird < midpointFirst;

    return (
      isFirstBullish &&
      isSmallBodyExists &&
      gapExists &&
      isThirdBearish &&
      isCloseBelowFirstMidpoint
    );
  }
}

export function eveningStar(data: PatternFinderData) {
  return new EveningStar().getAllPatternIndex(data);
}
