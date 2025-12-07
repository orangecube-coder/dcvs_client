import React, {
	FC,
	useContext,
	useEffect,
	useState,
	FocusEvent,
	ChangeEvent,
} from 'react'
import { Context } from '../..'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import GppGoodIcon from '@mui/icons-material/GppGood'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme()

const LoginForm: FC = () => {
	const { authStore } = useContext(Context)
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [emailDirty, setEmailDirty] = useState(false)
	const [passwordDirty, setPasswordDirty] = useState(false)
	const [emailError, setEmailError] = useState('Email не может быть пустым')
	const [passwordError, setPasswordError] = useState(
		'Пароль не может быть пустым'
	)
	const [formValid, setFormValid] = useState(false)
	const [notLogin, setNotLogin] = useState('')

	const login = (email: string, password: string) => {
		const error = authStore.login(email, password)
		error.then(result => {
			if (result) {
				setNotLogin(result)
			} else {
				setNotLogin('')
			}
		})
	}

	// const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault();
	// 	const data = new FormData(event.currentTarget);
	// 	console.log({
	// 		email: data.get('email'),
	// 		password: data.get('password'),
	// 	});
	// };

	useEffect(() => {
		if (emailError || passwordError) {
			setFormValid(false)
		} else {
			setFormValid(true)
		}
	}, [emailError, passwordError])

	const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
		const re = new RegExp(
			/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
		)
		if (!re.test(String(e.target.value).toLowerCase())) {
			setEmailError('Не корректный Email')
			if (!e.target.value) {
				setEmailError('Email не может быть пустым')
			}
		} else {
			setEmailError('')
		}
	}

	const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
		if (e.target.value.length < 3 || e.target.value.length > 8) {
			setPasswordError('Пароль должен быть от 3 до 8 символов')
			if (!e.target.value) {
				setPasswordError('Пароль не может быть пустым')
			}
		} else {
			setPasswordError('')
		}
	}

	const emailBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
		setEmailDirty(true)
	}

	const passwordBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
		setPasswordDirty(true)
	}

	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box mt={8} display='flex' alignItems='center' flexDirection='column'>
					<Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
						<GppGoodIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Авторизация
					</Typography>
					{notLogin && (
						<Stack sx={{ width: '100%', pt: 2 }}>
							<Alert
								onClose={() => {
									setNotLogin('')
								}}
								severity='error'
							>
								{notLogin}
							</Alert>
						</Stack>
					)}
					<Box
						component='form'
						noValidate
						sx={{ mt: 1 }}
						onKeyDown={event => {
							if (event.key === 'Enter' && formValid) login(email, password)
						}}
					>
						<TextField
							value={email}
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setEmail(e.target.value)
								emailHandler(e)
							}}
							onBlur={(e: FocusEvent<HTMLInputElement>) => emailBlurHandler(e)}
							margin='normal'
							error={!!(emailDirty && emailError)}
							required={!!(emailDirty && emailError)}
							placeholder='Email'
							fullWidth
							id='email'
							label='Email'
							name='email'
							helperText={emailDirty && emailError && emailError}
							autoComplete='email'
							autoFocus
						/>
						<TextField
							value={password}
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setPassword(e.target.value)
								passwordHandler(e)
							}}
							onBlur={(e: FocusEvent<HTMLInputElement>) =>
								passwordBlurHandler(e)
							}
							margin='normal'
							error={!!(passwordDirty && passwordError)}
							required={!!(passwordDirty && passwordError)}
							fullWidth
							name='password'
							label='Пароль'
							type='password'
							id='password'
							helperText={passwordDirty && passwordError && passwordError}
							autoComplete='current-password'
						/>
						<Button
							disabled={!formValid}
							onClick={() => login(email, password)}
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
						>
							Войти
						</Button>
						<Link href='#' variant='body2'>
							Я забыл свой пароль
						</Link>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	)
}

export default LoginForm
