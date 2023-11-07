import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import TypesApi from '../../services/TypesApi';
import ProductsApi from '../../services/ProductsApi';

import Product from './Product';

function Products() {
    const [products, setProducts] = useState([]);
    const [types, setTypes] = useState([]);

    const getProductType = (product) => {
        return types.find((type) => type.id === product.type_id);
    };

    useEffect(() => {
        ProductsApi.getProducts().then((products) => {
            setProducts(products);
        });
        TypesApi.getTypes().then((types) => {
            setTypes(types);
        });
    }, []);

    return (
        <Container>
            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Product key={product.id} product={product} type={getProductType(product)} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Products;
