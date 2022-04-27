import React from "react";

const PatternListItem = ({ itemData, itemClick }) => {
  return (
    <div
      className={`patternsList__patternItem ${itemData.active ? "active" : ""}`}
      onClick={() => itemClick(itemData.name)}
    >
      <div className="itemWrapper">{itemData.name}</div>
    </div>
  );
};

export default PatternListItem;
