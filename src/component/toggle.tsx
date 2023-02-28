import { useMemo } from "react";
import styled from "styled-components";
import { Color } from "../constants/constant";

interface IProps {
  size: number;
  toggleColor?: string;
  backgroundColor?: string;
  status: boolean;
}

const Toggle = (props: IProps) => {
  const { size, toggleColor, backgroundColor, status } = props;

  const Toggle = useMemo(
    () => styled.div`
      background-color: ${backgroundColor ?? Color.primary};
      width: ${size * 2}px;
      padding: 2px 2px 2px 2px;
      border-radius: 18px;
      display: inline-block;
    `,
    [backgroundColor, size]
  );

  const Circle = useMemo(
    () => styled.div`
      width: ${size}px;
      height: ${size}px;
      border-radius: ${size}px;
      background-color: ${toggleColor ?? Color.secondary};
      margin-left: ${status ? "auto" : ""};
    `,
    [size, status, toggleColor]
  );

  return (
    <Toggle>
      <Circle />
    </Toggle>
  );
};

export default Toggle;
