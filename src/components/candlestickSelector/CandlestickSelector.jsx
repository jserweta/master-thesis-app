import React, { useState, useContext } from "react";
import PatternListItem from "./PatternListItem";
import { ChartContext } from "../../context/ChartContext";
import { CANDLESTICK_PATTERNS } from "../../constants/candlestickPatterns";
import "./candlestickSelector.scss";

const CandlestickSelector = () => {
  const { setSelectedCandlestickPattern } = useContext(ChartContext);

  const [candlestickPatterns, setCandlestickPatterns] =
    useState(CANDLESTICK_PATTERNS);

  const clickedPatternItem = (itemName) => {
    let allFalse = { name: "allFalse", active: false };
    let clickedItemIndex = candlestickPatterns.findIndex(
      (obj) => obj.name === itemName
    );

    candlestickPatterns.forEach((item, index) => {
      if (index === clickedItemIndex) {
        item.active = !item.active;
        if (!item.active) {
          allFalse.active = true;
        }
      } else {
        item.active = false;
      }
    });
    // console.log(candlestickPatterns);

    setCandlestickPatterns([...candlestickPatterns]);
    allFalse.active
      ? setSelectedCandlestickPattern(allFalse)
      : setSelectedCandlestickPattern(candlestickPatterns[clickedItemIndex]);
  };

  return (
    <div className="candlestickSelectorContainer">
      <h3 className="sectionHeader">Select candlestick pattern</h3>
      <div className="patternsList">
        {Object.keys(candlestickPatterns).map((key, index) => (
          <PatternListItem
            key={index}
            itemData={candlestickPatterns[key]}
            itemClick={clickedPatternItem}
          />
        ))}
      </div>
    </div>
  );
};

export default CandlestickSelector;
