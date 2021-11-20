import _ from "lodash";
import "./style.css";
import anime from "animejs";

const config = require("./config");

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

// Create and return container
const initContainer = () => {
  const container = document.createElement("div");
  container.classList.add("iphone_container");
  return container;
};

async function generateIncomeInsight(container) {
  
  // Prep data
  let timePeriod = "";
  let timePeriodAfter = "";
  switch (config.time) {
    case "Monthly":
      timePeriod = "monthly";
      timePeriodAfter = "month";
      break;
    case "Weekly":
      timePeriod = "weekly";
      timePeriodAfter = "week";
      break;
    case "Daily":
      timePeriod = "daily";
      timePeriodAfter = "day";
      break;
    default:
      break;
  }
  let netChange = config.positive? "increased": "decreased";
  let percentText = config.percent * 100;
  
  // Init element
  const textElem = container.appendChild(document.createElement("div"));
  textElem.innerHTML = `Your ${timePeriod} income has ${netChange} by`;
  textElem.classList.add("income_text_div");

  // Create percent elem
  const percentElem = container.appendChild(document.createElement("div"));
  percentElem.innerHTML = `${percentText}%`;
  percentElem.classList.add("income_text_div_percent");
  percentElem.style.color = config.positive? "green": "red";

  // Init after text element
  const textElemAfter = container.appendChild(document.createElement("div"));
  textElemAfter.innerHTML = `over the last ${timePeriodAfter}`;
  textElemAfter.classList.add("income_text_div");

  // Add float animation
  await anime({
    targets: [textElem, percentElem, textElemAfter],
    translateY: 50,
    opacity: [0, 1],
    duration: 2000
  }).finished;

  // Add scale animation
  anime({
    targets: [percentElem],
    scale: 2,
    duration: 3000,
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutSine'
  })
}

document.body.appendChild(component());
