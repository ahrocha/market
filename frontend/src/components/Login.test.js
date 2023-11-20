import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect'; // For additional matchers
import Login from './Login';
import { login as mockLogin } from '../services/LoginApi'; // Import the mock function

// Mock the LoginApi module
jest.mock('../services/LoginApi');

// Mock the useBasket context
jest.mock('../context/BasketContext', () => ({
  useBasket: jest.fn(() => ({ setToken: jest.fn() })),
}));

describe('Login Component', () => {
  test('renders login form and handles successful login', async () => {

    mockLogin.mockResolvedValueOnce({ token: 'mocked-token' });
    // Arrange
    render(<Login />);

    // Act
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    // Assert
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(screen.getByText('You are now logged in!')).toBeInTheDocument();
    });
  });

  test('handles login error and displays alert', async () => {
    // Arrange
    // Mock the login function to simulate an error
    mockLogin.mockRejectedValueOnce({ response: { data: { error: 'Invalid credentials' } } });

    render(<Login />);

    // Act
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'incorrectpassword' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    // Assert
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'incorrectpassword');
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });
});
