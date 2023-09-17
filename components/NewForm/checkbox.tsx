import React, { useState } from "react";
import { useController, useFormContext } from "react-hook-form";

export interface IFormCheckbox {
  /**useForm 필드값 관리용 이름 & request요청 시 필드 이름 */
  name: string;
  /**화면에 보여줄 아이템 리스트 {label:"",value:""}[] */
  items: { label: string; value: string }[];
  /**현재 값을 받아 validation 체크를 해줌 */
  rules?: any;
}

const FormCheckboxes = ({ items, name, rules }: IFormCheckbox) => {
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
      <div className="flex gap-2">
        {items?.map(({ label, value }: any, index: number) => (
          <div key={value} className="flex items-center gap-2">
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
              className="hidden [&:checked+label]:bg-checkbox-focus"
            />
            <label
              className="h-[16px] w-[16px] bg-checkbox-defalt block hover:bg-checkbox-hover"
              htmlFor={value}
            ></label>
            <label htmlFor={value} ref={field.ref}>
              {label}
            </label>
          </div>
        ))}
      </div>
      {hasError && (
        <span className="text-warning1">- {errorMessages as string}</span>
      )}
    </>
  );
};

export default FormCheckboxes;
