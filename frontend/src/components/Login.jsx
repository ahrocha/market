import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { login } from '../services/LoginApi';
import {useBasket} from '../context/BasketContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const { setToken } = useBasket();
    const navigate = useNavigate(); // Initialize useHistory
    const [showForm, setShowForm] = useState(true);
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await login(formData.email, formData.password);
          setToken(response.token);
          setShowForm(false);
          navigate('/admin');
        } catch (error) {
          // Handle login error, e.g., display an error message
          console.error('Login error', error);
        }
      };

    return (
        <Container>
          {showForm && (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </form>)}
        </Container>
      );
}

export default Login;