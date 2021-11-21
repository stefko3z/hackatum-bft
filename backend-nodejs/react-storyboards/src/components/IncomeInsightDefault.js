import React, { useEffect } from "react";
import anime from "animejs";
import StockGrowth from "./StockGrowth";
import DollarPath1 from "../assets/DollarPath1";
import dollar from "../assets/dollar-bill.png";
import DollarPath2 from "../assets/DollarPath2";
import DollarPath3 from "../assets/DollarPath3";

export default function IncomeInsightDefault(props) {
  // Prep data
  let timePeriod = "";
  let timePeriodAfter = "";
  switch (props.time) {
    case "monthly":
      timePeriod = "monthly";
      timePeriodAfter = "month";
      break;
    case "weekly":
      timePeriod = "weekly";
      timePeriodAfter = "week";
      break;
    case "daily":
      timePeriod = "daily";
      timePeriodAfter = "day";
      break;
    default:
      break;
  }
  let netChange = props.positive ? "increased" : "decreased";
  let percentText = props.percent * 100;

  // add animations
  useEffect(async () => {
    // Make bill1 follow path
    var path = anime.path(".dollar_path_1");
    anime({
      targets: ".dollar_bill1",
      translateX: path("x"),
      translateY: path("y"),
      rotate: path("angle"),
      easing: "linear",
      duration: 4000,
      loop: true,
    });

    // Make bill2 follow path
    var path = anime.path(".dollar_path_2");
    anime({
      targets: ".dollar_bill2",
      translateX: path("x"),
      translateY: path("y"),
      rotate: path("angle"),
      easing: "linear",
      duration: 4000,
      loop: true,
    });

    // Make bill2 follow path
    var path = anime.path(".dollar_path_3");
    anime({
      targets: ".dollar_bill3",
      translateX: path("x"),
      translateY: path("y"),
      rotate: path("angle"),
      easing: "linear",
      duration: 4000,
      loop: true,
    });

    // Translate all elements down
    await anime({
      targets: [".income_text_div", ".income_text_div_percent"],
      translateY: 50,
      opacity: [0, 1],
      duration: 2000,
    }).finished;

    // Idle animation for percent label
    anime({
      targets: [".income_text_div_percent"],
      scale: 1.75,
      duration: 3000,
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine",
    });

    await anime({
        targets: [".svg_wrapper"],
        opacity: 1,
        duration: 2000,
    }).finished;

    // Color path
    anime({
      targets: [".path"],
      loop: true,
      direction: "alternate",
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 2000,
      delay: (el, i) => {
        return i * 500;
      },
    });
  }, []);

  return (
    <>
      <div style={{ position: "absolute" }}>
        <DollarPath1 />
      </div>
      <div
        style={{
          left: 0,
          top: 300,
          position: "absolute",
        }}
      >
        <img src={dollar} width="50" height="40" className="dollar_bill1" />
      </div>

      <div style={{ position: "absolute" }}>
        <DollarPath2 />
      </div>
      <div
        style={{
          left: -50,
          top: 300,
          position: "absolute",
        }}
      >
        <img src={dollar} width="50" height="40" className="dollar_bill2" />
      </div>

      <div style={{ position: "absolute" }}>
        <DollarPath3 />
      </div>
      <div
        style={{
          left: -50,
          top: 300,
          position: "absolute",
        }}
      >
        <img src={dollar} width="50" height="40" className="dollar_bill3" />
      </div>

      <div className="element_wrapper">
        <div className="income_text_div">
          Your {timePeriod} income has {netChange} by
        </div>
        <div
          className="income_text_div_percent"
          style={{ color: props.positive ? "green" : "red" }}
        >
          {percentText}%
        </div>
        <div className="income_text_div">over the last {timePeriodAfter}</div>
        <div className="income_filler"></div>

        {/* <div className="income_svg_wrapper">
          <StockGrowth />
        </div> */}

        <div className="svg_wrapper"
          style={{
            left: 100,
            top: 250,
            position: "absolute",
            opacity: 0
          }}
        >
          <StockGrowth />
        </div>
      </div>
    </>
  );
}
