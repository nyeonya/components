import { IFormInput } from "./Input";

const base: IFormInput = {
  name: "formInput",
  type: "text",
  placeholder: "sizeFULL",
  rules: {
    required: "이름은 필수 입력입니다.",
    validate: {
      noHi: (value: string) =>
        value.includes("hi") ? "이름에 hi를 뺴주세요" : true,
    },
  },
};
export const mockProps = {
  base,
};
