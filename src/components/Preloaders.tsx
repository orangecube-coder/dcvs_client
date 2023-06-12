import { FC, useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Context } from "../";

interface AuthProps {
  allowedRoles: string[];
}

export const AuthPreloader: FC<AuthProps> = (props) => {
  const { allowedRoles } = props;
  const { authStore } = useContext(Context);
  const location = useLocation();

  return authStore.user.roles.find((role) => allowedRoles.includes(role.value)) 
		? ( <Outlet />) 
		:	(	<Navigate to="/404" state={{ from: location }} replace /> );
};

export const UsersPreloader: FC = () => {
  const { userStore } = useContext(Context);
  userStore.getAllUsers();
  userStore.getAllRoles();

  return <Outlet />;
};

export const JournalPreloader: FC = () => {
  const { journalStore } = useContext(Context);
  journalStore.preloadJournal();
  return <Outlet />;
};
