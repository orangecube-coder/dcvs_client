import { FC, useState, useContext, ChangeEvent, useEffect } from "react";
import { Context } from "../../..";
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
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
	FormControl,
} from "@mui/material";
import { PlaylistAdd as PlaylistAddIcon } from "@mui/icons-material";
import { blue } from "@mui/material/colors";

export interface DialogProps {
  onClose: () => void;
  open: boolean;
}

const AddNodeForm: FC<DialogProps> = (props) => {
  const { onClose, open } = props;
  const { journalStore } = useContext(Context);
  const [nodeName, setNodeName] = useState("");
  const [area, setArea] = useState("");
  const [formValid, setFormValid] = useState(false);

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNodeName(e.target.value as string);
  };

  const handleChangeArea = (e: SelectChangeEvent) => {
    setArea(e.target.value as string);
  };

  const handleAdd = async () => {
    const result = await journalStore.addNode(nodeName, JSON.parse(area));
    if (result) onClose();
  };

  useEffect(() => {
    if (nodeName.length > 5 && area.length > 0) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [nodeName, area]);

  return (
    <Dialog onClose={onClose} open={open} maxWidth="xs">
      <DialogContent>
        <DialogContentText mb={1} component="div">
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar sx={{ bgcolor: blue[700] }}>
              <PlaylistAddIcon />
            </Avatar>
            <Typography>
              Укажите имя и зону для нового технологического узла:
            </Typography>
          </Stack>
        </DialogContentText>
        <Stack spacing={2} mt={3}>
          <TextField
            label="Имя узла"
            onChange={handleChangeName}
            multiline
            maxRows={5}
            autoFocus
          />
          <FormControl fullWidth>
            <InputLabel id="area-select-label">Зона</InputLabel>
            <Select
              labelId="area-select-label"
              id="area-select"
              value={area || ""}
              label="Зона"
              onChange={handleChangeArea}
            >
              {journalStore.areas.map((area) => (
                <MenuItem
                  key={area._id}
                  value={JSON.stringify({
                    _id: area._id,
                    value: area.value,
                  })}
                >
                  {area.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default AddNodeForm;
