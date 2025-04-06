interface ButtonProps {
  children: any;
  onClick: () => void;
  isLoading?: boolean;
}

const Button = ({ onClick, children }: ButtonProps) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
