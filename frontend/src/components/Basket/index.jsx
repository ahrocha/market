import React from 'react';
import Container from '@mui/material/Container';
import ClearBasket from './ClearBasket';
import ListItems from './ListItems';

function Basket() {

    return (
        <Container>
        <ClearBasket />
        <ListItems />
        </Container>
    );
}

export default Basket;
