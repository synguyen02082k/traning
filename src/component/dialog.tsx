import styled from "styled-components";

interface IDialogProps {
  enable?: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  confirmText: string;
  onCancel: () => void;
}

const Dialog = (props: IDialogProps) => {
  const {
    confirmText,
    onConfirm,
    message,
    title,
    enable = false,
    onCancel,
  } = props;
  if (!enable) {
    return <></>;
  }
  return (
    <DialogContainer>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogMessage>{message}</DialogMessage>
        <DialogButton>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
          <Button onClick={onConfirm}>{confirmText ?? "Confirm"}</Button>
        </DialogButton>
      </DialogContent>
    </DialogContainer>
  );
};

export default Dialog;

const Button = styled.button`
  background-color: red;
  color: white;
  padding: 5px 10px 5px 10px;
  border: none;
  border-radius: 5px;
`;

const CancelButton = styled(Button)`
  background-color: gray;
  margin-right: 10px;
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
`;

const DialogContent = styled.div`
  background-color: white;
  width: fit-content;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
  margin-top: 20%;
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
