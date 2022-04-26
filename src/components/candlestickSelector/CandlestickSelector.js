import React, { useState } from "react";
import PatternListItem from "./PatternListItem";
import "./candlestickSelector.scss";

const CandlestickSelector = () => {
  const [candlestickPatterns, setCandlestickPatterns] = useState([
    {
      name: "All",
      active: true,
    },
    {
      name: "Abandoned Baby",
      active: false,
    },
    {
      name: "Bearish Engulfing Pattern",
      active: false,
    },
    {
      name: "Doji",
      active: false,
    },
    {
      name: "Bullish Hammer",
      active: false,
    },
    {
      name: "Bearish Hammer",
      active: false,
    },
    {
      name: "Hanging Man",
      active: false,
    },
    {
      name: "Tweezer Top",
      active: false,
    },
  ]);

  const clickedPatternItem = (itemName) => {
    let clickedItem = candlestickPatterns.findIndex(
      (obj) => obj.name === itemName
    );

    candlestickPatterns.forEach((item, index) => {
      if (index === clickedItem) {
        item.active = !item.active;
      } else {
        item.active = false;
      }
    });

    setCandlestickPatterns([...candlestickPatterns]);
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
