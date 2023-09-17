import { forwardRef } from "react";
import { useController } from "react-hook-form";
import { useEffect, useState } from "react";
import { log } from "console";

// eslint-disable-next-line react/display-name
const HookFormCheckBox = forwardRef(
  ({ control, name, items, rules, errors }: any, ref) => {
    const { field } = useController({ control, name, rules });
    const [arrValue, setArrValue] = useState(field.value || []);

    const errorMessages = errors[name] ? errors[name].message : "";
    const hasError = !!(errors && errorMessages);

    //undefined에러 처리를위해 기본값넣어주기
    useEffect(() => {
      const z: any = [];
      items?.forEach(({ label }: any) => {
        const xx: any = {};
        xx[`${label}`] = "";
        z.push(xx);
      });
      setArrValue(z);
    }, []);

    return (
      <div className="flex gap-2">
        {items?.map(({ label, value }: any, idx: any) => (
          <>
            <input
              id={value}
              key={`${value}_${idx}`}
              type="checkbox"
              name={name}
              onChange={(e) => {
                const valueCopy = [...arrValue];
                valueCopy[idx] = e.target.checked
                  ? { [`${label}`]: value }
                  : { [`${label}`]: "" };
                field.onChange(valueCopy);
                setArrValue(valueCopy);
              }}
              checked={arrValue?.some(
                (item: any) => item[`${label}`] && item[`${label}`] === value
              )}
              value={label}
              className="hidden [&:checked+label]:bg-slate-500 [&:checked+label:after]:content-['✔']"
            />
            <label
              htmlFor={value}
              className="w-7 h-7 flex items-center justify-center rounded-full border-2 border-green-300 bg-white text-white hover:border-slate-500"
            />
            <label htmlFor={value}>{label}</label>
          </>
        ))}
        {hasError && (
          <span className="text-rose-400 font-bold">{errorMessages}</span>
        )}
      </div>
    );
  }
);

export default HookFormCheckBox;
