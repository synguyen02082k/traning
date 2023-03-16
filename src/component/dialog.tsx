import Lottie from "lottie-react";
import React from "react";
import styled from "styled-components";
import loading from "../assets/lottei/loading.json";
import CustomButton from "./form/button";

interface IDialogProps {
  enable?: boolean;
  title: string;
  body: any;
  onConfirm?: () => void;
  confirmText: React.ReactNode;
  onCancel: () => void;
  isLoading?: boolean;
  disabledButton?: boolean;
}

const Dialog = (props: IDialogProps) => {
  const {
    confirmText,
    onConfirm,
    body,
    title,
    enable = false,
    onCancel,
    isLoading = false,
    disabledButton = false,
  } = props;
  if (!enable) {
    return <></>;
  }
  return (
    <DialogContainer>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogMessage>{body}</DialogMessage>
        <DialogButton>
          <CancelButton type="button" onClick={onCancel}>
            Cancel
          </CancelButton>
          <CustomButton
            type="submit"
            disabled={isLoading || disabledButton}
            buttonType="success"
            onClick={onConfirm}
          >
            {isLoading === true ? (
              <CustomLottie color="red" animationData={loading} />
            ) : (
              confirmText ?? "Confirm"
            )}
          </CustomButton>
        </DialogButton>
      </DialogContent>
    </DialogContainer>
  );
};

export default Dialog;

const Button = styled.button`
  font-size: 15px;
  background-color: red;
  color: white;
  padding: 7px 15px 7px 15px;
  border: none;
  border-radius: 5px;
  :disabled {
    background-color: rgba(255, 0, 0, 0.3);
  }
`;

const CancelButton = styled(Button)`
  background-color: gray;
  margin-right: 10px;
  cursor: pointer;
`;

const DialogContainer = styled.div`
  position: absolute;
  height: 100vh;
  width: 100%;
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.4);
  align-items: start;
  justify-content: center;
  display: flex;
  z-index: 100;
`;

const DialogContent = styled.div`
  background-color: white;
  width: fit-content;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
  margin-top: 10%;
`;

const DialogTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const DialogMessage = styled.div`
  font-size: 14px;
  margin-top: 24px;
`;

const DialogButton = styled.div`
  display: flex;
  margin-top: 36px;
  width: fit-content;
  margin-left: auto;
`;

export const CustomLottie = styled(Lottie)`
  margin-left: auto;
  margin-right: auto;
  width: 30px;
  height: 30px;
`;
