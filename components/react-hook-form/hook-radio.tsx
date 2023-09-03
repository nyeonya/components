import clsx from "clsx";
import { log } from "console";
import { forwardRef } from "react";
import { Controller } from "react-hook-form";

const HookFormRadio = ({
  //APi요청시 request 보내는 필드명값
  paramsName,
  name,
  control,
  errors,
  rules,
  label,
  disabled = false,
  value,
  items,
  ...props
}: any) => {
  const errorMessages = errors[paramsName] ? errors[paramsName].message : "";
  const hasError = !!(errors && errorMessages);

  return (
    <Controller
      control={control}
      name={paramsName}
      rules={rules}
      render={({ field: { onChange, value: _value } }) => {
        return (
          <>
            <div className="flex gap-2">
              {items?.map(
                ({
                  label,
                  value,
                }: {
                  label: string;
                  value: string | number;
                }) => (
                  <div key={value}>
                    <input
                      id={label}
                      name={paramsName}
                      type="radio"
                      value={value}
                      onChange={onChange}
                      className="absolute w-1 h-1 overflow-hidden text-clip border-0 whitespace-nowrap [clip:rect(0,0,0,0);] [&:checked+label]:bg-gray-500 [&:checked+label]:text-white"
                    />
                    <label
                      htmlFor={label}
                      className="py-2 px-3 bg-slate-300 rounded-md hover:bg-slate-400 cursor-pointer"
                    >
                      {label}
                    </label>
                  </div>
                )
              )}
            </div>
            {hasError && (
              <span className="text-rose-400 font-bold">{errorMessages}</span>
            )}
          </>
        );
      }}
    ></Controller>
  );
};

export default HookFormRadio;

//cscc or styled-component 방식
// const Example = styled.input`
//   position: absolute;
//   width: 1px;
//   height: 1px;
//   padding: 0;
//   margin: -1;
//   clip: rect(0, 0, 0, 0);
//   white-space: nowrap;

//   //선택됐을때
//   &:checked + label {
//     background-color: cornsilk;
//   }
// `;
