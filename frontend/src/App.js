import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BasketProvider } from './context/BasketContext'; // Import the BasketProvider

import './App.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import BasketPage from './pages/BasketPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';

function App() {

  return (
    <BasketProvider>
    <Router>
    <div className="App">
      <Header />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
    </Router>
    </BasketProvider>
  );
}

export default App;
