import logo from "./logo.svg";
import "./App.css";
import { getAppBackground } from "./services/app_backgrounds";
import IncomeInsightDefault from "./components/IncomeInsightDefault";
import DollarPath1 from "./assets/DollarPath1";
import ProductInsight from "./components/ProductInsight";
import CustomerSatisfactionInsight from "./components/CustomerSatisfactionInsight";

function App() {
  return (
    <>
      <div className="app" style={{ background: getAppBackground() }}>
        {/* <IncomeInsightDefault time="monthly" positive={true} percent={0.5}/> */}
        {/* <ProductInsightStars productId="PRODUCT1" time="daily" unitsSold={1356}/> */}
        <CustomerSatisfactionInsight productId="PRODUCT3" time="monthly" unitsSold={2236}/>
      </div>
    </>
  );
}

export default App;
