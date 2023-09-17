"use client";

import { useController, useFormContext } from "react-hook-form";

export interface IFormRadio {
  /**useForm 필드값 관리용 이름 & request요청 시 필드 이름 */
  name: string;
  /**화면에 보여줄 아이템 리스트 {label:"",value:""}[] */
  items: { label: string; value: any }[];
  /**현재 값을 받아 validation 체크를 해줌 */
  rules?: any;
}

const FormRadio = ({ name, rules, items }: IFormRadio) => {
  /**useFormContext함수를 이용해서 props drilling 없이 useForm의 반환값들을  바로 받아올수있다.
   * !!부모컴포넌트를 FormProvider로 감싸줘야 가능.
   */
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({ control, name, rules });

  const errorMessages = errors[name] ? errors[name]?.message : "";
  const hasError = !!(errors && errorMessages);

  return (
    <>
      <div className="flex gap-[10px]">
        {items?.map(({ label, value }: any) => (
          <div key={value} className="flex items-center gap-2 cursor-pointer">
            <input
              id={label}
              name={name}
              type="radio"
              value={value}
              onChange={field.onChange}
              className="hidden [&:checked+label]:bg-radio-focus"
            />
            <label
              htmlFor={label}
              className="w-[16px] h-[16px] cursor-pointer bg-radio-defalt hover:bg-radio-hover"
            ></label>
            <label htmlFor={label}>{label}</label>
          </div>
        ))}
      </div>
      {hasError && (
        <span className="text-warning1">- {errorMessages as string}</span>
      )}
    </>
  );
};

export default FormRadio;
