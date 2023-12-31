import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useBasket } from '../../context/BasketContext';
import {formatPercentage, formatPrice} from '../../utils/ContentFormat';

function Product({product, type}) {
  const { basketItems, updateBasket } = useBasket();

  const addToBasketHandler = () => {
    const itemInList = basketItems?.find((i) => i.id === product.id);
    if (itemInList) {
      itemInList.quantity += 1;
    } else {
      let newBasketItems = [];
      if (basketItems !== undefined) {
        newBasketItems = basketItems;
      }
      newBasketItems?.push({ ...product, quantity: 1 });
    }
    updateBasket(basketItems);
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardMedia
        component="img"
        maxHeight="200px"
        image={product.image ?? '/assets/images/placeholder.png'}
        alt={product.name}
        style={{ objectFit: 'contain', width: '100%', height: '200px' }} 
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {type?.type} - tax: {formatPercentage(type?.tax)}
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

export default Product;
