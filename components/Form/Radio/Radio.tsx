"use client";

import { useController, useFormContext } from "react-hook-form";
import Box from "../../Layout/Box/box";

export interface IFormRadio {
  /**useForm 필드값 관리용 이름 & request요청 시 필드 이름 */
  name: string;
  /**화면에 보여줄 아이템 리스트 {label:"",value:""}[] */
  items: { label: string; value: any }[];
  /**현재 값을 받아 validation 체크를 해줌 */
  rules?: any;
  theme?: "default" | "chip";
}

const FormRadio = ({ name, items, rules, theme = "default" }: IFormRadio) => {
  /**useFormContext함수를 이용해서 props drilling 없이 useForm의 반환값들을  바로 받아올수있다.
   * !!부모컴포넌트를 FormProvider로 감싸줘야 가능.
   */
  const {
    getValues,
    control,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({ control, name, rules });

  const radioValue = getValues(name);

  const errorMessages = errors[name] ? errors[name]?.message : "";
  const hasError = !!(errors && errorMessages);

  return (
    <>
      <Box gap={10}>
        {items?.map(({ label, value }: any) => (
          <Box key={value} gap={10}>
            <input
              id={label}
              name={name}
              type="radio"
              value={value}
              checked={radioValue === value}
              onChange={field.onChange}
              className={radioTheme[theme].input}
            />
            {theme === "default" && (
              <>
                <label htmlFor={label} className={radioTheme[theme].label} />
                <label htmlFor={label}>{label}</label>
              </>
            )}
            {theme === "chip" && (
              <label htmlFor={label} className={radioTheme[theme].label}>
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

export default FormRadio;

const radioTheme = {
  default: {
    input: "hidden [&:checked+label]:bg-radio-focus",
    label:
      "w-[16px] h-[16px] cursor-pointer bg-radio-defalt hover:bg-radio-hover",
  },
  chip: {
    input:
      "absolute w-1 h-1 overflow-hidden text-clip border-0 whitespace-nowrap [clip:rect(0,0,0,0);] [&:checked+label]:bg-gray-500 [&:checked+label]:text-white",
    label:
      "py-2 px-3 bg-slate-300 rounded-3xl hover:bg-slate-400 cursor-pointer",
  },
};
