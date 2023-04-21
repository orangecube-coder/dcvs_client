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

interface SimpleProps {
	open: boolean;
}

const SideNav: FC<SimpleProps> = (props) => {
	const { open } = props;
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
		<List component="nav">
			{listItems.map((item, index) => {
				const {label, path, icon} = item;
				return (
					<ListItemButton 
						sx={{ height: 38 }}
						disableGutters
						key={index} 
						selected={location.pathname === path} 
						onClick={() => navigate(path)}>
							{icon && <ListItemIcon sx={{ justifyContent: 'center' }}>{icon}</ListItemIcon>}
							{open && <ListItemText primary={label} />}
					</ListItemButton>
				);
			})}
		</List>
	)
}

export default SideNav
