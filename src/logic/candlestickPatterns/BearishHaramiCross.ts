import { PatternFinderData } from "../../interfaces/patternFinderData";
import CandlestickPatternFinder from "../CandlestickPatternFinder";

export default class BearishHaramiCross extends CandlestickPatternFinder {
  patternName: string;
  patternRequiredCandleCount: number;
  constructor() {
    super();
    this.patternName = "BearishHaramiCross";
    this.patternRequiredCandleCount = 2;
  }
  patternLogic(data: PatternFinderData) {
    let openFirst = data.open[0];
    let closeFirst = data.close[0];
    let highFirst = data.high[0];
    let openSecond = data.open[1];
    let closeSecond = data.close[1];
    let highSecond = data.high[1];
    let lowSecond = data.low[1];

    let isBearishHaramiCrossPattern =
      openFirst < openSecond &&
      closeFirst > openSecond &&
      closeFirst > closeSecond &&
      openFirst < lowSecond &&
      highFirst > highSecond;

    let isSecondDayDoji = this.approximateEqual(openSecond, closeSecond);

    return isBearishHaramiCrossPattern && isSecondDayDoji;
  }
}

export function bearishHaramiCross(data: PatternFinderData) {
  return new BearishHaramiCross().getAllPatternIndex(data);
}
