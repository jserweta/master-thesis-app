import { PatternFinderData } from "../interfaces/patternFinderData";

export default class CandlestickFinder {
  finderRequiredCount: number;
  finderName: string;
  constructor(requiredCount: number, name: string) {
    this.finderRequiredCount = requiredCount;
    this.finderName = name;
  }
  approximateEqual(a: number, b: number): boolean {
    let left = parseFloat(Math.abs(a - b).toPrecision(4)) * 1;
    let right = parseFloat((a * 0.001).toPrecision(4)) * 1;
    return left <= right;
  }

  logic(data: PatternFinderData): boolean {
    throw Object.assign(new Error("Implement in specific pattern!"));
  }
  getAllPatternIndex(data: PatternFinderData) {
    if (data.close.length < this.finderRequiredCount) {
      console.warn(
        "Data count less than data required for the strategy!",
        this.finderName
      );
      return [];
    }
    if (data.reversedInput) {
      data.open.reverse();
      data.high.reverse();
      data.low.reverse();
      data.close.reverse();
    }
    let strategyFn = this.logic;
    return this._generateDataForCandleStick(data)
      .map((current: any, index: number) => {
        return strategyFn.call(this, current) ? index : undefined;
      })
      .filter((hasIndex: any) => {
        return hasIndex;
      });
  }

  hasPattern(data: PatternFinderData) {
    if (data.close.length < this.finderRequiredCount) {
      console.warn(
        "Data count less than data required for the strategy!",
        this.finderName
      );
      return false;
    }
    if (data.reversedInput) {
      data.open.reverse();
      data.high.reverse();
      data.low.reverse();
      data.close.reverse();
    }
    let strategyFn = this.logic;
    return strategyFn.call(this, this._getLastDataForCandleStick(data));
  }

  protected _getLastDataForCandleStick(data: PatternFinderData) {
    let requiredCount = this.finderRequiredCount;
    if (data.close.length === requiredCount) {
      return data;
    } else {
      let returnVal = {
        open: [],
        high: [],
        low: [],
        close: [],
      } as PatternFinderData;
      let i = 0;
      let index = data.close.length - requiredCount;
      while (i < requiredCount) {
        returnVal.open.push(data.open[index + i]);
        returnVal.high.push(data.high[index + i]);
        returnVal.low.push(data.low[index + i]);
        returnVal.close.push(data.close[index + i]);
        i++;
      }
      return returnVal;
    }
  }

  protected _generateDataForCandleStick(data: PatternFinderData) {
    let requiredCount = this.finderRequiredCount;
    let generatedData = data.close
      .map(function (currentData: any, index: number) {
        let i = 0;
        let returnVal = {
          open: [],
          high: [],
          low: [],
          close: [],
        } as PatternFinderData;
        while (i < requiredCount) {
          returnVal.open.push(data.open[index + i]);
          returnVal.high.push(data.high[index + i]);
          returnVal.low.push(data.low[index + i]);
          returnVal.close.push(data.close[index + i]);
          i++;
        }
        return returnVal;
      })
      .filter((val: any, index: number) => {
        return index <= data.close.length - requiredCount;
      });
    return generatedData;
  }
}
