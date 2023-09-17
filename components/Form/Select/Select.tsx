"use client";

import clsx from "clsx";

import React, { useEffect, useRef, useState } from "react";
import { useController, useFormContext } from "react-hook-form";

interface ISelect {
  name: string;
  /**화면에 보여줄 아이템 리스트 {label:"",value:""}[] */
  items: { label: string; value: string }[];
  /**현재 값을 받아 validation 체크를 해줌 */
  rules?: any;
  /**disabled 유무 */
  disabled?: boolean;
}

const FormSelect = ({ name, items, rules, disabled = false }: ISelect) => {
  const selectDiv = useRef<any>(null);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  /**useFormContext함수를 이용해서 props drilling 없이 useForm의 반환값들을  바로 받아올수있다.
   * !!부모컴포넌트를 FormProvider로 감싸줘야 가능.
   */
  const {
    getValues,
    control,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({ control, name, rules });

  const selectValue = getValues(name);

  const errorMessages = errors[name] ? errors[name]?.message : "";
  const hasError = !!(errors && errorMessages);

  useEffect(() => {
    //select창 바깥쪽 클릭시 창닫게
    // 다른방법있나 (??) 잠시보류중
    const clickOutside = (evt: MouseEvent) => {
      if (selectDiv.current && !selectDiv.current.contains(evt.target as Node))
        setShowOptions(false);
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [selectDiv]);

  return (
    <div className="flex flex-col w-32" ref={selectDiv}>
      <button
        type="button"
        disabled={disabled}
        className={clsx(
          "w-[136px] p-[10px] rounded-[2px] border  text-gray-400 hover:border-black",
          showOptions ? " border-black" : "border-gray-400",
          selectValue ? "bg-yellow-100" : "bg-slate-50"
        )}
        onClick={() => {
          if (!showOptions && !disabled && items.length > 0) {
            setShowOptions(true);
          } else if (showOptions) setShowOptions(false);
        }}
      >
        <div className="flex justify-between items-center">
          <div>{items?.find((i) => i.value === selectValue)?.label}</div>
          <div
            className={clsx(
              showOptions
                ? "bg-[url('/icons/down-array.svg')] w-[14px] h-[14px]"
                : "bg-[url('/icons/select.svg')] w-[11px] h-[7px]"
            )}
          ></div>
        </div>
      </button>
      {showOptions && (
        <ul
          className={clsx(
            "absolute w-[136px] border-e  border-s border-b border-gray-400 mt-[38px] z-20 [&>*:last-child]:rounded-b-[2px] rounded-b-[2px]",
            showOptions && "border-t-white"
          )}
        >
          {items?.map(({ label, value }, idx) => {
            return (
              <li
                key={`select-${idx}`}
                onClick={() => {
                  field.onChange(value);
                  setShowOptions(false);
                }}
                className={clsx(
                  "p-[10px]",
                  selectValue === value
                    ? "bg-gray-100"
                    : "bg-slate-50 hover:bg-gray-400"
                )}
              >
                {label}
              </li>
            );
          })}
        </ul>
      )}
      {hasError && (
        <span className="text-warning1">- {errorMessages as string}</span>
      )}
    </div>
  );
};

export default FormSelect;
