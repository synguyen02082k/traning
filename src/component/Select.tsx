import { useCallback } from "react";
import styled from "styled-components";
import shortid from "shortid";

export interface IOption {
  value: string | number;
  title: string;
}

interface IProps {
  options: IOption[];
  defaultValue?: string | number;
  onChange: (value: string | number) => void;
}

const Select = (props: IProps) => {
  const { options, onChange, defaultValue } = props ?? {};
  const onChangeOption = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <SelectContainer value={defaultValue} onChange={onChangeOption}>
      {options.map((option) => (
        <Option key={shortid.generate()} value={option.value}>
          {option.title}
        </Option>
      ))}
    </SelectContainer>
  );
};

export default Select;

//style

const SelectContainer = styled.select`
  padding: 5px;
`;

const Option = styled.option``;
