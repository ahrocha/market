import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { login } from '../services/LoginApi';
import {useBasket} from '../context/BasketContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function Login() {
    const { setToken } = useBasket();
    const [showForm, setShowForm] = useState(true);

    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema,
      onSubmit: (values) => {
        console.log(values);
        login(values.email, values.password).then((response) => {
          setToken(response.token);
          setShowForm(false);
        }).catch((error) => {
          console.error('Login error', error);
          alert(error.response.data.error);
        });
      },
    });

    if (!showForm) {
      return (
        <Container>
          <p>You are now logged in!</p>
        </Container>
      );
    }

    return (
        <Container>
          {showForm && (
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </form>)}
        </Container>
      );
}

export default Login;