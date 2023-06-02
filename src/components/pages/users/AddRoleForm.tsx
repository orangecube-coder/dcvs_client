import { FC, useState, useContext } from "react";
import { IUser } from "../../../store/Interfaces";
import { Context } from "../../..";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  Button,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { GroupAdd as GroupAddIcon } from "@mui/icons-material";

export interface DialogProps {
  onClose: () => void;
  open: boolean;
  user: IUser;
}

const AddRoleForm: FC<DialogProps> = (props) => {
  const { onClose, open, user } = props;
  const { userStore } = useContext(Context);
  const [role, setRole] = useState("");
  const [formValid, setFormValid] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent) => {
    setFormValid(true);
    setRole(event.target.value);
  };

  const handleAdd = async () => {
    const result = await userStore.addUserRole(user, JSON.parse(role));
		if (result) onClose();
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="xs">
      <DialogContent>
        <DialogContentText component="div">
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar>
              <GroupAddIcon />
            </Avatar>
            <Typography component="span">
              Укажите новую роль для пользователя:
              <Typography sx={{ fontWeight: "bold" }} component="span">
                {" "}
                {user.name}
              </Typography>
            </Typography>
          </Stack>
        </DialogContentText>
        <Box>
          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel id="role-select-label">Роль</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              value={role || ""}
              label="Роль"
              onChange={handleChange}
							autoFocus
            >
              {userStore.roles.map((roleItem) => (
                <MenuItem
                  key={roleItem._id}
                  value={JSON.stringify({
                    _id: roleItem._id,
                    value: roleItem.value,
                  })}
                >
                  {roleItem.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <DialogActions sx={{ mt: 2, ml: 1 }}>
          <Button onClick={onClose}>Отмена</Button>
          <Button variant="contained" disabled={!formValid} onClick={handleAdd}>
            Добавить
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoleForm;
