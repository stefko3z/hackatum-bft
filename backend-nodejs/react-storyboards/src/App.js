import logo from "./logo.svg";
import "./App.css";
import { getAppBackground } from "./services/app_backgrounds";
import IncomeInsightDefault from "./components/IncomeInsightDefault";
import DollarPath1 from "./assets/DollarPath1";
import ProductInsight from "./components/ProductInsight";

function App() {
  return (
    <>
      <div className="app" style={{ background: getAppBackground() }}>
        {/* <IncomeInsightDefault time="monthly" positive={true} percent={0.5}/> */}
        <ProductInsight productId="PRODUCT1" time="daily" unitsSold={1356}/>
      </div>
    </>
  );
}

export default App;
