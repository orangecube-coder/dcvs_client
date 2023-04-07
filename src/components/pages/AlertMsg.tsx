import { FC, Fragment, useContext } from "react";
import { Context } from "../../index";
import { Snackbar, Alert } from "@mui/material";
import { AlertColor } from "@mui/material";
import { observer } from "mobx-react-lite";

const AlertMsg: FC = () => {
  const { store } = useContext(Context);
  return (
    <Fragment>
      {store.alertMsg?.msg ? (
        <Snackbar
          open={store.alertMsg?.msg ? true : false}
          autoHideDuration={10000}
          onClose={() => store.clearAlertMsg()}
        >
          <Alert
            sx={{ mb: 1 }}
            severity={store.alertMsg?.state as AlertColor}
            variant="filled"
            onClose={() => store.clearAlertMsg()}
          >
            {store.alertMsg?.msg}
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default observer(AlertMsg);
