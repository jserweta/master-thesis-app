import React from "react";

const PatternListItem = ({ itemData, itemClick }) => {
  return (
    <div
      className={`patternsList__patternItem ${
        itemData.type ? "patternItemsSection" : ""
      } ${itemData.active ? "active" : ""}`}
      onClick={() => (itemData.type ? "" : itemClick(itemData.name))}
    >
      <div className="itemWrapper">{itemData.name}</div>
    </div>
  );
};

export default PatternListItem;
