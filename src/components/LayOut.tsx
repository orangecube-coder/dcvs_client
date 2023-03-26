import React, { useState, useEffect, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Context } from "../index";
import { Route, Routes } from 'react-router-dom';
import Users from './pages/Users';
// import Registration from './pages/Registration';
import Index from './pages/Index';
import DashBoard from './pages/DashBoard';
import { 
	Box, 
	AppBar, 
	Toolbar, 
	IconButton, 
	Typography, 
	Drawer,
	Divider,
	Container,
	Link,
} from '@mui/material';
import { 
	Logout as LogoutIcon,
	Menu as MenuIcon,
	ChevronLeft as ChevronLeftIcon,
	ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import SideNav from './SideNav';

const drawerWidth = 240; 
const mdTheme = createTheme();

const LayOut  = () => {
	const [ open, setOpen ] = useState(false);
	const [ mode, setMode ] = useState(false);
	const {store} = useContext(Context);

	useEffect(() => {
		const handleResize = (event: any) => {
			if (event.target.innerWidth < 768) { setMode(true) } 
				else { setMode(false) }  
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
	<ThemeProvider theme={mdTheme}>
		<Box sx={{ display: 'flex' }}>
			<AppBar position="absolute" sx={{
				...(!mode && { 
					width: `calc(100% - calc(${mdTheme.spacing(7)} + 1px))`,
					transition: mdTheme.transitions.create(['width', 'margin'], {}),
					...(open && {
						marginLeft: drawerWidth,
						width: `calc(100% - ${drawerWidth}px)`,
					}),
  			})
			}}>
			<Toolbar sx={{ pr: '24px' }}>
				<IconButton
					edge="start"
					color="inherit"
					aria-label="open drawer"
					onClick={() => setOpen(!open)}
					sx={{	marginRight: '36px'	}}
				>
					{mode ? <MenuIcon /> : !open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</IconButton>
				<Typography 
					component="h1" 
					variant="h6" 
					color="inherit" 
					noWrap sx={{ flexGrow: 1 }}
					>
						{/* {mode ? "True" : "False"} */}
				</Typography>
				<IconButton color="inherit" onClick={() => store.logout()}>
					<LogoutIcon />
				</IconButton>
			</Toolbar>
			</AppBar>
			<Drawer open={open} onClose={() => setOpen(false)} variant={mode ? "temporary" : "permanent"} 
				sx={{
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						transition: mdTheme.transitions.create(['width', 'margin'], {}),
						...(mode && {width: drawerWidth}),
						...(!mode && {
							...(!open && {width: `calc(${mdTheme.spacing(7)} + 1px)`}),
							...(open && {width: drawerWidth})
						}),
						boxSizing: 'border-box',
					},
				}}>
				<Toolbar
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'flex-end',
						px: [1],
					}}
				>
					<IconButton>
						<ChevronLeftIcon />
					</IconButton>
				</Toolbar>
				<Divider />
				<SideNav />
			</Drawer>
			<Box
					component="main"
					sx={{
						...(!mode && {
							transition: mdTheme.transitions.create('padding', {}),
							...(!open && {ml: `calc(${mdTheme.spacing(7)} + 1px)`}),
							...(open && {ml: drawerWidth + 'px'}),
							}),
						backgroundColor: (theme) =>
							theme.palette.mode === 'light'
								? theme.palette.grey[100]
								: theme.palette.grey[900],
						flexGrow: 1,
						height: '100vh',
						overflow: 'auto',
					}}
				>
				<Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
					<Routes>
						<Route path='/' element= {<Index />} />
						<Route path='/dashboard' element= {<DashBoard />} />
						{/* <Route path='/registration' element= {<Registration />} /> */}
						<Route path='/getusers' element= {<Users />} />
					</Routes>
					<Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 4 }}>
						{'Copyright © '}<Link color="inherit" href="https://mui.com/">Your Website</Link>{' '}{new Date().getFullYear()}{'.'}
					</Typography>
				</Container>
			</Box>
		</Box>
		</ThemeProvider>
	)
}

export default LayOut;