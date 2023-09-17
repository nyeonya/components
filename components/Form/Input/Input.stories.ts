import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";
import { mockProps } from "./Input.mocks";
import withRHF from "../withRHF";

const meta = {
  title: "component/Input",
  component: Input,
  decorators: [withRHF(true)],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      description: "useForm 필드값 관리용 이름 & request요청 시 필드 이름",
      required: true,
    },
    type: {
      description: "input type",
      control: { type: "select" },
      options: ["text", "number", "password"],
    },
    label: {
      description: "풋창 왼쪽에 들어가는 타이틀",
    },
    placeholder: {
      description: "placeholder",
    },
    rules: {
      description: "현재 값을 받아 validation 체크를 해줌",
    },
    disabled: {
      description: "disabled 여부",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    ...mockProps.base,
  },
};
