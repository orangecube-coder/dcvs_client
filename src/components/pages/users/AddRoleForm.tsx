import { FC, useState, useEffect, useContext } from "react";
import UserService from "../../../services/UserService";
import { IRole } from "../../../models/IRole";
import { Context } from "../../../index";
import { AlertColor } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  Button,
  Box,
  Alert,
  Snackbar,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export interface SimpleDialogProps {
  onClose: () => void;
	onUpdate: () => void;
  open: boolean;
  email: string;
  username: string;
}

interface AlertMessage {
  state?: string;
  msg: string;
  err: any;
}

const AddRoleForm: FC<SimpleDialogProps> = (props) => {
  const { onClose, onUpdate, open, username, email } = props;
  const { store } = useContext(Context);
  const [newRole, setNewRole] = useState("");
  const [roles, setRoles] = useState<IRole[]>([]);
  const [formValid, setFormValid] = useState(false);
  const [alertMsg, setAlertMsg] = useState<AlertMessage>();

  async function getAllRoles() {
    try {
      const response = await UserService.fetchAllRoles();
      setRoles(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllRoles();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setFormValid(true);
    setNewRole(event.target.value as string);
  };

  const addUserRole = (email: string, role: string) => {
    const res = store.addUserRole(email, role);
    res.then((result) => {
			onUpdate();
      setAlertMsg(result);
    });
  };

  const clearForm = () => {
    onClose();
    setAlertMsg({ msg: "", err: {} });
    setNewRole("");
    setFormValid(false);
  };

  const clearAlert = () => {
    setAlertMsg({ msg: "", err: {} });
  };

  return (
    <Dialog open={open} maxWidth="xs">
      <DialogTitle>
        Добавить роль
        <IconButton
          aria-label="close"
          onClick={() => clearForm()}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {alertMsg?.msg ? (
          <Snackbar
            open={open}
            autoHideDuration={10000}
            onClose={() => clearAlert()}
          >
            <Alert
              sx={{ mb: 1 }}
              severity={alertMsg?.state as AlertColor}
              variant="filled"
              onClose={() => clearAlert()}
            >
              {alertMsg?.msg}
            </Alert>
          </Snackbar>
        ) : (
          ""
        )}
        <DialogContentText id="alert-dialog-description">
          Укажите необходимую роль для пользователя {username} ({email})
        </DialogContentText>
        <Box>
          <FormControl fullWidth sx={{ mt: 2 }} variant="standard">
            <InputLabel id="role-select-label">Роль</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              value={newRole}
              label="Роль"
              onChange={handleChange}
            >
              {roles.map((role) => (
                <MenuItem key={role._id} value={role.value}>
                  {role.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <DialogActions sx={{ mt: 3, ml: 1 }}>
          <Button onClick={() => clearForm()}>Отмена</Button>
          <Button
            variant="contained"
            disabled={!formValid}
            onClick={() => addUserRole(email, newRole)}
          >
            Добавить
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoleForm;
