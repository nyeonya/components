"use client";

import PrimaryButton from "@/components/button/PrimaryButton";
import HookFormCheckBox from "@/components/react-hook-form/hook-checkbox";
import HookFormInput from "@/components/react-hook-form/hook-input";
import HookFormRadio from "@/components/react-hook-form/hook-radio";
import Select11 from "@/components/react-hook-form/test-select";
import { useForm } from "react-hook-form";

const emailPattern = {
  value: new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$", "ig"),
  message: "Enter a valid email address.",
};

const options = [
  { label: "1", value: "value1" },
  { label: "2", value: "value2" },
  { label: "3", value: "value3" },
];

const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  console.log("watch", watch());
  console.log(errors);

  //react-hook-form reset함수로 디폴트값 설정하기
  // useEffect(() => {
  //   reset({
  //     title1: "dddd",
  //   });
  // }, []);

  const onSubmit = handleSubmit((data) => {
    console.log("submitting");
    console.log(data);
  });

  return (
    //section과 article의 차이 =>아티클은 내용이 독립적이다 ,섹션보다 더 상세하고 독립적인 내용이 들어감,
    //섹션은 좀 더 큰 주제로 묶는다.
    <section className="flex flex-col items-center gap-10 ">
      <form onSubmit={onSubmit} className="flex flex-col items-center gap-5">
        <Select11
          rules={{ required: "셀렉트는 필수 선택입니다." }}
          control={control}
          options={options}
          errors={errors}
        />
        {/* input */}
        <HookFormInput
          id="input1"
          name="title1"
          label="이름"
          placeholder="이름을 입력해주세요."
          register={register}
          rules={{
            required: "필수 입력입니다",
            onChange: (e: any) => {
              setValue("title1", e.target.value.replace(" ", ""));
            },
          }}
          errors={errors}
          size="s"
        />
        <HookFormInput
          id="input2"
          name="input2"
          label="이메일"
          size="default"
          placeholder="이메일를 입력해주세요."
          register={register}
          rules={{
            required: "You must enter your email.",
            pattern: [emailPattern],
          }}
          errors={errors}
        />

        {/* radio */}
        <HookFormRadio
          paramsName="RADIO"
          name="RADIO BOX"
          control={control}
          rules={{ required: "라디오박스 필수 선택입니다." }}
          items={[
            { label: "하나", value: 1 },
            { label: "2222", value: 2 },
          ]}
          errors={errors}
        />
        {/* checkbox */}
        <HookFormCheckBox
          control={control as any}
          name="CHECKBOX"
          errors={errors}
          rules={{
            required: "체크박스는 필수",
          }}
          items={[
            { label: "하나", value: 1 },
            { label: "2222", value: 2 },
          ]}
        />
        <PrimaryButton label="전송" />
      </form>
    </section>
  );
};

export default ReactHookForm;
