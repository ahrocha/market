import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useBasket } from '../../context/BasketContext';
import {formatPercentage, formatPrice} from '../../utils/ContentFormat';

function Product({product, type}) {
  const { basketItems, updateBasket } = useBasket();

  const addToBasketHandler = () => {
    const itemInList = basketItems.find((i) => i.id === product.id);
    if (itemInList) {
      itemInList.quantity += 1;
    } else {
        basketItems.push({ ...product, quantity: 1 });
    }
    updateBasket(basketItems);
  }

  return (
      
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {type?.name} - tax: {formatPercentage(type?.tax)}
        </Typography>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2">
          Price: {formatPrice(product.price)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={addToBasketHandler} >Add to basket</Button>
      </CardActions>
    </Card>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  type: PropTypes.shape({
    name: PropTypes.string.isRequired,
    tax: PropTypes.number.isRequired,
  }).isRequired,
};
export default Product;