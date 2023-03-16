import { useFormContext, RegisterOptions, FieldValues } from "react-hook-form";
import styled from "styled-components";
import { InputContainer, Label } from ".";

type IProps = {
  name: string;
  label?: string;
  fieldOptions?: RegisterOptions<FieldValues, string> | undefined;
};

export type IInputProps = IProps &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;

function Input(props: IInputProps) {
  const { label, name, fieldOptions, ...inputProps } = props;
  const { register } = useFormContext();
  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      <CustomInput {...inputProps} {...register(name, fieldOptions)} />
    </InputContainer>
  );
}

export default Input;

const CustomInput = styled.input`
  min-width: 300px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid;
`;
