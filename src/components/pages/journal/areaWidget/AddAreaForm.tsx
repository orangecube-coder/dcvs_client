import { FC, useState, useContext, ChangeEvent } from "react";
import { Context } from "../../../..";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  Stack,
  Avatar,
  Typography,
} from "@mui/material";
import { PlaylistAdd as PlaylistAddIcon } from "@mui/icons-material";
import { blue } from "@mui/material/colors";

export interface DialogProps {
  onClose: () => void;
  open: boolean;
}

const AddAreaForm: FC<DialogProps> = (props) => {
  const { onClose, open } = props;
  const { journalStore } = useContext(Context);
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [formValid, setFormValid] = useState(false);

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 5) {
      setFormValid(true);
    } else setFormValid(false);
    setValue(e.target.value as string);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value as string);
  };

  const handleAdd = async () => {
    const result = await journalStore.addArea(value, description);
    if (result) onClose();
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="xs">
      <DialogContent>
        <DialogContentText mb={1} component="div">
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar sx={{ bgcolor: blue[700] }}>
              <PlaylistAddIcon />
            </Avatar>
            <Typography>Укажите необходимую производственную зону</Typography>
          </Stack>
        </DialogContentText>
        <Stack spacing={2} mt={3}>
          <TextField
            label="Имя зоны"
            onChange={handleChangeName}
            multiline
            maxRows={5}
            autoFocus
          />
          <TextField
            label="Пояснение"
            onChange={handleChangeDescription}
            multiline
            maxRows={5}
          />
        </Stack>
        <DialogActions sx={{ mt: 3, ml: 1 }}>
          <Button onClick={onClose}>Отмена</Button>
          <Button variant="contained" disabled={!formValid} onClick={handleAdd}>
            Добавить
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AddAreaForm;
