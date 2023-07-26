"use client";

import useTabs from "@/hooks/useTabs";
import { motion, AnimatePresence } from "framer-motion";
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
      <ul className="border-t border-gray-300  flex gap-2">
        {contents.map(({ tab }, idx) => {
          return (
            <motion.li onClick={() => changeItem(idx)} className="p-4">
              {tab}
              {currentItem.tab === tab ? (
                <motion.div
                  layoutId="abc"
                  className="h-2 w-full bg-black"
                  // className=" h-1 bg-black -bottom-1 rounded inset-x-0"
                ></motion.div>
              ) : null}
            </motion.li>
          );
          // return (
          //   <motion.li
          //     layoutId="why"
          //     onClick={() => changeItem(idx)}
          //     className={`p-[8px] ${clsx({
          //       "border-t-2 border-gray-900 pt-[6px]": currentItem.tab === tab,
          //     })}`}
          //   >
          //     <span>{tab}</span>
          //   </motion.li>
          // );
        })}
      </ul>
      <div>{currentItem.content}</div>
    </div>
  );
};

export default Tap;
