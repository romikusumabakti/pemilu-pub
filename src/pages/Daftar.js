import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Card, Stack } from '@material-ui/core';
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import { API_URL } from '../App';

function Daftar() {

    const handleSubmit = (event) => {
        event.preventDefault();

        if (document.periksaId.passwordConfirmation.value === document.periksaId.password.value)
            fetch(API_URL + '/coba_buat_akun/', {
                method: 'POST',
                body: new FormData(document.periksaId),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error();
                    }
                    return response.json();
                })
                .then(hash => {
                    window.location.href = API_URL + '/authorize/?id=' + document.periksaId.username.value + '&hash=' + hash;
                })
                .catch((error) => {
                    console.error(error);
                    alert('NIM/NIDN tidak valid.');
                });
        else {
            alert('Konfirmasi kata sandi tidak cocok.');
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ p: useTheme().padding }}>
            <CssBaseline />
            <Card
                sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Buat Akun PUB
                </Typography>
                <Typography component="h2" variant="subtitle1">
                    menggunakan Akun Google
                </Typography>
                <Stack spacing={2} component="form" name="periksaId" onSubmit={handleSubmit} sx={{ alignSelf: 'stretch', mt: 2 }}>
                    <TextField
                        required
                        fullWidth
                        id="username"
                        label="NIM/NIDN"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        InputLabelProps={{ required: false }}
                    />
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Kata sandi"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        InputLabelProps={{ required: false }}
                    />
                    <TextField
                        required
                        fullWidth
                        name="passwordConfirmation"
                        label="Konfirmasi kata sandi"
                        type="password"
                        id="password-confirmation"
                        autoComplete="current-password"
                        InputLabelProps={{ required: false }}
                    />
                    <Grid container>
                        <Grid item xs>
                            <Button color="secondary" component={Link} to="/login">
                                Login
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button type="submit" variant="contained">
                                Daftar
                            </Button>
                        </Grid>
                    </Grid>
                </Stack>
            </Card>
        </Container>
    );
}

export default Daftar