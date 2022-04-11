import MyStockChart from "./MyStockChart";
import { useApi } from "../../hooks/useApi";
import ReactLoading from "react-loading";
import LoadingError from "../loadingError/LoadingError";
import "./charts.scss";
import { prepareData } from "../../helpers/prepareData";

function ChartContainer() {
  let res = useApi(`function=TIME_SERIES_DAILY&symbol=GOOG&outputsize=full`);

  let response;
  if (!res.isLoading && res.error == null) {
    response = prepareData(res.data);
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
