import React, { useContext } from "react";
import MyStockChart from "./MyStockChart";
import { useApi } from "../../hooks/useApi";
import ReactLoading from "react-loading";
import LoadingError from "../loadingError/LoadingError";
import { ChartContext } from "../../context/ChartContext";
import "./charts.scss";
import { prepareChartData } from "../../helpers/prepareData";

function ChartContainer() {
  const { selectedCompanyData } = useContext(ChartContext);
  const symbol = selectedCompanyData !== "" ? selectedCompanyData : "GOOG";
  const res = useApi(
    `function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full`
  );

  let response;
  if (!res.isLoading && res.error == null) {
    response = prepareChartData(res.data);
  }

  return (
    <div className="chartContainer">
      {res.isLoading && (
        <ReactLoading
          type="spinningBubbles"
          color="#43415b"
          height={80}
          width={80}
        />
      )}

      {res.error && (
        <LoadingError
          message={`Oops! Data loading failed :( \n Try again later!`}
        />
      )}

      {!res.isLoading && res.data !== null && res.error == null && (
        <MyStockChart financialData={response} />
      )}
    </div>
  );
}

export default ChartContainer;
