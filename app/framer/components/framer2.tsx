"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";

const defaltStyle = "w-20 h-20 bg-white rounded-xl shadow-lg";

const Framer2 = () => {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-400, 400], [-360, 360]);
  const bg = useTransform(
    x,
    [-400, 0, 400],
    [
      "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
      "linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))",
      "linear-gradient(135deg, rgb(155, 155, 155), rgb(238, 178, 0))",
    ]
  );

  useMotionValueEvent(rotateZ, "change", (i) => {
    console.log(i);
  });
  useMotionValueEvent(x, "change", (i) => {
    console.log(i);
  });

  return (
    <article className="h-[80vh] flex justify-center ">
      <motion.div
        style={{ background: bg }}
        className="w-[600px] h-[400px]  flex justify-center items-center"
      >
        <motion.div
          drag="x"
          dragSnapToOrigin
          className={defaltStyle}
          style={{ x, rotateZ }}
        ></motion.div>
      </motion.div>
    </article>
  );
};

export default Framer2;
