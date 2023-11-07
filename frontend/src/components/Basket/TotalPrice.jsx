import React from 'react';
import { useBasket } from '../../context/BasketContext';
import { formatPrice } from '../../utils/ContentFormat';

function TotalPrice() {
    
    const { getTotalPrice } = useBasket();
    return (
            <p>{formatPrice(getTotalPrice())}</p>
    );
}

export default TotalPrice;
