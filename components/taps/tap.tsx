"use client";

import useTabs from "@/hooks/useTabs";
import clsx from "clsx";

const contents = [
  { tab: "tapContent1", content: "AAAAAAA" },
  { tab: "tapContent2", content: "BBBBBBB" },
];

const Tap = () => {
  const { currentItem, changeItem } = useTabs(0, contents) as any;

  return (
    <div>
      <ul className="border-t border-gray-300 mt-10 flex">
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
      {/* <div>{currentItem.content}</div> */}
    </div>
  );
};

export default Tap;
