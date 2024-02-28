interface Props {
  className?: string;
  onClick?: () => void;
}

export function Close({ className, onClick }: Props) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      width="22"
      height="22" 
      viewBox="0 -960 960 960"
      onClick={onClick}>
      <path 
        d="M256-213.847 213.847-256l224-224-224-224L256-746.153l224 224 224-224L746.153-704l-224 224 224 224L704-213.847l-224-224-224 224Z"/>
    </svg>
  );
}
