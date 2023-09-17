import PrimaryButton from "@/components/Button/PrimaryButton";
import { action } from "@storybook/addon-actions";
import { StoryFn } from "@storybook/react";
import { ReactElement, ReactNode, FC } from "react";
import { FormProvider, useForm } from "react-hook-form";

const StorybookFormProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form
        className="w-[700px]"
        onSubmit={methods.handleSubmit(action("[React Hooks Form] Submit"))}
      >
        {children}
      </form>
    </FormProvider>
  );
};

//커링함수 첫번쨰 인자로 showSubmitButton을 받고 두번째인자로 decorators 에서 반환해주는 Story컴포넌트를 받는다
// eslint-disable-next-line import/no-anonymous-default-export
export default (showSubmitButton: boolean) =>
  // eslint-disable-next-line react/display-name
  (Story: FC): ReturnType<StoryFn<ReactElement>> =>
    (
      <StorybookFormProvider>
        <div>
          <Story />
          {showSubmitButton && <button type="submit">submitt</button>}
        </div>
      </StorybookFormProvider>
    );
