import { useState, useEffect, Fragment } from "react";
import SingleCard from "./SingleCard";
import Modal from "./Modal";
import classes from "./CardBoard.module.css";
import { createPortal } from "react-dom";

const cardImages = [
  { src: require("../assets/img/DisasterGirl.jpg").default, match: false },
  { src: require("../assets/img/YaoMing.jpg").default, match: false },
  { src: require("../assets/img/Jordan.jpg").default, match: false },
  { src: require("../assets/img/Smart.jpg").default, match: false },
  { src: require("../assets/img/NickYoung.jpg").default, match: false },
  { src: require("../assets/img/Dicaprio.jpg").default, match: false },
];

const CardBoard = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [pair, setPair] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setPair(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // reset
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCard) => {
          return prevCard.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, match: true };
            } else {
              return card;
            }
          });
        });
        setPair((prevPair) => prevPair + 1);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 700);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (pair === 6) {
      setTimeout(() => {
        setShowModal(true);
      }, 500);
    }
  }, [pair]);

  return (
    <Fragment>
      <h1>Meme Match</h1>
      <button className={classes.start_button} onClick={shuffleCards}>New Game</button>
      <div className={classes["card-grid"]}>
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.match}
            disabled={disabled}
          />
        ))}
      </div>
      {showModal &&
        createPortal(
          <Modal turns={turns} setShowModal={setShowModal} />,
          document.getElementById("modal")
        )}
    </Fragment>
  );
};

export default CardBoard;
