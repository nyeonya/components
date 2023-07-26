"use client";

import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Framer6 = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const toggleClicked = () => {
    setClicked((prev) => !prev);
  };
  return (
    <article
      onClick={toggleClicked}
      className="h-[80vh] flex items-center justify-center  "
    >
      <div className="w-1/2 bg-lime-200 grid grid-cols-3 gap-4 p-20 ">
        <motion.div
          layoutId="hii"
          className="bg-purple-300  h-[80px]  shadow-lg col-span-2  "
        ></motion.div>
        <motion.div className="bg-purple-300  h-[80px]  shadow-lg"></motion.div>
        <motion.div className="bg-purple-300  h-[80px]  shadow-lg"></motion.div>
        <motion.div className="bg-purple-300  h-[80px]  shadow-lg col-span-2"></motion.div>
      </div>
      <AnimatePresence>
        {clicked ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full bg-[rgba(0,0,0,0.8)] top-0 absolute  flex items-center justify-center  "
          >
            <motion.div
              layoutId="hii"
              className="bg-purple-300 w-[200px] h-[100px]  shadow-lg"
            ></motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
};

export default Framer6;
