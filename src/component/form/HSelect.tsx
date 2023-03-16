import React from "react";
import { useFormContext, RegisterOptions, FieldValues } from "react-hook-form";
import styled from "styled-components";
import { InputContainer, Label } from ".";

interface IOption {
  value: string;
  title: string;
}

interface IProps {
  label: string;
  name: string;
  fieldOptions?: RegisterOptions<FieldValues, string> | undefined;
  options: IOption[];
}

const HSelect = React.memo(
  (
    props: IProps &
      React.DetailedHTMLProps<
        React.SelectHTMLAttributes<HTMLSelectElement>,
        HTMLSelectElement
      >
  ) => {
    const { name, fieldOptions, options, label, ...selectProps } = props;
    const { register } = useFormContext();
    return (
      <InputContainer>
        <Label>{label}</Label>
        <Select {...selectProps} {...register(name, fieldOptions)}>
          {options.map((optionValue) => (
            <Option key={optionValue.value} value={optionValue.value}>
              {optionValue.title}
            </Option>
          ))}
        </Select>
      </InputContainer>
    );
  }
);

export default HSelect;

//styled

const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid;
`;
const Option = styled.option`
  padding: 10px;
`;
