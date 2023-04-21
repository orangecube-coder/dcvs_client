import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { grey } from '@mui/material/colors';

const NotFound: FC = () => {
	return (
		<Box
      sx={{
        width: 300,
        height: 300,
				mx: 'auto',
				display: 'flex',
				flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h1" style={{ color: grey[300] }}>
        404
      </Typography>
			<Typography style={{ color: grey[500] }} sx={{ textAlign: 'center' }}>
        Страница не существует! 
      </Typography>
    </Box>
	)
}

export default NotFound