import { PatternFinderData } from "../../interfaces/patternFinderData";
import CandlestickPatternFinder from "../CandlestickPatternFinder";

export default class MorningStar extends CandlestickPatternFinder {
  patternName: string;
  patternRequiredCandleCount: number;
  constructor() {
    super();
    this.patternName = "MorningStar";
    this.patternRequiredCandleCount = 3;
  }
  patternLogic(data: PatternFinderData) {
    let openFirst = data.open[0];
    let closeFirst = data.close[0];
    let lowFirst = data.low[0];
    let closeSecond = data.close[1];
    let highSecond = data.high[1];
    let lowSecond = data.low[1];
    let openThird = data.open[2];
    let closeThird = data.close[2];

    let midpointFirst = (openFirst + closeFirst) / 2;
    let isFirstBearish = closeFirst < openFirst;
    let isSmallBodyExists = lowFirst > lowSecond && lowFirst > highSecond;
    let isThirdBullish = openThird < closeThird;

    let gapExists =
      highSecond < lowFirst &&
      lowSecond < lowFirst &&
      openThird > highSecond &&
      closeSecond < openThird;
    let isCloseAboveFirstMidpoint = closeThird > midpointFirst;

    return (
      isFirstBearish &&
      isSmallBodyExists &&
      gapExists &&
      isThirdBullish &&
      isCloseAboveFirstMidpoint
    );
  }
}

export function morningStar(data: PatternFinderData) {
  return new MorningStar().getAllPatternIndex(data);
}
