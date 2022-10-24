import './login.module.scss';

import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Alert from '@mui/material/Alert';

import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

// Services
import { signIn, me, IErrorProps } from '../../../services';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../store/user/index.slice';
import Input from '../../../components/atoms/form/input/Input';
import { Stack } from '@mui/material';

import { useHistory } from 'react-router';

/* eslint-disable-next-line */
export interface LoginProps {}

function Copyright(props: any) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            DEFMARKET BACKOFFICE
            {' © ' + new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignIn(props: any) {
    // State
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<IErrorProps | null>(null);

    // Redux
    const dispatch = useDispatch();
    const history = useHistory();

    const { isLoggedIn } = useSelector((state: any) => state.user);

    const handleSubmit = async (identifier: string, password: string) => {
        if (!identifier || !password) {
            return;
        }
        setIsLoading(true);

        signIn(identifier, password)
            .then(async (response: any) => {
                if (response.status === 200) {
                    // save accessToken in localStorage
                    await localStorage.setItem(
                        '@Access_Token',
                        response.data.accessToken
                    );
                    // save refreshToken in localStorage
                    await localStorage.setItem(
                        '@Refresh_Token',
                        response.data.refreshToken
                    );

                    await me()
                        .then((res: any) => {
                            if (res.status === 200) {
                                if (res?.data?.blocked) {
                                    setError({
                                        message: 'Ce compte est bloqué',
                                    });
                                } else {
                                    dispatch(userActions.setIsLoggedIn(true));
                                    dispatch(userActions.setUser(res?.data));
                                    history.replace('pro-account');
                                }
                                setIsLoading(false);
                            }
                        })
                        .catch((err) => {
                            return err;
                        });
                }
            })
            .catch((err: IErrorProps) => {
                setIsLoading(false);
                setError(err);
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    {isLoading ? (
                        <CircularProgress color="inherit" />
                    ) : (
                        <LockOutlinedIcon />
                    )}
                </Avatar>
                <Typography
                    component="h1"
                    fontFamily="DefmarketFontPrimary"
                    variant="h5"
                >
                    Connexion
                </Typography>

                <Stack sx={{ mt: 1 }} gap={2}>
                    {error && (
                        <Alert severity="error">
                            {error?.message ?? 'Connexion impossible!'}
                        </Alert>
                    )}

                    <Input
                        required
                        name="email"
                        label="Adresse e-mail"
                        type="email"
                        onChange={(value) => setIdentifier(value)}
                    />

                    <Input
                        required
                        name="password"
                        label="Mot de passe"
                        type="password"
                        onChange={(value) => setPassword(value)}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => handleSubmit(identifier, password)}
                    >
                        Je me connecte
                    </Button>

                    {/* <Grid container>
                        <Grid item xs />
                        <Grid item>
                            <Link
                                href="#"
                                variant="body2"
                                style={{
                                    fontFamily: 'DefmarketFontPrimary',
                                }}
                            >
                                {'Mot de passe oublié?'}
                            </Link>
                        </Grid>
                    </Grid> */}
                </Stack>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}
