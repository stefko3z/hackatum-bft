import logo from './logo.svg';
import './App.css';
import { getAppBackground } from './services/app_backgrounds';
import IncomeInsightDefault from './components/IncomeInsightDefault';
import DollarPath1 from './assets/DollarPath1';

function App() {
  return (
    <>
    <div className="app" style={{background: getAppBackground()}}>
      <IncomeInsightDefault time="monthly" positive={true} percent={0.5}/>
    </div>
    </>
  );
}

export default App;
