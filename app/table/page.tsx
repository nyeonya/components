"use client";

import Table from "@/components/Table/table";
import { useEffect, useState } from "react";

const col = [
  { header: "첫번째", name: "x", width: 100 },
  { header: "두번째", name: "y", width: 200 },
  { header: "세번째", name: "z", width: 200 },
];

const items = [
  { x: "xx", y: "yy", z: "zz", id: "a" },
  { x: "xx", y: "yy", z: "zz", id: "b" },
  { x: "xx", y: "yy", z: "zz", id: "c" },
];

const Test = () => {
  const [is, setId] = useState<any>([]);
  return (
    <div className="w-1/2">
      <Table
        items={items}
        columns={col}
        minWidth={300}
        isCheckBox
        idList={is}
        setIdList={setId}
        tableKey={"ddd"}
        total={3}
      />
    </div>
  );
};

export default Test;
