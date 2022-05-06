import { PatternFinderData } from "../../interfaces/patternFinderData";
import CandlestickPatternFinder from "../CandlestickPatternFinder";

export default class PiercingLine extends CandlestickPatternFinder {
  patternName: string;
  patternRequiredCandleCount: number;
  constructor() {
    super();
    this.patternName = "PiercingLine";
    this.patternRequiredCandleCount = 2;
  }
  patternLogic(data: PatternFinderData) {
    let openFirst = data.open[0];
    let closeFirst = data.close[0];
    let lowFirst = data.low[0];
    let openSecond = data.open[1];
    let closeSecond = data.close[1];
    let lowSecond = data.low[1];

    let firstdaysMidpoint = (openFirst + closeFirst) / 2;
    let isDowntrend = lowSecond < lowFirst;
    let isFirstBearish = closeFirst < openFirst;
    let isSecondBullish = closeSecond > openSecond;

    let isPiercingLinePattern =
      lowFirst > openSecond && closeSecond > firstdaysMidpoint;

    return (
      isDowntrend && isFirstBearish && isPiercingLinePattern && isSecondBullish
    );
  }
}

export function piercingLine(data: PatternFinderData) {
  return new PiercingLine().getAllPatternIndex(data);
}
