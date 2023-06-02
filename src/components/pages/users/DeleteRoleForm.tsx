import { FC, useContext } from "react";
import { IRole, IUser } from "../../../store/Interfaces";
import { Context } from "../../..";
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
import { GroupRemove as GroupRemoveIcon } from "@mui/icons-material";

interface DialogProps {
  onClose: () => void;
  open: boolean;
  user: IUser;
  role: IRole;
}

const DeleteRoleForm: FC<DialogProps> = (props) => {
  const { onClose, open, user, role } = props;
  const { userStore } = useContext(Context);

  const handleDelete = async () => {
    const result = await userStore.delUserRole(user, role);
		if (result) onClose();
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="xs">
      <DialogContent>
        <DialogContentText component="div">
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar>
              <GroupRemoveIcon />
            </Avatar>
            <Typography component={"span"}>
              Вы действительно хотите удалить роль
              <Typography sx={{ fontWeight: "bold" }} component={"span"}>
                {" "}
                {role.value}
              </Typography>
              , для пользователя:
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

export default DeleteRoleForm;
