import ChartContainer from "./components/charts/ChartContainer";
import { Header } from "./components/header/Header";
import Search from "./components/search/Search";
import ChartDataProvider from "./context/ChartContext";
import CandlestickSelector from "./components/candlestickSelector/CandlestickSelector";
import "./sass/_normalize.scss";
import "./sass/global.scss";

function App() {
  return (
    <>
      <Header />
      <div className="app">
        <ChartDataProvider>
          <ChartContainer />
          <div className="sidebar">
            <Search />
            <CandlestickSelector />
          </div>
        </ChartDataProvider>
      </div>
    </>
  );
}

export default App;
