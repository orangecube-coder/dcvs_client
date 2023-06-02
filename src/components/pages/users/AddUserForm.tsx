import {
  FC,
  useState,
  FocusEvent,
  ChangeEvent,
  useEffect,
  useContext,
} from "react";
import { Context } from "../../..";
import {
  Dialog,
  Stack,
  DialogActions,
  TextField,
  DialogContent,
  DialogContentText,
  Button,
  Typography,
  Avatar,
} from "@mui/material";
import { PersonAdd as PersonAddIcon } from "@mui/icons-material";

export interface SimpleDialogProps {
  onClose: () => void;
  open: boolean;
}

const AddUserForm: FC<SimpleDialogProps> = (props) => {
  const { onClose, open } = props;
  const { userStore } = useContext(Context);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [nameError, setNameError] = useState("Поле 'Имя' не может быть пустым");
  const [emailError, setEmailError] = useState(
    "Поле 'Email' не может быть пустым"
  );
  const [passwordError, setPasswordError] = useState(
    "Поле 'Пароль' не может быть пустым"
  );
  const [formValid, setFormValid] = useState(false);

  const nameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (!e.target.value) {
      setNameError("Поле 'Имя' не может быть пустым");
    } else {
      setNameError("");
    }
  };

  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const re = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Не корректный Email");
      if (!e.target.value) {
        setEmailError("Поле 'Email' не может быть пустым");
      }
    } else {
      setEmailError("");
    }
  };

  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setPasswordError("Пароль должен быть от 3 до 8 символов");
      if (!e.target.value) {
        setPasswordError("Поле 'Пароль' не может быть пустым");
      }
    } else {
      setPasswordError("");
    }
  };

  useEffect(() => {
    if (emailError || passwordError || nameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError, nameError]);

  const nameBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    setNameDirty(true);
  };
  const emailBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    setEmailDirty(true);
  };
  const passwordBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    setPasswordDirty(true);
  };

  const handleAdd = async () => {
    const result = await userStore.addUser(name, email, password);
    if (result) onClose();
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="xs">
      <DialogContent>
        <DialogContentText mb={1} component="div">
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar>
              <PersonAddIcon />
            </Avatar>
            <Typography>
              Новому пользователю, по умолчанию, будет установлена роль
              <Typography sx={{ fontWeight: "bold" }} component="span">
                {" "}
                `USERS`
              </Typography>
            </Typography>
          </Stack>
        </DialogContentText>
        <Stack spacing={2} mt={3}>
          <TextField
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
              nameHandler(e);
            }}
            onBlur={(e: FocusEvent<HTMLInputElement>) => nameBlurHandler(e)}
            error={!!(nameDirty && nameError)}
            required={!!(nameDirty && nameError)}
            helperText={nameDirty && nameError}
            id="name"
            name="name"
            label="Имя"
            fullWidth
            autoFocus
						autoComplete = 'no'
          />

          <TextField
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
              emailHandler(e);
            }}
            onBlur={(e: FocusEvent<HTMLInputElement>) => emailBlurHandler(e)}
            error={!!(emailDirty && emailError)}
            required={!!(emailDirty && emailError)}
            placeholder="Email"
            id="email"
            label="Email"
            name="email"
            fullWidth
            helperText={emailDirty && emailError}
						autoComplete = 'no'
          />
          <TextField
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
              passwordHandler(e);
            }}
            onBlur={(e: FocusEvent<HTMLInputElement>) => passwordBlurHandler(e)}
            error={!!(passwordDirty && passwordError)}
            required={!!(passwordDirty && passwordError)}
            name="password"
            label="Пароль"
            type="password"
            id="password"
            fullWidth
            helperText={passwordDirty && passwordError}
          />
        </Stack>

        {/* <FormControlLabel
          control={<Switch />}
          label="Требовать активацию"
          sx={{ mt: 1 }}
        /> */}

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

export default AddUserForm;
