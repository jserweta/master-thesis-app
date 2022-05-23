import { PatternFinderData } from "../interfaces/patternFinderData";

export default abstract class CandlestickPatternFinder {
  abstract patternName: string;
  abstract patternRequiredCandleCount: number;

  abstract patternLogic(data: PatternFinderData): boolean;

  getAllPatternIndex(data: PatternFinderData) {
    if (data.close.length < this.patternRequiredCandleCount) {
      console.warn(
        "This pattern detection function requires more data!",
        this.patternName
      );
      return [];
    }
    if (data.reversedInput) {
      data.open.reverse();
      data.high.reverse();
      data.low.reverse();
      data.close.reverse();
    }
    let patternLogicFn = this.patternLogic;
    return this._prepareDataForLogicFn(data)
      .map((current: any, index: number) => {
        return patternLogicFn.call(this, current) ? index : undefined;
      })
      .filter((hasIndex: any) => {
        return hasIndex;
      });
  }

  hasPattern(data: PatternFinderData) {
    if (data.close.length < this.patternRequiredCandleCount) {
      console.warn(
        "This pattern detection function requires more data!",
        this.patternName
      );
      return false;
    }
    if (data.reversedInput) {
      data.open.reverse();
      data.high.reverse();
      data.low.reverse();
      data.close.reverse();
    }
    let patternLogicFn = this.patternLogic;
    return patternLogicFn.call(this, this._getDataForSpecificCandleStick(data));
  }

  protected _getDataForSpecificCandleStick(data: PatternFinderData) {
    let patternRequiredCandleCount = this.patternRequiredCandleCount;
    if (data.close.length === patternRequiredCandleCount) {
      return data;
    } else {
      let lastCandlestick = {
        open: [],
        high: [],
        low: [],
        close: [],
      } as PatternFinderData;
      let index = data.close.length - patternRequiredCandleCount;
      for (let i = 0; i < patternRequiredCandleCount; i++) {
        lastCandlestick.open.push(data.open[index + i]);
        lastCandlestick.high.push(data.high[index + i]);
        lastCandlestick.low.push(data.low[index + i]);
        lastCandlestick.close.push(data.close[index + i]);
      }
      return lastCandlestick;
    }
  }

  protected _prepareDataForLogicFn(data: PatternFinderData) {
    let patternRequiredCandleCount = this.patternRequiredCandleCount;
    let generatedData = data.close
      .map(function (currentData: any, index: number) {
        let mappedObject = {
          open: [],
          high: [],
          low: [],
          close: [],
        } as PatternFinderData;
        for (let i = 0; i < patternRequiredCandleCount; i++) {
          mappedObject.open.push(data.open[index + i]);
          mappedObject.high.push(data.high[index + i]);
          mappedObject.low.push(data.low[index + i]);
          mappedObject.close.push(data.close[index + i]);
        }
        return mappedObject;
      })
      .filter((val: any, index: number) => {
        return index <= data.close.length - patternRequiredCandleCount;
      });
    return generatedData;
  }

  approximateEqual(a: number, b: number): boolean {
    let diff = parseFloat(Math.abs(a - b).toPrecision(4));
    let eps = 0.5;
    return diff <= eps;
  }
}
