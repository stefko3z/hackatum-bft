import React, { useEffect } from "react";
import { getProductEmoji, getProductName } from "../services/product_mapper";
import anime from "animejs";
import delivery from "../assets/delivery.png";

export default function ProductInsight(props) {
  let productName = getProductName(props.productId);
  let productEmoji = getProductEmoji(props.productId);

  let timePeriod = "";
  switch (props.time) {
    case "monthly":
      timePeriod = "Since last month";
      break;
    case "weekly":
      timePeriod = "Since last week";
      break;
    case "daily":
      timePeriod = "Since yesterday";
      break;
    default:
      break;
  }

  useEffect(async () => {
    // Translate all elements down
    // await anime({
    //   targets: [".product_text_top", ".product_emoji"],
    //   translateY: 10,
    //   opacity: [0, 1],
    //   duration: 2000,
    // }).finished;

    anime({
      targets: [".product_emoji"],
      // translateY: 10,
      rotateX: 15,
      direction: "alternate",
      loop: true,
      duration: 800,
    });

    anime({
      targets: ["#unit_counter"],
      // translateY: 10,
      innerHTML: [0, props.unitsSold],
      direction: "alternate",
      round: 1,
      duration: 3000,
      easing: "linear",
      loop: false,
    });

    // truck delivery
    anime({
      targets: ["#delivery"],
      translateY: 10,
      keyframes: [
        { translateX: 300, duration: 8000 },
        { rotateY: 180, duration: 5000 },
        { translateX: 0, duration: 8000 },
        { rotateY: 0, duration: 5000 },
      ],
      easing: "easeOutElastic(1, .8)",
      delay: anime.stagger(1000),
      loop: true,
    });
  }, []);

  return (
    <>
      <div className="element_wrapper">
        <div className="product_text_top">{productName} sales on the rise</div>
        <div className="product_emoji">{productEmoji}</div>
        <div className="product_text_top">{timePeriod} you have sold</div>
        <div className="product_text_units">
          <div id="unit_counter" style={{ color: "green", display: "inline" }}>
            {0}
          </div>{" "}
          units
        </div>
      </div>
      <div
        style={{
          display: "absolute",
          left: 5,
          marginLeft: 25,
          marginTop: 50,
        }}
      >
        <img id="delivery" src={delivery} left={5} height={80} width={80}></img>
      </div>
      <div
        style={{
          display: "absolute",
          left: 5,
          marginLeft: 25,
        }}
      >
        <img id="delivery" src={delivery} left={5} height={80} width={80}></img>
      </div>
      <div
        style={{
          display: "absolute",
          left: 5,
          marginLeft: 25,
        }}
      >
        <img id="delivery" src={delivery} left={5} height={80} width={80}></img>
      </div>
    </>
  );
}
