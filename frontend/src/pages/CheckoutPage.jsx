import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Spacer from '@mui/material/Box';
import Container from '@mui/material/Container';
import CheckoutsApi from '../services/CheckoutsApi';
import { useBasket } from '../context/BasketContext';

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    city: Yup.string().required('City is required'),
    address: Yup.string().required('Address is required'),
    zip: Yup.string().required('ZIP Code is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
  });

  function CheckoutPage() {
    const { basketItems, clearBasket, getTotalPrice } = useBasket();

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const placeOrder = async (values) => {
      try {
        await CheckoutsApi.createCheckout(values);
        clearBasket();
        setShowSuccessMessage(true);
      } catch (error) {
        console.error('Checkout error', error);
      }

    }

    const formik = useFormik({
      initialValues: {
        name: '',
        email: '',
        phone: '',
        city: '',
        address: '',
        zip: '',
        state: '',
        country: '',
      },
      validationSchema,
      onSubmit: (values) => {
        values.basketItems = basketItems;
        values.totalPrice = getTotalPrice();
        placeOrder(values);
      },
    });
  
    return (
        <Container>
        <h1>Checkout</h1>
        { showSuccessMessage ? (
          <div>
            <h2>Thank you for your order!</h2>
            <p>We will contact you as soon as possible.</p>
          </div>
        ) : (
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={4}>
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
            </Grid>
            <Grid item xs={4}>
                <TextField
                label="Phone"
                name="phone"
                fullWidth
                variant="outlined"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                label="City"
                name="city"
                fullWidth
                variant="outlined"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                label="Address"
                name="address"
                fullWidth
                variant="outlined"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                label="ZIP Code"
                name="zip"
                fullWidth
                variant="outlined"
                value={formik.values.zip}
                onChange={formik.handleChange}
                error={formik.touched.zip && Boolean(formik.errors.zip)}
                helperText={formik.touched.zip && formik.errors.zip}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                label="State"
                name="state"
                fullWidth
                variant="outlined"
                value={formik.values.state}
                onChange={formik.handleChange}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                label="Country"
                name="country"
                fullWidth
                variant="outlined"
                value={formik.values.country}
                onChange={formik.handleChange}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
                />
            </Grid>
          </Grid>
          <Spacer mt={4} />
          <Button type="submit" variant="contained" color="primary" mt={4}>
            Submit
          </Button>
        </form>
        )}
      </Container>
    );
  }
  
export default CheckoutPage;
