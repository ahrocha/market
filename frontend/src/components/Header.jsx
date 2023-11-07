import React from "react";

import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import TotalPrice from "./Basket/TotalPrice";
import { useBasket } from '../context/BasketContext';

function Header() {
    const { getTotalPrice } = useBasket();
    return (
    <header className="App-header">
        <h1>Menu</h1>
        <AppBar position="static">
      <Toolbar>
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>
        <Button component={Link} to="/products" color="inherit">
          Products
        </Button>
        <Button component={Link} to="/basket" color="inherit">
          Basket (<TotalPrice />)
        </Button>
        <Button component={Link} to="/checkout" color="inherit" disabled={getTotalPrice() < 1}>
            Go to checkout
        </Button>
        <Button component={Link} to="/login" color="inherit">
            Login
        </Button>
      </Toolbar>
    </AppBar>
    </header>
    )
}

export default Header;
