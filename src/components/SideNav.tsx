/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText
} from '@mui/material';
import {
	Dashboard as DashboardIcon,
	ManageAccounts as ManageAccountsIcon, 
} from '@mui/icons-material';

const SideNav: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const listItems = [
		{
			label: "Мониторинг",
			path: "/dashboard",
			icon: <DashboardIcon />,
		},
		{
			label: "Пользователи",
			path: "/getusers",
			icon: <ManageAccountsIcon />,
		},
	]
	return (
		<List component="nav" dense>
			{listItems.map((item, index) => {
				const {label, path, icon} = item;
				return (
					<ListItemButton 
						key={index} 
						selected={location.pathname === path} 
						onClick={() => navigate(path)}>
							{icon && <ListItemIcon>{icon}</ListItemIcon>}
							<ListItemText primary={label} />
					</ListItemButton>
				);
			})}
		</List>
	)
}

export default SideNav
