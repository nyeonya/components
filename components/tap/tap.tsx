import useTabs from "@/hooks/useTabs";
import { ReactNode } from "react";

export type ItabItems = {
  label: string;
  content: string | ReactNode;
};
export type ITabGroup = {
  tabItems: ItabItems[];
};

export const Tap = ({ tabItems }: any) => {
  const { currentActiveTab, changeActiveTab } = useTabs(0, tabItems) as any;

  return (
    <div className="flex first:border-l-[1px] border-grayDB">
      {tabItems?.map(({ label }: any, tabIndex: number) => {
        const isActive = currentActiveTab?.label === label;
        return (
          <div
            key={label}
            className={`border-t-[1px] border-r-[1px] border-grayDB  w-[10.375rem] h-[2.4375rem] text-base py-[0.4375rem] text-center font-bold ${
              isActive
                ? "text-black bg-white border-b-0 cursor-auto"
                : "text-gray-300 cursor-pointer"
            }`}
            onClick={() => {
              changeActiveTab(tabIndex);
            }}
          >
            <div>{label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Tap;
