import clsx from "clsx";
import { forwardRef } from "react";

const y = "text-rose-400";
const HookFormInput = ({
  name,
  register,
  errors,
  rules,
  size,
  label,
  ...props
}: any) => {
  const errorMessages = errors[name] ? errors[name].message : "";
  const hasError = !!(errors && errorMessages);

  return (
    <>
      <div className="flex  items-center gap-2 max-w-sm whitespace-nowrap">
        <div>
          <span>{label}</span>
        </div>
        <Input
          name={name}
          errorstyle={hasError}
          {...props}
          {...(register && register(name, rules))}
        />
        {hasError && (
          //조건부 참고용
          // <span
          //   className={clsx(
          //     "font-bold",
          //     size === "s" ? "text-rose-400" : "text-rose-400",
          //     {
          //       "bg-slate-400 p-2 rounded-sm text-slate-50": size === "s",
          //     }
          //   )}
          // >
          <span className={y}>{errorMessages}</span>
        )}
      </div>
    </>
  );
};

// eslint-disable-next-line react/display-name
const Input = forwardRef(
  ({ id, name, label, type, placeholder, errorstyle, ...props }: any, ref) => {
    return (
      <input
        id={id}
        name={name}
        aria-label={label}
        type="text"
        placeholder={placeholder}
        ref={ref}
        {...props}
        className={clsx(
          `p-1 bg-inherit border-blue-950 border-b  placeholder:text-gray-400 placeholder:text-xs`,
          { "border-blue-950": errorstyle }
        )}
      />
    );
  }
);

export default HookFormInput;
