import Button from "./DefaltButton";

interface Props {
  label: string;
  size?: string | number;
  onClick?: () => void;
}

const CancleButton = ({ label, onClick, ...props }: Props) => {
  return <Button label={label} onClick={onClick} {...props} />;
};

export default CancleButton;
