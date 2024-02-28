import { ChangeEvent, KeyboardEvent } from 'react';
import style from './input.module.css';
import clsx from 'clsx';

interface Props {
  className?: string;
  value?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
}

export function Input(props: Props) {

  const {
    className,
    value,
    placeholder,
    onChange,
    onEnter
  } = props;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      onEnter?.();
    }
  }

  return (
    <input 
      className={clsx(style.input, className)}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      onKeyDown={handleKeyDown}/>
  );
}
