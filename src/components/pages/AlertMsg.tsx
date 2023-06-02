import { FC, Fragment, useContext } from "react";
import { Context } from "../..";
import { Snackbar, Alert } from "@mui/material";
import { AlertColor } from "@mui/material";
import { observer } from "mobx-react-lite";

const AlertMsg: FC = () => {
  const { alertStore } = useContext(Context);
  return (
    <Fragment>
      {alertStore.alertMsg?.msg ? (
        <Snackbar
          open={alertStore.alertMsg?.msg ? true : false}
          autoHideDuration={10000}
          onClose={() => alertStore.clearAlertMsg()}
        >
          <Alert
            sx={{ mb: 1 }}
            severity={alertStore.alertMsg?.state as AlertColor}
            variant="filled"
            onClose={() => alertStore.clearAlertMsg()}
          >
            {alertStore.alertMsg?.msg}
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default observer(AlertMsg);
