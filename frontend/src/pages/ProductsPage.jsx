import React from 'react';
import Container from '@mui/material/Container';    
import Products from '../components/Products';

function ProductsPage() {
    return (
        <Container>
        <h1>Products</h1>
            <Products />
        </Container>
    );
}

export default ProductsPage;