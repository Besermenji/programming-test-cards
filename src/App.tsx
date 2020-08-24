import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import logo from './logo.svg';
import './App.css';
import { cardsArray } from './constants/cards';
import { randomSplice } from './utils/randomSplice';

type FormData = {
  numberOfPlayers: number;
};

function App() {
  const [playerCards, updatePlayerCards] = useState<string[][]>([]);
  const { register, handleSubmit, errors, setValue } = useForm<FormData>();

  const restartDealing = () => {
    updatePlayerCards([]);
    setValue('numberOfPlayers');
  }
  const onSubmit = (data: FormData) => {
    const cards = [...cardsArray];
    const cardsCount = cards.length;
    let {numberOfPlayers } = data;
    if (!Number(numberOfPlayers)) {
      restartDealing();
      return;
    }
    if (Number(numberOfPlayers) > cardsCount) {
      numberOfPlayers = cardsCount;
    }
    const numberOfDeltCards = Math.floor(cardsCount / numberOfPlayers);
    const dealtCards = [...Array(Number(numberOfPlayers))].map(() => randomSplice(cards, numberOfDeltCards).extractedItem);
    updatePlayerCards(dealtCards);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="numberOfPlayers" type="number" ref={register({ min: 0, required: true })} />
          <input type="submit" />
          <button onClick={restartDealing}>restart</button>
          <div>
            {errors.numberOfPlayers && "Input value does not exist or value is invalid"}
          </div>
        </form>
        <br/>
        {playerCards.map((cards: string[], i: number) => <span key={cards.join(',')}>{cards.join(',')}<br /></span>)}
      </header>
    </div>
  );
}

export default App;
