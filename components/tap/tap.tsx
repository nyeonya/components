"use client";

import useTabs from "@/hooks/useTabs";
import clsx from "clsx";

interface Contents {
  tab: string;
  content: any;
}

interface Props {
  contents: Contents[];
}
const Tap = ({ contents }: Props) => {
  const { currentItem, changeItem } = useTabs(0, contents) as any;

  return (
    <div>
      <ul className="border-t border-gray-300  flex">
        {contents.map(({ tab }, idx) => (
          <div
            onClick={() => changeItem(idx)}
            className={`p-[8px] ${clsx({
              "border-t-2 border-gray-900 pt-[6px]": currentItem.tab === tab,
            })}`}
          >
            <span>{tab}</span>
          </div>
        ))}
      </ul>
      <div>{currentItem.content}</div>
    </div>
  );
};

export default Tap;
