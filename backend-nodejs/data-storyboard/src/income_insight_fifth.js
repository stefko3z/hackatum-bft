import "./style.css";
import anime, { path } from "animejs";
import { getMoneySVG } from "./svg_lib";
const config = require("./config");

export const generateIncomeFifth = async (container) => {
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

  await createPizzaSvg(container);
  await createPizzaAdditionSvg(container);
};

const createPizzaSvg = async (container) => {
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("income_path_wrapper");
    container.appendChild(containerDiv);
    const svgns = "http://www.w3.org/2000/svg";
    let svgElem = containerDiv.appendChild(
      document.createElementNS(svgns, "svg")
    );
    containerDiv.appendChild(svgElem);
    // svgElem.setAttribute('width', '430');
    svgElem.style.width = 350;
    svgElem.style.height = 350;

    svgElem = svgElem.appendChild(document.createElementNS(svgns, "g"));
    svgElem.setAttribute('fill', 'none');
    svgElem.setAttribute('stroke', 'orange');
    svgElem.setAttribute("stroke-width", "4");

    // Create pizza ellipse
    // crust
    let newEllipse = document.createElementNS(svgns, "ellipse");
    newEllipse.setAttribute("ry", "133.58491");
    newEllipse.setAttribute("rx", "133.58491");
    newEllipse.setAttribute("cy", "159.71698");
    newEllipse.setAttribute("cx", "168.01887");
    svgElem.appendChild(newEllipse);

    // crust
    newEllipse = document.createElementNS(svgns, "ellipse");
    newEllipse.classList.add("ellipse");
    newEllipse.setAttribute("ry", "139.43397");
    newEllipse.setAttribute("rx", "139.43397");
    newEllipse.setAttribute("cy", "160.28302");
    newEllipse.setAttribute("cx", "168.20754");
    svgElem.appendChild(newEllipse);

    newEllipse = document.createElementNS(svgns, "ellipse");
    newEllipse.classList.add("ellipse");
    newEllipse.setAttribute("ry", "9.62264");
    newEllipse.setAttribute("rx", "9.62264");
    newEllipse.setAttribute("cy", "114.62264");
    newEllipse.setAttribute("cx", "135");
    svgElem.appendChild(newEllipse);

    newEllipse = document.createElementNS(svgns, "ellipse");
    newEllipse.classList.add("ellipse");
    newEllipse.setAttribute("ry", "9.43396");
    newEllipse.setAttribute("rx", "9.43396");
    newEllipse.setAttribute("cy", "96.69811");
    newEllipse.setAttribute("cx", "76.69811");
    svgElem.appendChild(newEllipse);

    newEllipse = document.createElementNS(svgns, "ellipse");
    newEllipse.classList.add("ellipse");
    newEllipse.setAttribute("ry", "8.11321");
    newEllipse.setAttribute("rx", "8.11321");
    newEllipse.setAttribute("cy", "76.88679");
    newEllipse.setAttribute("cx", "205.18868");
    svgElem.appendChild(newEllipse);

    newEllipse = document.createElementNS(svgns, "ellipse");
    newEllipse.classList.add("ellipse");
    newEllipse.setAttribute("ry", "9.43396");
    newEllipse.setAttribute("rx", "9.43396");
    newEllipse.setAttribute("cy", "218.20755");
    newEllipse.setAttribute("cx", "87.26415");
    svgElem.appendChild(newEllipse);

    newEllipse = document.createElementNS(svgns, "ellipse");
    newEllipse.classList.add("ellipse");
    newEllipse.setAttribute("ry", "11.13208");
    newEllipse.setAttribute("rx", "11.13208");
    newEllipse.setAttribute("cy", "196.13208");
    newEllipse.setAttribute("cx", "128.58491");
    svgElem.appendChild(newEllipse);

    newEllipse = document.createElementNS(svgns, "ellipse");
    newEllipse.classList.add("ellipse");
    newEllipse.setAttribute("ry", "9.62264");
    newEllipse.setAttribute("rx", "9.62264");
    newEllipse.setAttribute("cy", "252.35849");
    newEllipse.setAttribute("cx", "194.24528");
    svgElem.appendChild(newEllipse);

    newEllipse = document.createElementNS(svgns, "ellipse");
    newEllipse.classList.add("ellipse");
    newEllipse.setAttribute("ry", "8.67925");
    newEllipse.setAttribute("rx", "8.67925");
    newEllipse.setAttribute("cy", "187.64151");
    newEllipse.setAttribute("cx", "257.45283");
    svgElem.appendChild(newEllipse);

    newEllipse = document.createElementNS(svgns, "ellipse");
    newEllipse.classList.add("ellipse");
    newEllipse.setAttribute("ry", "8.11321");
    newEllipse.setAttribute("rx", "8.11321");
    newEllipse.setAttribute("cy", "116.13207");
    newEllipse.setAttribute("cx", "224.0566");
    svgElem.appendChild(newEllipse);

    let newPath = document.createElementNS(svgns, "path");
    newPath.classList.add("path_crust");
    newPath.setAttribute(
      "d", "m34.81132,160.84906l265.9434,1.03774l-135.09434,-0.75472l1.13208,-135.09434l-2.26415,266.79245"
    );
    svgElem.appendChild(newPath);

    const svgPath = document.querySelectorAll(".path_crust");

    await anime({
      targets: svgPath,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 2000,
      delay: (el, i) => {
        return i * 500;
      },
    }).finished;
  };

  const createPizzaAdditionSvg = async (container) => {
    const containerDiv = document.createElement("div");
    // containerDiv.classList.add("income_path_wrapper");
    container.appendChild(containerDiv);
    const svgns = "http://www.w3.org/2000/svg";
    let svgElem = containerDiv.appendChild(
      document.createElementNS(svgns, "svg")
    );
    containerDiv.appendChild(svgElem);
    // svgElem.setAttribute('width', '430');
    svgElem.style.width = 350;
    svgElem.style.height = 350;

    svgElem = svgElem.appendChild(document.createElementNS(svgns, "g"));
    svgElem.setAttribute('fill', 'none');
    svgElem.setAttribute('stroke', 'orange');
    svgElem.setAttribute("stroke-width", "4");

    // Create cross
    let newLine = document.createElementNS(svgns, "line");
    newLine.classList.add("pizza_line");
    newLine.setAttribute("x1", "65.37736");
    newLine.setAttribute("x2", "65.37736");
    newLine.setAttribute("y1", "39.90566");
    newLine.setAttribute("y2", "105.20603");
    newLine.setAttribute("transform", "rotate(90 65.3774 72.7445)");
    svgElem.appendChild(newLine);

    newLine = document.createElementNS(svgns, "line");
    newLine.classList.add("pizza_line");
    newLine.setAttribute("x1", "65.37736");
    newLine.setAttribute("x2", "65.37736");
    newLine.setAttribute("y1", "39.5283");
    newLine.setAttribute("y2", "105.20603");
    svgElem.appendChild(newLine);

    let newPath = document.createElementNS(svgns, "path");
    newPath.classList.add("path_crust");
    newPath.setAttribute(
      "d", "m205.75472,20.66038l98.77359,26.88679l-94.71698,87.16981l-4.0566,-114.0566z"
    );
    svgElem.appendChild(newPath);

    const svgPath = document.querySelectorAll(".path_crust");
    await anime({
      targets: svgPath,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 2000,
      delay: (el, i) => {
        return i * 500;
      },
    }).finished;

    newLine = document.createElementNS(svgns, "line");
    newLine.classList.add("pizza_line");
    newLine.setAttribute("x1", "206.13208");
    newLine.setAttribute("x2", "298.20755");
    newLine.setAttribute("y1", "27.45283");
    newLine.setAttribute("y2", "53.11321");
    svgElem.appendChild(newLine);

    // Create pizza ellipse
    let newEllipse = document.createElementNS(svgns, "ellipse");
    newEllipse.setAttribute("ry", "9.62264");
    newEllipse.setAttribute("rx", "9.62264");
    newEllipse.setAttribute("cy", "77.45283");
    newEllipse.setAttribute("cx", "248.20755");
    svgElem.appendChild(newEllipse);

  };
