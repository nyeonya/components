"use client";

import clsx from "clsx";
import { Variants, motion } from "framer-motion";
import { useState } from "react";

const Framer5 = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const toggleClicked = () => {
    setClicked((prev) => !prev);
  };
  return (
    <article onClick={toggleClicked} className="h-[80vh] flex justify-center ">
      <motion.div
        className={clsx(
          // { "justify-center items-center": clicked },
          "w-[600px] h-[600px] bg-lime-200  flex justify-center items-center"
        )}
      >
        {clicked ? (
          <motion.div
            layoutId="cercle"
            layout
            className="bg-purple-300 w-[100px] h-[100px] rounded-full shadow-lg"
          ></motion.div>
        ) : null}
      </motion.div>
      <motion.div
        className={clsx(
          // { "justify-center items-center": clicked },
          "w-[600px] h-[600px] bg-lime-200  flex justify-center items-center"
        )}
      >
        {clicked ? null : (
          <motion.div
            layoutId="cercle"
            layout
            className="bg-purple-300 w-[100px] h-[100px] rounded-full shadow-lg"
          ></motion.div>
        )}
      </motion.div>
    </article>
  );
};

export default Framer5;
