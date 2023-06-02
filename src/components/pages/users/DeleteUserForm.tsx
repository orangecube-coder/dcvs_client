import { FC, useContext } from "react";
import { Context } from "../../..";
import { IUser } from "../../../store/Interfaces";
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
import { PersonRemove as PersonRemoveIcon } from "@mui/icons-material";

interface DialogProps {
  onClose: () => void;
  open: boolean;
  user: IUser;
}

const DeleteUserForm: FC<DialogProps> = (props) => {
  const { onClose, open, user } = props;
  const { userStore } = useContext(Context);

  const handleDelete = async () => {
    const result = await userStore.delUser(user);
    if (result) onClose();
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="xs">
      <DialogContent>
        <DialogContentText component="div">
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar>
              <PersonRemoveIcon />
            </Avatar>
            <Typography component={"span"}>
              Вы действительно хотите удалить пользователя:
              <Typography sx={{ fontWeight: "bold" }} component={"span"}>
                {" "}
                {user.name}
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

export default DeleteUserForm;
