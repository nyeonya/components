"use client";

import { after } from "node:test";
import { CSSProperties, ChangeEvent, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Select, {
  CSSObjectWithLabel,
  ContainerProps,
  ControlProps,
  DropdownIndicatorProps,
  OptionProps,
  SingleValue,
  StylesConfig,
  components,
} from "react-select";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <img src="https://via.placeholder.com/30x30" />
    </components.DropdownIndicator>
  );
};

const customStyles = {
  container: (styles) => ({
    //스타일 자동완성용 리턴 타입 지정
    //   container: (styles): React.CSSProperties => ({
    ...styles,
    width: "200px",
    // ":hover": {
    //   width: "500px",
    // },
  }),
  control: (provided) => ({
    ...provided,
    marginRight: "0.5rem",
    width: "200px",
    heght: "3rem",
    borderRadius: "10px",
  }),

  /**인풋창 오른쪽에 있는 화살표 */
  dropdownIndicator: (pro) => ({
    ...pro,
    color: "red",
    padding: "10px 10px",
  }),
  input: (styles) => ({
    ...styles,
    // padding: "20px",
    margin: "0px",
    minHeight: "0px",
    width: "200px",
  }),
  menu: (styles) => ({
    ...styles,
    zIndex: 100,
    margin: "0px",
  }),
  /**펼쳐진 옵션 하나의 스타일 li 한개 */
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#ccc" : "#fff",
    color: state.isSelected ? "red" : "#333",
    width: "200px",
    heght: "3rem",
  }),
  indicatorSeparator: (pro) => ({
    ...pro,
    display: "none",
  }),
};

const Select11 = ({ options, control, errors, rules }: any) => {
  const errorMessages = errors["tttest"] ? errors["tttest"].message : "";
  const hasError = !!(errors && errorMessages);

  return (
    <Controller
      rules={rules}
      name="tttest"
      control={control}
      render={({ field }) => (
        <>
          <Select
            styles={customStyles}
            options={options}
            placeholder="선택해주세요"
            onChange={(e: any) => {
              field.onChange(e?.value);
            }}
            isSearchable={false}
            //   defaultMenuIsOpen={(e) => console.log(e)}
            //   components={{ DropdownIndicator }}
          />
          {hasError && (
            <span className="text-rose-400 font-bold">{errorMessages}</span>
          )}
        </>
      )}
    />
  );
};

export default Select11;
