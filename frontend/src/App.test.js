import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

test('renders home page', () => {
  render(<App />);
  const pageTitle = screen.getByText(/Homepage/i);
  expect(pageTitle).toBeInTheDocument();
});
