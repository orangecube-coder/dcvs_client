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
  FormControl,
  SelectChangeEvent,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { PlaylistAdd as PlaylistAddIcon } from "@mui/icons-material";
import { blue } from "@mui/material/colors";

export interface DialogProps {
  onClose: () => void;
  open: boolean;
}

const AddRecordForm: FC<DialogProps> = (props) => {
  const { onClose, open } = props;
  const { journalStore, authStore } = useContext(Context);
  // const [value, setValue] = useState("");
  const [node, setNode] = useState("");
  const [description, setDescription] = useState("");
  const [formValid, setFormValid] = useState(true);

  // const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.value.length > 5) {
  //     setFormValid(true);
  //   } else setFormValid(false);
  //   setValue(e.target.value as string);
  // };

  const handleChangeNode = (e: SelectChangeEvent) => {
    setNode(e.target.value as string);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value as string);
  };

  const handleAdd = async () => {
    const result = await journalStore.addRecord(
      JSON.parse(node),
      authStore.user,
      Date.now(),
      description
    );
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
          <FormControl fullWidth>
            <InputLabel id="area-select-label">Зона</InputLabel>
            <Select
              labelId="area-select-label"
              id="area-select"
              value={node || ""}
              label="Зона"
              onChange={handleChangeNode}
            >
              {journalStore.nodeStore.nodes.map((node) => (
                <MenuItem
                  key={node._id}
                  value={JSON.stringify({
                    _id: node._id,
                    value: node.value,
                  })}
                >
                  {node.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default AddRecordForm;
