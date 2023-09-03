"use client";

import Select11 from "@/components/react-hook-form/test-select";
import { useState } from "react";
import { useForm } from "react-hook-form";

//name > 가리킬 Form의 필드명
/**control > useForm의 control
 * render > field에 의존하는 자식노드
 *
 */
const options = [
  { label: "1", value: "value1" },
  { label: "2", value: "value2" },
  { label: "3", value: "value3" },
];

const Test = () => {
  const [x, setX] = useState("value1");
  const [y, setY] = useState("");
  const { register, watch, control } = useForm();

  console.log("값확인", watch());

  const onclick = () => {
    setY("dddddd");
  };

  return (
    <>
      <Select11 control={control} options={options} />
      <div onClick={onclick}>크르르릭</div>
      <div>{y}</div>
    </>
  );
  //   const { control } = useForm();
  //   return (
  //     <>
  //       <Controller
  //         control={control}
  //         name="test"
  //         render={({ field }) => (
  //           <div>
  //             <input
  //               value={field.value}
  //               onChange={(e) => {
  //                 field.onChange(e.target.value);
  //                 console.log(field);
  //               }}
  //             />
  //           </div>
  //         )}
  //       />
  //     </>
  //   );
};

export default Test;
