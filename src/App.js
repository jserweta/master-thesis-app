import "./sass/_normalize.scss";
import "./sass/global.scss";
import ChartContainer from "./components/charts/ChartContainer";
import { Header } from "./components/header/Header";
import Search from "./components/search/Search";

function App() {
  return (
    <>
      <Header />
      <div className="app">
        <ChartContainer />
        <Search />
      </div>
    </>
  );
}

export default App;
