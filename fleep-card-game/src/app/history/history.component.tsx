import clsx from 'clsx';
import { IHistory } from '../../interfaces/history';
import { formatTime } from '../../utils/formatTime';
import style from './history.module.css';
import { useMemo } from 'react';
import { CloseIcon } from '../close-icon/close-icon';

interface Props {
  open: boolean;
  history: IHistory[];
  onClose: () => void;
}

export function History(props: Props) {

  const {
    open,
    history,
    onClose
  } = props;

  const bestScore = useMemo(() => {
    const sorted = history.toSorted((h1, h2) => h2.score - h1.score);
    return sorted[0];
  }, [history]);

  return (
    <div className={clsx(style.container, !open && style.close)}>
      <div className={style.header}>
        <h2 className={style.title}>History</h2>
        <CloseIcon
          className={style.closeIcon} 
          onClick={onClose}/>
      </div>
      <div className={style.content}>
        {bestScore &&
          <div className={style.bestScore}>
            <h3 className={style.bestScoreTitle}>¡Best Score!</h3>
            <img
              className={style.image}
              src='/trophy.png'/>
            <div className={style.items}>
              <div className={style.item}>
                <span className={style.itemValue}>{formatTime(bestScore.time)}</span>
                <span className={style.itemTitle}>Time</span>
              </div>
              <div className={style.item}>
                <span className={style.itemValue}>{bestScore.score}</span>
                <span className={style.itemTitle}>Score</span>
              </div>
              <div className={style.item}>
                <span className={style.itemValue}>{bestScore.moves}</span>
                <span className={style.itemTitle}>Moves</span>
              </div>
            </div>
          </div>
        }
        <div className={style.historyList}>
          {history.map(history => 
            <div
              className={style.historyItem} 
              key={new Date(history.date).toString()}>
              <img
                className={style.historyItemImage} 
                src='/trophy.png'/>
              <div className={style.historyItemDetails} >
                <div className={style.historyItemTop}>
                  <span>{new Date(history.date).toLocaleString()}</span>
                  <span>{history.mode}</span>
                </div>
                <div className={style.historyItemBottom}>
                  <span>time: {formatTime(history.time)}</span>
                  <span>score: {history.score}</span>
                  <span>moves: {history.moves}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
