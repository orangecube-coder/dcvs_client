import {
  FC,
  useState,
  FocusEvent,
  ChangeEvent,
  useEffect,
  useContext,
} from "react";
import { AlertColor } from "@mui/material";
import { Context } from "../../../index";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  IconButton,
  TextField,
  Grid,
  DialogContent,
  DialogContentText,
  Button,
  FormControlLabel,
  Switch,
  Alert,
  Snackbar,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export interface SimpleDialogProps {
  onClose: () => void;
	onUpdate: () => void;
  open: boolean;
}

interface AlertMessage {
  state?: string;
  msg: string;
  err: any;
}

const AddUserForm: FC<SimpleDialogProps> = (props) => {
  const { onClose, onUpdate, open } = props;
  const { store } = useContext(Context);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstNameDirty, setFirstNameDirty] = useState(false);
  const [lastNameDirty, setLastNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [firstNameError, setFirstNameError] = useState(
    "Поле 'Имя' не может быть пустым"
  );
  const [lastNameError, setLastNameError] = useState(
    "Поле 'Фамилия' не может быть пустым"
  );
  const [emailError, setEmailError] = useState(
    "Поле 'Email' не может быть пустым"
  );
  const [passwordError, setPasswordError] = useState(
    "Поле 'Пароль' не может быть пустым"
  );
  const [formValid, setFormValid] = useState(false);
  const [alertMsg, setAlertMsg] = useState<AlertMessage>();

  const firstNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    if (!e.target.value) {
      setFirstNameError("Поле 'Имя' не может быть пустым");
    } else {
      setFirstNameError("");
    }
  };

  const lastNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    if (!e.target.value) {
      setLastNameError("Поле 'Фамилия' не может быть пустым");
    } else {
      setLastNameError("");
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
    if (emailError || passwordError || firstNameError || lastNameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError, firstNameError, lastNameError]);

  const firstNameBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    setFirstNameDirty(true);
  };
  const lastNameBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    setLastNameDirty(true);
  };
  const emailBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    setEmailDirty(true);
  };
  const passwordBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    setPasswordDirty(true);
  };

  const addUser = (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    const res = store.addUser(firstName, lastName, email, password);
    res.then((result) => {
			onUpdate();
      setAlertMsg(result);
    });
  };

  const clearForm = () => {
    onClose();
    setFirstName("");
    setLastName("");
    setPassword("");
    setEmail("");
    setAlertMsg({ msg: "", err: {} });
    setFormValid(false);
  };

  const clearAlert = () => {
    setAlertMsg({ msg: "", err: {} });
  };

  return (
    <Dialog open={open} maxWidth="xs">
      <DialogTitle>
        Новый пользователь
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
              onClose={() => clearAlert()}
							variant="filled"
            >
              {alertMsg?.msg}
            </Alert>
          </Snackbar>
        ) : (
          ""
        )}
        <DialogContentText sx={{ mb: 1 }}>
          Новому пользователю, по умолчанию, будет установлена роль `USERS`.
        </DialogContentText>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={firstName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFirstName(e.target.value);
                firstNameHandler(e);
              }}
              onBlur={(e: FocusEvent<HTMLInputElement>) =>
                firstNameBlurHandler(e)
              }
              error={!!(firstNameDirty && firstNameError)}
              required={!!(firstNameDirty && firstNameError)}
              helperText={firstNameDirty && firstNameError && firstNameError}
              id="firstName"
              name="firstName"
              label="Имя"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={lastName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setLastName(e.target.value);
                lastNameHandler(e);
              }}
              onBlur={(e: FocusEvent<HTMLInputElement>) =>
                lastNameBlurHandler(e)
              }
              error={!!(lastNameDirty && lastNameError)}
              required={!!(lastNameDirty && lastNameError)}
              helperText={lastNameDirty && lastNameError && lastNameError}
              id="lastName"
              name="lastName"
              label="Фамилия"
              placeholder="Фамилия"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
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
              variant="standard"
              helperText={emailDirty && emailError && emailError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
                passwordHandler(e);
              }}
              onBlur={(e: FocusEvent<HTMLInputElement>) =>
                passwordBlurHandler(e)
              }
              error={!!(passwordDirty && passwordError)}
              required={!!(passwordDirty && passwordError)}
              name="password"
              label="Пароль"
              type="password"
              id="password"
              fullWidth
              variant="standard"
              helperText={passwordDirty && passwordError && passwordError}
            />
          </Grid>
        </Grid>
        <FormControlLabel
          control={<Switch />}
          label="Требовать активацию"
          sx={{ mt: 1 }}
        />

        <DialogActions sx={{ mt: 2, ml: 1 }}>
          <Button onClick={() => clearForm()}>Отмена</Button>
          <Button
            variant="contained"
            disabled={!formValid}
            onClick={() => addUser(firstName, lastName, email, password)}
          >
            Добавить
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserForm;
