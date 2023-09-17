import clsx from "clsx";
import { ReactNode } from "react";

const Box = ({
  children,
  gap,
  isColumn = false,
}: {
  children: ReactNode;
  gap: number;
  isColumn?: boolean;
}) => {
  const g = `gap-[${gap}px]`;
  return (
    <div className={clsx(`flex items-center ${g}`, isColumn && "flex-col")}>
      {children}
    </div>
  );
};

export default Box;
