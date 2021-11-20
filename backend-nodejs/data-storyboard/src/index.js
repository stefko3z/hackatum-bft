import "./style.css";
import { generateIncomeInsight } from "./income_insight_default";
const config = require("./config");

const initContainer = () => {
  const container = document.createElement("div");
  container.classList.add("iphone_container");
  return container;
};

// Populate contaienr with objects
function component() {
  const container = initContainer();

  switch (config.type) {
    case "IncomeInsight":
      generateIncomeInsight(container);
      break;
    default:
      console.error(
        "Could not determine type, check if type was set correctly"
      );
      break;
  }

  return container;
}

document.body.appendChild(component());
