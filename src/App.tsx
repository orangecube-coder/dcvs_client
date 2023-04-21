import { FC, useContext, useEffect } from "react";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import LoginForm from "./components/LoginForm/LoginForm";
import LayOut from "./components/LayOut";
import { Box, CircularProgress } from "@mui/material";

const App: FC = () => {
	const { store } = useContext(Context);
	useEffect(() => {
		if (localStorage.getItem("token")) {
			store.checkAuth();
		}
	}, [store]);
	
	if (store.isLoading) {
		return (
			<Box sx={{ display: 'flex' }}>
      	<CircularProgress />
    	</Box>
		);
	}
	if (!store.isAuth) {
		return <LoginForm />;
	}
	return <LayOut />;
};

export default observer(App);
