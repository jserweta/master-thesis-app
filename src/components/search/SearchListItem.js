import React from "react";

const SearchListItem = ({ itemData, itemClick }) => {
  return (
    <div
      className="searchContainer__searchItem"
      onClick={() => itemClick(itemData.symbol)}
    >
      <div className="itemWrapper">
        <h4>{itemData.name}</h4>
        <div className="details">
          <p>{itemData.symbol}</p>
          <p>{itemData.currency}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchListItem;
