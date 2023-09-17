"use client";

import FormCheckboxes from "@/components/Form/Checkbox/Checkbox";
import FormUpload from "@/components/Form/FileUpload/FileUpload";
import FormInput from "@/components/Form/Input/Input";
import FormRadio from "@/components/Form/Radio/Radio";
import FormSelect from "@/components/Form/Select/Select";
import { FormProvider, useForm } from "react-hook-form";

const Yoon = ({ data = "" }) => {
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      input1: "",
      input2: "",
      radio: "1",
      checkbox: ["d", "cc"],
      upload: [],
      select: "하나",
    },
    //서버 컴포넌트에서 받아온 데이터를 defaultValues안에 넣어줌
    // defaultValues: data,
  });

  const onValid = (data: any) => {
    console.log("패스");
    console.log(data);
  };

  const onInvalid = (error: any) => {
    console.log("에러입니다");
    console.log(error);
  };

  console.log("wwwwwwwwwww", methods.watch());

  return (
    <div>
      {/* <DevTool control={methods.control} /> */}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onValid, onInvalid)}
          className="flex flex-col items-center gap-5"
        >
          <FormSelect
            name="select"
            items={[
              { label: "선택해주세욤", value: "" },
              { label: "select11", value: "하나" },
              { label: "select22", value: "두울" },
            ]}
            rules={{
              required: "셀렉트박스는 필수 선택입니다.",
            }}
          />
          <FormUpload
            name="upload"
            rules={{
              validate: {
                minOne: (value: any) =>
                  value?.length === 0 ? "최소 한개는 선택해주세요" : true,
              },
            }}
          />
          <FormInput
            name="input1"
            placeholder="이름을 입력해주세요."
            rules={{
              required: "이름은 필수 입력입니다..",
              onChange: (e: any) => {
                methods.setValue("input1", e.target.value.replace(" ", ""));
              },
              validate: {
                noHi: (value: any) =>
                  value.includes("hi") ? "이름에 hi를 뺴주세요" : true,
              },
            }}
          />
          <FormInput
            name="input2"
            placeholder="이메일을 입력해주세요."
            rules={{
              required: "이메일은 필수 입력입니다",
              pattern: emailPattern,
              minLength: {
                message: "5글자 이상 입력하세요",
                value: 5,
              },
            }}
          />

          <FormRadio
            name="radio"
            rules={{ required: "라디오박스 필수 선택입니다." }}
            items={[
              { label: "ddddd", value: "1" },
              { label: "aaa", value: "2" },
            ]}
          />
          <FormCheckboxes
            name="checkbox"
            items={[
              { label: "라디오버튼1", value: "d" },
              { label: "라디오버튼2", value: "cc" },
            ]}
            rules={{
              required: "체크박스는 필수 선택입니다.",
              validate: {
                minOne: (value: any) =>
                  value?.every((i: any) => !i) || value?.length === 0
                    ? "최소 한개는 선택해주세요"
                    : true,
              },
            }}
          />
          <button
            type="submit"
            className="p-5 bg-rose-300 rounded-md text-white font-bold"
          >
            CLICK
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Yoon;

const emailPattern = {
  value: new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$", "ig"),
  message: "이메일 형식이 아닙니다.",
};
