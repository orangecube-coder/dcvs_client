import { FC, useContext, ChangeEvent, useState } from "react";
import { Context } from "../../../..";
import { IArea } from "../../../../store/Interfaces";
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
import { Mode as ModeIcon } from "@mui/icons-material";
import { blue } from "@mui/material/colors";

export interface DialogProps {
  onClose: () => void;
  open: boolean;
  area: IArea;
}

const EditAreaForm: FC<DialogProps> = (props) => {
  const { onClose, open, area } = props;
  const { journalStore } = useContext(Context);
  const [value, setValue] = useState<string>(area.value);
  const [description, setDescription] = useState<string>(area.description);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleEdit = async () => {
    const result = await journalStore.editArea(area, value, description);
    if (result) onClose();
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="xs">
      <DialogContent>
        <DialogContentText mb={1} component="div">
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar sx={{ bgcolor: blue[700] }}>
              <ModeIcon />
            </Avatar>
            <Typography component={"span"}>
              Измените параметры производственной зоны:{" "}
              <Typography sx={{ fontWeight: "bold" }} component={"span"}>
                {area.value}
              </Typography>
            </Typography>
          </Stack>
        </DialogContentText>
        <Stack spacing={2} mt={3}>
          <TextField
            label="Имя зоны"
            onChange={handleChangeValue}
            multiline
            maxRows={5}
            defaultValue={area.value}
            autoFocus
          />
          <TextField
            label="Пояснение"
            onChange={handleChangeDescription}
            multiline
            maxRows={5}
            defaultValue={area.description}
          />
        </Stack>
        <DialogActions sx={{ mt: 3, ml: 1 }}>
          <Button onClick={onClose}>Отмена</Button>
          <Button variant="contained" onClick={handleEdit}>
            Изменить
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default EditAreaForm;
