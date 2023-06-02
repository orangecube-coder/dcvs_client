import { FC, useContext, useEffect } from "react";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import LoginForm from "./components/LoginForm/LoginForm";
import LayOut from "./components/LayOut";
import { Box, CircularProgress } from "@mui/material";

const App: FC = () => {
  const { authStore } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      authStore.checkAuth();
    }
  }, [authStore]);

  if (authStore.isLoading) {
    return (
      <Box mt={5} display="flex" justifyContent="center">
        <CircularProgress size="4rem" sx={{ color: "grey.300" }} />
      </Box>
    );
  }
  if (!authStore.isAuth) {
    return <LoginForm />;
  }
  return <LayOut />;
};

export default observer(App);
