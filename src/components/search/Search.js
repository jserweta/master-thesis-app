import React, { useRef, useState, useContext } from "react";
import { ReactComponent as SearchIcon } from "../../img/search-icon.svg";
import { useApi } from "../../hooks/useApi";
import ReactLoading from "react-loading";
import LoadingError from "../loadingError/LoadingError";
import { prepareSearchData } from "../../helpers/prepareData";
import { ChartContext } from "../../context/ChartContext";
import "./search.scss";
import SearchListItem from "./SearchListItem";

const Search = () => {
  let searchValue = useRef();

  const { setSelectedCompanyData } = useContext(ChartContext);

  const [searchKeywords, setSearchKeywords] = useState("");
  const res = useApi(`function=SYMBOL_SEARCH&keywords=${searchKeywords}`);

  // console.log(res);

  let response;
  if (!res.isLoading && res.error == null) {
    response = prepareSearchData(res.data);
  }

  const clickedListItem = (symbol) => {
    setSelectedCompanyData(symbol);
  };
  // console.log(response);

  return (
    <div className="searchContainer">
      <div className="searchContainer__searchBar">
        <input type="text" placeholder="Search..." ref={searchValue} />
        <SearchIcon
          onClick={() => setSearchKeywords(searchValue.current.value)}
        />
      </div>

      <div className="searchContainer__searchResults">
        {res.isLoading && (
          <div className="loadingErrorWrapper">
            <ReactLoading
              type="spinningBubbles"
              color="#43415b"
              height={40}
              width={40}
            />
          </div>
        )}

        {res.error && searchKeywords !== "" && (
          <div className="loadingErrorWrapper">
            <LoadingError message={`Oops! There are no matching results :(`} />
          </div>
        )}

        {!res.isLoading &&
          res.data !== null &&
          res.error === null &&
          Object.keys(response).map((key, index) => (
            <SearchListItem
              key={index}
              itemData={response[key]}
              itemClick={clickedListItem}
            />
          ))}
      </div>
    </div>
  );
};

export default Search;
