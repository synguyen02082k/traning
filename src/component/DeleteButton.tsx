import { useCallback, useState } from "react";
import styled from "styled-components";
import Dialog from "./dialog";

interface IDeleteButtonProps {
  messageDelete: string;
  onDelete: (id: string) => void;
  id: string;
  title: string;
}

export default function DeleteButton(props: IDeleteButtonProps) {
  const { messageDelete, onDelete, id, title } = props;
  const [showDialog, setShowDialog] = useState(false);
  const handleDialog = useCallback(() => {
    setShowDialog(!showDialog);
  }, [showDialog]);

  const onConfirm = useCallback(() => {
    handleDialog();
    onDelete(id);
  }, [handleDialog, id, onDelete]);

  return (
    <div>
      <Button onClick={handleDialog}>{title}</Button>
      <Dialog
        enable={showDialog}
        title="Confirm the action?"
        message={messageDelete}
        onConfirm={onConfirm}
        confirmText="Confirm"
        onCancel={handleDialog}
      />
    </div>
  );
}

const Button = styled.button`
  background-color: red;
  color: white;
  padding: 5px 10px 5px 10px;
  border: none;
  border-radius: 5px;
`;
