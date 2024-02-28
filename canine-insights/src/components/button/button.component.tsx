import clsx from 'clsx';
import style from './button.module.css';

interface Props {
  title: string;
  className?: string;
  onClick?: () => void;
}

export function Button(props: Props) {

  const {
    title,
    className,
    onClick
  } = props;

  return (
    <button 
      className={clsx(style.button, className)}
      onClick={onClick}>
      {title}
    </button>
  );
}
