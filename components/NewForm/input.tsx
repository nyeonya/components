"use client";

import { useFormContext, useWatch } from "react-hook-form";
import clsx from "clsx";

export interface IFormInput {
  /**useForm 필드값 관리용 이름 & request요청 시 필드 이름 */
  name: string;
  /**input type */
  type?: "text" | "number" | "password";
  /**인풋창 왼쪽에 들어가는 타이틀 */
  label?: string;
  /**placeholder */
  placeholder?: string;
  /**현재 값을 받아 validation 체크를 해줌*/
  rules?: any;
  /**disabled */
  disabled?: boolean;
}

const FormInput = (
  {
    name,
    rules,
    label,
    type = "text",
    placeholder,
    disabled = false,
  }: IFormInput,
  ref: any
) => {
  /**useFormContext함수를 이용해서 props drilling 없이 useForm의 반환값들을  바로 받아올수있다.
   * !!부모컴포넌트를 FormProvider로 감싸줘야 가능.
   */
  const {
    register,
    resetField,
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessages = errors[name] ? errors[name]?.message : "";
  const hasError = !!(errors && errorMessages);

  const checkValue = useWatch({ control, name });

  const isLength = checkValue?.length > 0;

  const clearValue = () => {
    resetField(name, { keepError: true });
  };

  return (
    <div className="flex gap-2 max-w-sm whitespace-nowrap">
      {label && (
        <div>
          <span>{label}</span>
        </div>
      )}
      <div className="flex flex-col relative">
        <input
          disabled={disabled}
          aria-label={label}
          type={type}
          placeholder={placeholder}
          className={clsx(
            "h-[38px] px-[10px]  relative border-gray50 border rounded-md placeholder:text-gray-400",
            hasError && "border-rose-400",
            disabled && "bg-slate-400"
          )}
          {...(register && register(name, rules))}
        ></input>
        {!hasError && isLength && (
          <span
            className="absolute top-[9px] right-[10px]"
            onClick={() => clearValue()}
          >
            X
          </span>
        )}
        {hasError && (
          <span className="absolute top-[9px] right-[10px]">!!</span>
        )}
        {hasError && (
          <span className="text-rose-300">- {errorMessages as string}</span>
        )}
      </div>
    </div>
  );
};

export default FormInput;
