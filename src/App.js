import "./sass/_normalize.scss";
import "./sass/global.scss";
import ChartContainer from "./components/charts/ChartContainer";
import { Header } from "./components/header/Header";

function App() {
  return (
    <>
      <Header />
      <div className="app">
        <ChartContainer />
      </div>
    </>
  );
}

export default App;
