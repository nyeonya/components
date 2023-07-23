"use client";

import { useState } from "react";

const useTabs = (inital: any, allTaps: any) => {
  if (!allTaps || !Array.isArray(allTaps)) {
    return;
  }

  const [currentIndex, setCurrentIndex] = useState(inital);

  return {
    currentItem: allTaps[currentIndex],
    changeItem: setCurrentIndex,
  };
};

export default useTabs;
