import classNames from "classnames";
import React from "react";
import "./button.scss";

interface IProps {
  buttonType:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info";
}

function CustomButton(
  props: IProps &
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
) {
  const { children, onClick, buttonType, ...buttonProps } = props;
  return (
    <button
      className={classNames(`custom-button custom-button-${buttonType}`)}
      onClick={onClick}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export default CustomButton;
