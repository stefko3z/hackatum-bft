import "./style.css";
import anime, { path } from "animejs";
import { getMoneySVG } from "./svg_lib";
const config = require("./config");

// Create and return container
export async function generateIncomeInsight(container) {
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
  let netChange = config.positive ? "increased" : "decreased";
  let percentText = config.percent * 100;

  // Init element
  const textElem = container.appendChild(document.createElement("div"));
  textElem.innerHTML = `Your ${timePeriod} income has ${netChange} by`;
  textElem.classList.add("income_text_div");

  // Create percent elem
  const percentElem = container.appendChild(document.createElement("div"));
  percentElem.innerHTML = `${percentText}%`;
  percentElem.classList.add("income_text_div_percent");
  percentElem.style.color = config.positive ? "green" : "red";

  // Init after text element
  const textElemAfter = container.appendChild(document.createElement("div"));
  textElemAfter.innerHTML = `over the last ${timePeriodAfter}`;
  textElemAfter.classList.add("income_text_div");

  // Add float animation
  await anime({
    targets: [textElem, percentElem, textElemAfter],
    translateY: 50,
    opacity: [0, 1],
    duration: 2000,
  }).finished;

  // Add idle animation for percent label
  anime({
    targets: [percentElem],
    scale: 2,
    duration: 3000,
    loop: true,
    direction: "alternate",
    easing: "easeInOutSine",
  });

  createLineSvg(container);

  // const money = getMoneySVG();
  // container.appendChild(money);
}

const createLineSvg = (container) => {
  const containerDiv = container.appendChild(document.createElement("div"));
  containerDiv.classList.add("income_path_wrapper");
  const svgElem = containerDiv.appendChild(
    document.createElementNS("http://www.w3.org/2000/svg", "svg")
  );
  // svgElem.setAttribute('width', '430');
  // svgElem.setAttribute('height', '150');
  svgElem.style.width = 300;
  svgElem.style.height = 150;

  const svgns = "http://www.w3.org/2000/svg";
  let newPath = document.createElementNS(svgns, "path");
  newPath.classList.add("path");
  newPath.setAttribute(
    "d",
    "m13.85246,129.2623l34.34426,-20.08197l7.21311,7.86885l30.16393,-21.63934l17.37705,19.01639l35.7377,-29.5082l9.83607,15.7377l50.81967,-51.14754l6.22951,24.59016l36.72131,-40.98361l9.5082,7.86885l-0.98361,-29.83607l-26.22951,11.80328l12.13115,7.54098"
  );
  newPath.setAttribute("stroke", "green");
  newPath.setAttribute("stroke-width", "4");
  newPath.setAttribute("fill", "none");

  svgElem.appendChild(newPath);

  const svgPath = document.querySelectorAll(".path");

  anime({
    targets: svgPath,
    loop: true,
    direction: "alternate",
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: "easeInOutSine",
    duration: 2000,
    delay: (el, i) => {
      return i * 500;
    },
  });
};
