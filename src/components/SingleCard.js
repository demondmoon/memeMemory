import React from "react";
import classes from "./SingleCard.module.css";

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className={classes.card}>
      <div className={flipped ? classes.flipped : ""}>
        <img className={classes.front} src={card.src} alt="card front" />
        <img
          className={classes.back}
          onClick={handleClick}
          src={require("../assets/img/Cardback.jpg").default}
          alt="card back"
        />
      </div>
    </div>
  );
};

export default SingleCard;
