import Button from "./DefaltButton";

interface Props {
  label: string;
  size?: string | number;
  onClick?: () => void;
}

const PrimaryButton = ({
  label,
  onClick = () => console.log("현재개발중"),
  ...props
}: Props) => {
  return <Button label={label} onClick={onClick} {...props} />;
};

export default PrimaryButton;
