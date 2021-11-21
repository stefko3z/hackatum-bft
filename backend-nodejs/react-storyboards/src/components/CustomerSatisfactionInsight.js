import React, { useEffect } from "react";
import { getProductEmoji, getProductName } from "../services/product_mapper";
import anime from "animejs";
import star from "../assets/star.png";
import customers from "../assets/customers.png";

export default function CustomerSatisfactionInsight(props) {
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

    // For each 500 units sold add a star
    for (let i = 1; i <= Math.min(props.unitsSold / 500, 5); i++) {
      await anime({
        targets: [`#star${i}`],
        translateY: 10,
        keyframes: [
          { opacity: 1, duration: 500 },
          { translateY: -180, duration: 1000 },
        ],
        delay: 1000,
        easing: "easeOutElastic(1, .8)",
      }).finished;

      anime({
        targets: ["#customers"],
        rotateX: 25,
        // scale: 1.1,
        // translateX: 10,
        direction: "alternate",
        duration: 500,
      });

      anime({
        targets: [`#star${i}`],
        rotateY: 15,
        loop: true,
        direction: "alternate",
        easing: "easeOutElastic(1, .8)",
      });

    }

    // truck delivery
    // anime({
    //   targets: ["#delivery"],
    //   translateY: 10,
    //   keyframes: [
    //     { translateX: 300, duration: 8000 },
    //     { rotateY: 180, duration: 5000 },
    //     { translateX: 0, duration: 8000 },
    //     { rotateY: 0, duration: 5000 },
    //   ],
    //   easing: "easeOutElastic(1, .8)",
    //   delay: anime.stagger(1000),
    //   loop: true,
    // });
  }, []);

  return (
    <>
      <div className="element_wrapper">
        <div className="product_text_top">Your customer satisfaction</div>
        <div className="product_emoji">
          <img
            id="customers"
            src={customers}
            height={140}
            width={140}
            left="auto"
          ></img>
        </div>
        <div className="product_text_top">
          for the last month has been rated
        </div>
      </div>
      <div
        style={{
          display: "absolute",
          left: 5,
          marginLeft: 15,
          marginTop: 200,
        }}
      >
        <img id="star1" style={{opacity: 0.25}} src={star} height={80} width={80}></img>
        <img id="star2" style={{opacity: 0.25}} src={star} height={80} width={80}></img>
        <img id="star3" style={{opacity: 0.25}} src={star} height={80} width={80}></img>
        <img id="star4" style={{opacity: 0.25}} src={star} height={80} width={80}></img>
        <img id="star5" style={{opacity: 0.25}} src={star} height={80} width={80}></img>
      </div>
    </>
  );
}
