interface Props {
  label: string;
  color?: string;
  size?: string | number;
  onClick?: () => void;
}

const Button = ({ label, color, size, onClick, ...props }: Props) => {
  return (
    <button
      className="bg-green-200 py-2 px-4 rounded-md hover:bg-green-300"
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
