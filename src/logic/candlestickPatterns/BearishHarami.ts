import { PatternFinderData } from "../../interfaces/patternFinderData";
import CandlestickPatternFinder from "../CandlestickPatternFinder";

export default class BearishHarami extends CandlestickPatternFinder {
  patternName: string;
  patternRequiredCandleCount: number;
  constructor() {
    super();
    this.patternName = "BearishHarami";
    this.patternRequiredCandleCount = 2;
  }
  patternLogic(data: PatternFinderData) {
    let openFirst = data.open[0];
    let closeFirst = data.close[0];
    let highFirst = data.high[0];
    // let lowFirst    = data.low[0]
    let openSecond = data.open[1];
    let closeSecond = data.close[1];
    let highSecond = data.high[1];
    let lowSecond = data.low[1];

    let isBearishHaramiPattern =
      openFirst < openSecond &&
      closeFirst > openSecond &&
      closeFirst > closeSecond &&
      openFirst < lowSecond &&
      highFirst > highSecond;

    return isBearishHaramiPattern;
  }
}

export function bearishHarami(data: PatternFinderData) {
  return new BearishHarami().getAllPatternIndex(data);
}
