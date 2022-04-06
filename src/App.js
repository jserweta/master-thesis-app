import MyStockChart from "./components/charts/MyStockChart";
// import Highcharts from "highcharts/highstock";
import { useApi } from "./hooks/useApi";
import "./sass/global.scss";
import "./sass/_normalize.scss";
import "./sass/_highcharts.scss";

function App() {
  const { data, isLoading, error } = useApi(
    `function=TIME_SERIES_DAILY&symbol=IBM&outputsize=compact`
  );
  console.log(data);
  return (
    <div>
      {isLoading && "Loading..."}

      {error && <div>Oops! Data loading failed :(</div>}

      {!isLoading && data !== null && <MyStockChart financialData={data} />}
    </div>
  );
}

export default App;
