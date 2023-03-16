import classNames from "classnames";
import styled from "styled-components";
import Input, { IInputProps } from "./input";
import "./input.scss";

function CheckBox(props: IInputProps) {
  const { label, ...inputProps } = props;
  return (
    <CheckBoxContainer>
      <Input
        className={classNames("checkbox")}
        style={{ minWidth: "0px !important" }}
        type="checkbox"
        {...inputProps}
      />
      <Label>{label}</Label>
    </CheckBoxContainer>
  );
}

export default CheckBox;

//styled
const CheckBoxContainer = styled.div`
  display: flex;
`;

const Label = styled.div`
  margin-left: 10px;
  font-size: 15px;
`;
