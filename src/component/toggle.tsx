import styled from "styled-components";
import { Color } from "../constants/constant";

interface IProps {
  size: number;
  toggleColor?: string;
  backgroundColor?: string;
  status: boolean;
}

const ToggleWrap = styled.div`
  background-color: ${Color.primary};
  padding: 2px 2px 2px 2px;
  border-radius: 18px;
  display: inline-block;
`;

const Circle = styled.div`
  background-color: ${Color.secondary};
`;

const Toggle = (props: IProps) => {
  const { size, toggleColor, backgroundColor, status } = props ?? {};

  return (
    <ToggleWrap
      style={{ backgroundColor: backgroundColor, width: (size ?? 20) * 2 }}
    >
      <Circle
        style={{
          width: size,
          height: size,
          borderRadius: size,
          backgroundColor: toggleColor,
          marginLeft: status ? "auto" : "",
        }}
      />
    </ToggleWrap>
  );
};

export default Toggle;
