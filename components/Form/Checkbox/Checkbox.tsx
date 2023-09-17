import React, { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import Box from "../../Layout/Box/box";
import clsx from "clsx";

export interface IFormCheckbox {
  /**useForm 필드값 관리용 이름 & request요청 시 필드 이름 */
  name: string;
  /**화면에 보여줄 아이템 리스트 {label:"",value:""}[] */
  items: { label: string; value: string }[];
  /**현재 값을 받아 validation 체크를 해줌 */
  rules?: any;
  theme?: "default" | "chip";
}

const FormCheckboxes = ({
  items,
  name,
  rules,
  theme = "default",
}: IFormCheckbox) => {
  /**useFormContext함수를 이용해서 props drilling 없이 useForm의 반환값들을  바로 받아올수있다.
   * !!부모컴포넌트를 FormProvider로 감싸줘야 가능.
   */
  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({
    control,
    name,
    rules,
  });

  const [valueArr, setValueArr] = useState(field.value || []);

  const fileArray = getValues(name);

  const errorMessages = errors[name] ? errors[name]?.message : "";
  const hasError = !!(errors && errorMessages);

  return (
    <>
      <Box gap={5}>
        {items?.map(({ label, value }: any, index: number) => (
          <Box key={value} gap={5}>
            <input
              onChange={(e) => {
                const valueCopy = [...valueArr];
                valueCopy[index] = e.target.checked ? e.target.value : null;
                field.onChange(valueCopy);
                setValueArr(valueCopy);
              }}
              id={value}
              key={value}
              checked={fileArray?.includes(value)}
              type="checkbox"
              value={value}
              className={checkboxTheme[theme].input}
            />
            {theme === "default" && (
              <>
                <label className={checkboxTheme[theme].label} htmlFor={value} />
                <label htmlFor={value} ref={field.ref}>
                  {label}
                </label>
              </>
            )}
            {theme === "chip" && (
              <label
                htmlFor={label}
                className={clsx(
                  checkboxTheme[theme].label,
                  fileArray?.includes(value) && "bg-rose-200"
                )}
              >
                {label}
              </label>
            )}
          </Box>
        ))}
      </Box>
      {hasError && (
        <span className="text-rose-300">- {errorMessages as string}</span>
      )}
    </>
  );
};

export default FormCheckboxes;

const checkboxTheme = {
  default: {
    input: "hidden [&:checked+label]:bg-checkbox-focus",
    label: "h-[16px] w-[16px] bg-checkbox-defalt block hover:bg-checkbox-hover",
  },
  chip: {
    input:
      "absolute w-1 h-1 overflow-hidden text-clip border-0 whitespace-nowrap [clip:rect(0,0,0,0);] [&:checked+label]:bg-gray-500 [&:checked+label]:text-white",
    label:
      "py-2 px-3 bg-slate-300 rounded-3xl hover:bg-slate-400 cursor-pointer",
  },
};
