import "./sass/_normalize.scss";
import "./sass/global.scss";
import ChartContainer from "./components/charts/ChartContainer";
import { Header } from "./components/header/Header";
import Search from "./components/search/Search";
import ChartDataProvider from "./context/ChartContext";

function App() {
  return (
    <>
      <Header />
      <div className="app">
        <ChartDataProvider>
          <ChartContainer />
          <Search />
        </ChartDataProvider>
      </div>
    </>
  );
}

export default App;
