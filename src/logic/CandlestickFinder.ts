import CandleFinderData from "./CandleFinderData";

export default class CandlestickFinder {
  requiredCount: number;
  name: string;
  constructor(requiredCount: number, name: string) {
    this.requiredCount = requiredCount;
    this.name = name;
    // if (new.target === Abstract) {
    //     throw new TypeError("Abstract class");
    // }
  }
  approximateEqual(a: number, b: number): boolean {
    let left = parseFloat(Math.abs(a - b).toPrecision(4)) * 1;
    let right = parseFloat((a * 0.001).toPrecision(4)) * 1;
    return left <= right;
  }

  logic(data: CandleFinderData): boolean {
    throw "this has to be implemented";
  }
  getAllPatternIndex(data: CandleFinderData) {
    if (data.close.length < this.requiredCount) {
      console.warn(
        "Data count less than data required for the strategy ",
        this.name
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

  hasPattern(data: CandleFinderData) {
    if (data.close.length < this.requiredCount) {
      console.warn(
        "Data count less than data required for the strategy ",
        this.name
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

  protected _getLastDataForCandleStick(data: CandleFinderData) {
    let requiredCount = this.requiredCount;
    if (data.close.length === requiredCount) {
      return data;
    } else {
      let returnVal = {
        open: [],
        high: [],
        low: [],
        close: [],
      } as CandleFinderData;
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

  protected _generateDataForCandleStick(data: CandleFinderData) {
    let requiredCount = this.requiredCount;
    let generatedData = data.close
      .map(function (currentData: any, index: number) {
        let i = 0;
        let returnVal = {
          open: [],
          high: [],
          low: [],
          close: [],
        } as CandleFinderData;
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
