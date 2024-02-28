import clsx from 'clsx';
import { ICard } from '../../interfaces/card';
import style from './card.module.css';

interface Props {
  card: ICard;
  disabled: boolean;
  onClick: (id: number) => void;
}

export function Card(props: Props) {

  const {
    card,
    disabled,
    onClick
  } = props;

  function handleClick() {
    if (!disabled) {
      onClick(card.id);
    }
  }

  return (
    <div 
      className={clsx(
        style.card, 
        card.flipped && style.flipped,
        disabled && style.disabled
      )}
      onClick={handleClick}>
      <div className={style.front}/>
      <div 
        key={card.id}
        className={style.back}>
        <span>{card.value}</span>
      </div> 
    </div>
  );
}
