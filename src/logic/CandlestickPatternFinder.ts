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

  // hasPattern(data: PatternFinderData) {
  //   if (data.close.length < this.patternRequiredCandleCount) {
  //     console.warn(
  //       "Data count less than data required for the strategy!",
  //       this.patternName
  //     );
  //     return false;
  //   }
  //   if (data.reversedInput) {
  //     data.open.reverse();
  //     data.high.reverse();
  //     data.low.reverse();
  //     data.close.reverse();
  //   }
  //   let patternLogicFn = this.logic;
  //   return patternLogicFn.call(this, this._getLastDataForCandleStick(data));
  // }

  // protected _getLastDataForCandleStick(data: PatternFinderData) {
  //   let patternRequiredCandleCount = this.patternRequiredCandleCount;
  //   if (data.close.length === patternRequiredCandleCount) {
  //     return data;
  //   } else {
  //     let returnVal = {
  //       open: [],
  //       high: [],
  //       low: [],
  //       close: [],
  //     } as PatternFinderData;
  //     let index = data.close.length - patternRequiredCandleCount;
  //     for (let i = 0; i < patternRequiredCandleCount; i++) {
  //       returnVal.open.push(data.open[index + i]);
  //       returnVal.high.push(data.high[index + i]);
  //       returnVal.low.push(data.low[index + i]);
  //       returnVal.close.push(data.close[index + i]);
  //     }
  //     return returnVal;
  //   }
  // }

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
    let left = parseFloat(Math.abs(a - b).toPrecision(4)) * 1;
    let right = parseFloat((a * 0.001).toPrecision(4)) * 1;
    return left <= right;
  }
}
