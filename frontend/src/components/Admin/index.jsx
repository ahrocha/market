import React from 'react';
import Container from '@mui/material/Container';
import CheckoutList from './CheckoutList';

function Admin() {
    return (
        <Container>
            <h1>Admin</h1>
            <CheckoutList />
        </Container>
    );
}

export default Admin;