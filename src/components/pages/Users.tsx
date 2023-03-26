import { FC } from 'react';
import UserTable from './users/UserTable';
import { Grid, Paper, Typography } from '@mui/material';

const Users: FC = () => {
	return (	
		<Grid container spacing={3}>
			<Grid item xs={12} overflow="hidden">
				<Paper
					sx={{
						p: 2,
						display: 'flex',
						flexDirection: 'column',
					}}>
					<Typography component="h2" variant="h6" color="primary" gutterBottom>
						Пользователи
					</Typography>
					<UserTable />
				</Paper>
			</Grid>
		</Grid>
	)
}

export default Users;
