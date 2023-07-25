"use client";

import { AnimatePresence, Variants, motion } from "framer-motion";
import { useState } from "react";

const defaltStyle =
  "w-[200px] h-[150px] bg-white rounded-xl shadow-lg place-self-center ";

const popupVars: Variants = {
  inital: (back: boolean) => ({ x: back ? -500 : 500, opacity: 0, scale: 0 }),
  visible: { x: 0, scale: 1, opacity: 1, transition: { duration: 1 } },
  leaving: (back: boolean) => ({
    x: back ? 500 : -500,
    opacity: 0,
    scale: 0,
    transition: { duration: 1 },
  }),
};

const Framer4 = () => {
  const [visible, setVisible] = useState<number>(1);
  const [isBack, setIsBack] = useState<boolean>(false);

  const setNext = () => {
    setIsBack(false);
    setVisible((prev) => (prev === 4 ? 1 : prev + 1));
  };
  const setPrev = () => {
    setIsBack(true);
    setVisible((prev) => (prev === 1 ? 4 : prev - 1));
  };

  return (
    <article className="h-[80vh] flex justify-center ">
      <div className="w-[600px] h-[400px] bg-lime-200 flex-col flex justify-center items-center">
        <div className="flex justify-center">
          <AnimatePresence mode="wait" custom={isBack}>
            <motion.div
              key={visible}
              custom={isBack}
              variants={popupVars}
              initial="inital"
              animate="visible"
              exit="leaving"
              className={`${defaltStyle} absolute`}
            >
              {visible}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="pt-[100px]">
          <button onClick={setNext}>다음</button>
          <button onClick={setPrev}>이전</button>
        </div>
      </div>
    </article>
  );
};

export default Framer4;
