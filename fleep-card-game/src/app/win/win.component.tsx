import { formatTime } from '../../utils/formatTime';
import style from './win.module.css';

interface Props {
  time: number;
  score: number;
  moves: number;
  onClick: () => void;
}

export function Win(props: Props) {

  const {
    time,
    score,
    moves,
    onClick
  } = props;

  return (
    <div className={style.container}>
      <h2 className={style.title}>¡YOU WIN!</h2>
      <img
        className={style.image}
        src='/trophy.png'/>
      <div className={style.items}>
        <div className={style.item}>
          <span className={style.itemValue}>{formatTime(time)}</span>
          <span className={style.itemTitle}>Time</span>
        </div>
        <div className={style.item}>
          <span className={style.itemValue}>{score}</span>
          <span className={style.itemTitle}>Score</span>
        </div>
        <div className={style.item}>
          <span className={style.itemValue}>{moves}</span>
          <span className={style.itemTitle}>Moves</span>
        </div>
      </div>
      <button
        className={style.button}
        onClick={onClick}>
        Play again
      </button>
    </div>
  );
}
