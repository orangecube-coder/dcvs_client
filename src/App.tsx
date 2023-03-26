import { FC, useContext, useEffect } from "react";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import LoginForm from "./components/LoginForm/LoginForm";
import LayOut from "./components/LayOut";

const App: FC = () => {
	const { store } = useContext(Context);
	useEffect(() => {
		if (localStorage.getItem("token")) {
			store.checkAuth();
		}
	}, [store]);
	if (store.isLoading) {
		return (
			<div className="preloader flex-column justify-content-center align-items-center">
				<img
					className="animation__shake"
					src="dist/img/AdminLTELogo.png"
					alt="AdminLTELogo"
					height={60}
					width={60}
				/>
			</div>
		);
	}
	if (!store.isAuth) {
		return <LoginForm />;
	}
	return <LayOut />;
};

export default observer(App);
