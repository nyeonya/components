"use client";

import {
  Variants,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const innercercle = "w-8 h-8 bg-white shadow-xl rounded-full place-self-center";

const defaltStyle = "w-20 h-20 bg-white rounded-xl shadow-lg";
const defaltStyle2 =
  "w-20 h-20 bg-[rgba(255,255,255,0.2)] rounded-xl grid grid-cols-2 ";

const vars: Variants = {
  start: { scale: 0 },
  end: { scale: 1, rotate: 180, transition: { type: "spring", delay: 0.5 } },
};
const boxVars: Variants = {
  start: { scale: 0, opacity: 0 },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const box3: Variants = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { scale: 0.7, rotateY: 30, transition: { damping: 0 } },
};

const circleVars: Variants = {
  start: { opacity: 0, y: -10 },
  end: { opacity: 1, y: 0 },
};

//place-self란 속성? 처음본다
//grid나 flex 상태일떄 자식들이 중앙으로 가도록하는 ? 그런 속성
const Framer = () => {
  const containerBox = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 20]);

  useMotionValueEvent(scrollYProgress, "change", (i) => {
    console.log(i);
  });

  return (
    <article className="h-[120vh] flex justify-center ">
      <div className="w-[600px] h-[400px] bg-gradient-to-br from-blue-700 to-blue-950 flex justify-center items-center">
        <div className=" grid grid-cols-3 gap-10">
          {/* 1 */}
          <motion.div
            variants={vars}
            initial="start"
            animate="end"
            className={defaltStyle}
          ></motion.div>
          {/* 2 */}
          <motion.div
            variants={boxVars}
            initial="start"
            animate="end"
            className={defaltStyle2}
          >
            <motion.div
              variants={circleVars}
              className={innercercle}
            ></motion.div>
            <motion.div
              variants={circleVars}
              className={innercercle}
            ></motion.div>
            <motion.div
              variants={circleVars}
              className={innercercle}
            ></motion.div>
            <motion.div
              variants={circleVars}
              className={innercercle}
            ></motion.div>
          </motion.div>
          {/* 3 */}
          <motion.div
            variants={box3}
            whileHover="hover"
            whileTap="click"
            className={defaltStyle}
          ></motion.div>
          {/* 4 */}
          {/* 색상변경에 애니메이션을 주고싶으면 rgb ,rgba값을써야함 */}
          <div
            ref={containerBox}
            className="overflow-hidden rounded-xl w-20 h-20 bg-slate-300"
          >
            <motion.div
              drag
              dragSnapToOrigin
              dragConstraints={containerBox}
              variants={box3}
              whileHover="hover"
              whileTap="click"
              className={`${innercercle} `}
            ></motion.div>
          </div>
          <motion.div
            style={{ scale }}
            className={`${innercercle} `}
          ></motion.div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 576 512"
            className="w-20 h-20 "
          >
            <motion.path
              initial={{ pathLength: 0, fill: "rgba(255,255,255,0)" }}
              animate={{ pathLength: 1, fill: "rgba(255,255,255,1)" }}
              transition={{
                duration: 5,
                fill: { duration: 2, delay: 2 },
              }}
              stroke="white"
              strokeWidth={3}
              d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H96V32H64zm64 0V480H448V32H128zM512 480c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H480V480h32zM256 176c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v48h48c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H320v48c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V288H208c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16h48V176z"
            />
          </svg>
        </div>
      </div>
    </article>
  );
};

export default Framer;
