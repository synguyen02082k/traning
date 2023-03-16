import { useCallback } from "react";
import styled from "styled-components";
import { Icons } from "../../constants/icons";

interface IProps {
  rowId: string;
  onDelete: (rowId: string) => void;
  onEdit: (rowId: string) => void;
  messageDelete?: string;
}

const TableAction = (props: IProps) => {
  const { onDelete, onEdit, rowId } = props;

  const onDeleteIcon = useCallback(() => {
    onDelete(rowId);
  }, [rowId, onDelete]);

  const onEditIcon = useCallback(() => {
    onEdit(rowId);
  }, [onEdit, rowId]);

  return (
    <ActionWrap>
      <Icon src={Icons.pen} onClick={onEditIcon} />
      <Icon src={Icons.trash} onClick={onDeleteIcon} />
    </ActionWrap>
  );
};

export default TableAction;

//
const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 15px;
`;

const ActionWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
