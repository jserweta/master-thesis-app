import { useApi } from "./hooks/useApi";
import "./sass/global.scss";
import "./sass/_normalize.scss";

function App() {
  const { data, isLoading, error } = useApi(
    `function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min`
  );
  // console.log(data);
  // const timeSeries = !isLoading ? data["Time Series (5min)"] : "";
  // const obj = data["Time Series (5min)"];
  console.log(data);
  return (
    <div className="App">
      {isLoading && "Loading..."}

      {error && <div>Error!</div>}

      {!isLoading &&
        data !== null &&
        data.ohlcData?.map((item, index) => (
          <div>
            <div>{item}</div>
          </div>
        ))}
    </div>
  );
}

export default App;
