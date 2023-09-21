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

const MotionTap = ({ contents }: Props) => {
  const { currentItem, changeItem } = useTabs(0, contents) as any;

  return (
    <div>
      <ul className="border-t border-gray-300  flex gap-2">
        {contents.map(({ tab }, idx) => {
          return (
            <motion.li
              onClick={() => changeItem(idx)}
              className="p-4"
              key={`tap_${idx}`}
            >
              {tab}
              {currentItem.tab === tab ? (
                <motion.div
                  layoutId="abc"
                  className="h-2 w-full bg-black"
                ></motion.div>
              ) : null}
            </motion.li>
          );
        })}
      </ul>
      <div>{currentItem.content}</div>
    </div>
  );
};

export default MotionTap;
