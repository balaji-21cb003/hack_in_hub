import { useEffect, useState } from "react";
import "./Puzzle.css";
import Singlecard from "./Singlecard";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function Puzzle() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [ChoiceOne, setChoiceOne] = useState(null);
  const [ChoiceTwo, setChoiceTwo] = useState(null);
  const [flipped, setFlipped] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  // Shuffle and initialize cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
    setGameCompleted(false);

    // setFlipped([]);
  };
  // handle a choice

  const handleChoice = (card) => {
    if (!ChoiceOne) {
      setChoiceOne(card);
    } else if (!ChoiceTwo) {
      setChoiceTwo(card);
    }
  };

  // const handleChoice = (card) => {
  //   ChoiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  // }

  // comapre 2 sele cards

  useEffect(() => {
    if (ChoiceOne && ChoiceTwo) {
      setDisabled(true);

      if (ChoiceOne.src === ChoiceTwo.src) {
        setCards((prevCards) => {
          const updatedCards = prevCards.map((card) => {
            if (card.src == ChoiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
          const allMatched = updatedCards.every((card) => card.matched);
          if (allMatched) {
            setGameCompleted(true);
          }
          return updatedCards;
          // return prevCards.map(card => {
          //   if(card.src === ChoiceOne.src){
          //     return {...card, matched:true};
          //   }else{
          //     return card

          //   }
          // })
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [ChoiceOne, ChoiceTwo]);

  console.log(cards);

  // rest choices
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      {gameCompleted ? (
        <div>
          <p
            style={{
              textAlign: "centre",
              fontWeight: "bold",
              fontSize: "30px",
              color: "red",
            }}
          >
            Congratulations!
          </p>
        </div>
      ) : (
        <div>
          <button onClick={shuffleCards}>New Game</button>

          <div className="card-grid">
            {cards.map((card) => (
              <Singlecard
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={
                  card === ChoiceOne || card === ChoiceTwo || card.matched
                }
                disabled={disabled}
              />
            ))}
          </div>
          <p>Turns : {turns}</p>
        </div>
      )}
    </div>
  );
}

export default Puzzle;
