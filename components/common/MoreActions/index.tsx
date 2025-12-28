import { Stack } from "@mui/material";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";

type Props = {
  onEdit?: () => void,
  onDelete?: () => void,
};

export const MoreActions = ({ onEdit, onDelete }: Props) => {
  return (
    <Stack flexDirection='row' gap={1} alignItems='center'>
      <FiEdit2 
        style={{
          width: '32px',
          height: '32px',
          color: '#FACC00',
          padding: '0px 4px',
          borderRadius: '50%',
          backgroundColor: '#FFFAE6',
          border: '1px solid #000',
          cursor: 'pointer'
        }} 
        onClick={onEdit}
      />
      <FaRegTrashAlt 
        style={{
          width: '32px',
          height: '32px',
          color: '#ffffff',
          backgroundColor: '#967A00',
          padding: '2px 8px',
          borderRadius: '50%',
          border: '1px solid #000',
          cursor: 'pointer'
        }} 
        onClick={onDelete}
      />
    </Stack>
  );
};
