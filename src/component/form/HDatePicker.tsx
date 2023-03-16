import classNames from "classnames";
import { useCallback } from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import {
  Controller,
  useFormContext,
  ControllerRenderProps,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import "./input.scss";
import "react-datepicker/dist/react-datepicker.css";
import { InputContainer, Label } from ".";

interface IProps {
  label: string;
  name: string;
  fieldOptions?: RegisterOptions<FieldValues, string> | undefined;
}

function HDatePicker(props: Omit<ReactDatePickerProps, "onChange"> & IProps) {
  const { name, fieldOptions, label, ...dateProps } = props;
  const { control } = useFormContext();
  const renderDatePicker = useCallback(
    ({ field }: { field: ControllerRenderProps<FieldValues, string> }) => (
      <ReactDatePicker
        wrapperClassName={classNames("datePicker")}
        placeholderText="Select date"
        {...field}
        selected={field.value}
        {...dateProps}
      />
    ),
    [dateProps]
  );

  return (
    <InputContainer>
      <Label>{label}</Label>
      <Controller
        rules={fieldOptions}
        control={control}
        name={name}
        render={renderDatePicker}
      />
    </InputContainer>
  );
}

export default HDatePicker;
