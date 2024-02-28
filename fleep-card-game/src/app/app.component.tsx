import { useEffect, useState } from 'react';
import { ICard } from '../interfaces/card';
import { Card } from './card/card.component';
import style from './app.module.css';
import { Win } from './win/win.component';
import { formatTime } from '../utils/formatTime';
import { History } from './history/history.component';
import { IHistory } from '../interfaces/history';

export function App() {

  const [cards, setCards] = useState<ICard[]>([]);
  const [win, setWin] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [previousCard, setPreviousCard] = useState<ICard>();
  const [timer, setTimer] = useState(0);
  const [moves, setMoves] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const [mode, setMode] = useState<string>('Easy');
  const [openMenu, setOpenMenu] = useState(false);
  const [gridSize, setGridSize] = useState(16);
  const [cellSize, setCellSize] = useState(100);
  const [openHistory, setOpenHistory] = useState(false);
  const [history, setHistory] = useState<IHistory[]>([]);
  const [score, setScore] = useState(0);
  const [save, setSave] = useState(false);

  // Get the history from localStorage
  useEffect(() => {
    const history = localStorage.getItem('history') || '[]';
    setHistory(JSON.parse(history));
  }, []);

  // Init the game
  useEffect(() => {
    initGame();
  }, [gridSize]);

  // Restart the game each time that the user change the mode
  useEffect(() => {
    handleRestart();
  }, [mode]);

  // Store the histoy in localStorage when the user win
  useEffect(() => {
    if (save) {
      setSave(false);
      saveHistory();
    }
  }, [save]);

  // When the user start a new game the timer is setup
  useEffect(() => {

    let id: NodeJS.Timeout;

    if (playing) {
      id = setInterval(() => setTimer(timer => timer + 1), 1000);
      setIntervalId(id);
    }

    return () => clearInterval(id);
  }, [playing]);

  // Create the cards and suffles them in random order
  function initGame() {

    const cards: ICard[] = [];

    let id = 1;
    let val = 1;

    while (val <= gridSize / 2) {
      cards.push(createCard(id++, val));
      cards.push(createCard(id++, val));
      val++;
    }

    setCards(cards.sort((c1, c2) => c1.position - c2.position));
    setWin(false);
  }

  function createCard(id: number, value: number) {
    return {
      id,
      position: Math.floor(Math.random() * 99) + 1,
      value,
      flipped: false,
      matched: false
    };
  }

  function handleStart() {
    initGame();
    setPlaying(true);
    setTimer(0);
    setMoves(0);
    setWin(false);
    clearInterval(intervalId);
  }

  function handleRestart() {
    initGame();
    setPlaying(false);
    setTimer(0);
    setMoves(0);
    setWin(false);
    clearInterval(intervalId);
  }

  function handleClick(id: number) {

    // If the user clicks a card, after wins the game, then return
    if (win) return;

    // Get the card that the user clicks
    const currentCard = cards.find(card => card.id === id)!;

    // If the card that the user clicks is already flipped or is
    // already matched with another card, then return.
    if (currentCard.flipped || currentCard.matched) {
      return;
    }

    // Set the card as flipped
    currentCard.flipped = true;

    setCards([...cards]);

    // If this is the first card that the user flips, then set this card
    // as the previous card and return.
    if (!previousCard) {
      setPreviousCard(currentCard);
      return;
    }

    // If the value of the previous flipped card is the same that the value of
    // the current flipped card, then set both cards as matched and increment
    // the user's score by 100.
    if (previousCard.value === currentCard.value) {

      currentCard.matched = true;
      previousCard.matched = true;
      
      setScore(score => score + 100);
      
    } else {

      // if the values of both cards are differents, then flip back both cards.
      setTimeout(() => {
        currentCard.flipped = false;
        previousCard.flipped = false;
        setCards([...cards]);
      }, 500);
    }
    
    // Increment the user's moves by two and set the previous card to undefined
    setMoves(moves => moves + 2);
    setPreviousCard(undefined);

    // If all cards are matched, then the user win.
    if (cards.every(card => card.matched)) {

      // Calculate the final score base on the time. While smaller the time, higher the 
      // score.
      setScore(score => {
        if (timer < 60) return Math.round((score * 1.1) - timer);
        if (timer < 40) return Math.round((score * 1.2) - timer);
        if (timer < 30) return Math.round((score * 1.3) - timer);
        if (timer < 10) return Math.round((score * 1.4) - timer);
        return Math.round((score * 1.05) - timer);
      });

      setTimeout(() => {
        setWin(true);
        setSave(true);
        setPlaying(false);
      }, 500);
    }
  }

  function handleOptionClick(mode: string) {

    setMode(mode);
    setOpenMenu(false);

    if (mode === 'Easy') {
      setGridSize(16);
      setCellSize(100);
    }
    
    if (mode === 'Normal') {
      setGridSize(36);
      setCellSize(60);
    }

    if (mode === 'Hard') {
      setGridSize(64);
      setCellSize(55);
    }
  }

  function saveHistory() {

    const history = {
      date: new Date,
      score,
      time: timer,
      moves,
      mode
    };

    setHistory(state => [history, ...state]);

    // Save the history to localStorage
    const historyList = localStorage.getItem('history') || '[]';
    const newHistory = [history, ...JSON.parse(historyList)];
    localStorage.setItem('history', JSON.stringify(newHistory));
  }

  return (
    <div className={style.container}>
      <button 
        className={style.history}
        onClick={() => setOpenHistory(true)}>
        <img src='/trophy.png'/>
      </button>
      <History 
        open={openHistory}
        history={history}
        onClose={() => setOpenHistory(false)}/>
      <div>
        <div className={style.header}>
          <button
            className={style.button} 
            onClick={playing ? handleRestart : handleStart}>
            {playing ? 'Restart' : 'Start'}
          </button>
          <div className={style.details}>
            <div>Time: {formatTime(timer)}</div>
            <div>Moves: {moves}</div>
          </div>
          <div className={style.mode}>
            <span>Mode:</span>
            <button 
              className={style.button}
              onClick={() => setOpenMenu(open => !open)}>
              {mode}
            </button>
            {openMenu &&
              <menu className={style.menu}>
                <li onClick={() => handleOptionClick('Easy')}>Easy</li>
                <li onClick={() => handleOptionClick('Normal')}>Normal</li>
                <li onClick={() => handleOptionClick('Hard')}>Hard</li>
              </menu>
            }
          </div>
        </div>
        <div className={style.dashboardContainer}>
          <div 
            className={style.dashboard}
            style={{
              gridTemplateRows: `repeat(${Math.sqrt(gridSize)}, ${cellSize}px)`,
              gridTemplateColumns: `repeat(${Math.sqrt(gridSize)}, ${cellSize}px)`
            }}>
            {cards.map(card =>
              <Card 
                key={card.id} 
                card={card}
                disabled={!playing}
                onClick={handleClick}/>
            )}
          </div>
          {win &&
            <Win
              time={timer}
              score={score}
              moves={moves}
              onClick={handleRestart}/>
          }
        </div>
      </div>
    </div>
  );
}
