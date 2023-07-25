"use client";

import { AnimatePresence, Variants, motion } from "framer-motion";
import { useState } from "react";

const defaltStyle = "w-20 h-20 bg-white rounded-xl shadow-lg";

const popupVars: Variants = {
  inital: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, rotateZ: 360 },
  leaving: { opacity: 0, y: 30 },
};

const Framer3 = () => {
  const [popup, setPopup] = useState(false);
  return (
    <article className="h-[80vh] flex justify-center ">
      <div className="w-[600px] h-[400px] bg-lime-200  flex justify-center items-center">
        <button onClick={() => setPopup((prev) => !prev)}>popup open</button>
        <AnimatePresence>
          {popup ? (
            <motion.div
              variants={popupVars}
              initial="inital"
              animate="visible"
              exit="leaving"
              className={defaltStyle}
            ></motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </article>
  );
};

export default Framer3;
