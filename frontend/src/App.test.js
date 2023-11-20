import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

test('renders home page', () => {
  render(<App />);
  const pageTitle = screen.getByRole('heading', { name: /Homepage/i });
  expect(pageTitle.tagName).toBe('H1');
});

test('renders navigation links in the header', () => {
  render(<App />);

  const homeLink = screen.getByRole('link', { name: /home/i });
  const productsLink = screen.getByRole('link', { name: /products/i });
  const basketLink = screen.getByRole('link', { name: /basket/i });
  const checkoutLink = screen.getByRole('link', { name: /go to checkout/i });
  const loginLink = screen.getByRole('link', { name: /login/i });

  expect(homeLink).toHaveAttribute('href', '/');
  expect(productsLink).toHaveAttribute('href', '/products');
  expect(basketLink).toHaveAttribute('href', '/basket');
  expect(checkoutLink).toHaveAttribute('href', '/checkout');
  expect(loginLink).toHaveAttribute('href', '/login');
});
