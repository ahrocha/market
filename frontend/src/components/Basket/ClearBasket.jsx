import React from 'react';
import { Button } from '@mui/material';
import { useBasket } from '../../context/BasketContext';

function ClearBasket() {
    
    const { clearBasket } = useBasket();

    const handleClick = () => {
        clearBasket();
    }
    
    return (
        <Button onClick={handleClick}>Clear basket</Button>
    );
}

export default ClearBasket;
