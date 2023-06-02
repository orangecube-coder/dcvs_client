import { FC, useContext } from "react";
import { Context } from "../../..";
import { IArea } from "../../../store/Interfaces";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Stack,
  Typography,
} from "@mui/material";
import { DeleteForever as DeleteForeverIcon } from "@mui/icons-material";
import { red } from "@mui/material/colors";

interface DialogProps {
  onClose: () => void;
  open: boolean;
  area: IArea;
}

const DeleteAreaForm: FC<DialogProps> = (props) => {
  const { onClose, open, area } = props;
  const { journalStore } = useContext(Context);

  const handleDelete = async () => {
    const result = await journalStore.delArea(area);
    if (result) onClose();
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="xs">
      <DialogContent>
        <DialogContentText component="div">
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar sx={{ bgcolor: red[700] }}>
              <DeleteForeverIcon />
            </Avatar>
            <Typography component={"span"}>
              Вы действительно хотите удалить зону: {" "}
              <Typography sx={{ fontWeight: "bold" }} component={"span"}>
                {area.value}
              </Typography>
              ?
            </Typography>
          </Stack>
        </DialogContentText>
        <DialogActions sx={{ mt: 2, ml: 1 }}>
          <Button onClick={onClose}>Отмена</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Удалить
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAreaForm;
