import React, { createContext, useContext, useReducer } from 'react';

// Initial state for the context
const initialState = {
  basketItems: [],
  token: null,
};

// Define the context
const BasketContext = createContext();

// Define a reducer function to manage state updates
const basketReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_BASKET':
      return { basketItems: action.payload };
    case 'UPDATE_TOKEN':
      return { token: action.payload };
    default:
      return state;
  }
};

// Create a provider component
export const BasketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(basketReducer, initialState);

  // Function to update the basket in localStorage and notify components
  const updateBasket = (newBasket) => {
    localStorage.setItem('list', JSON.stringify(newBasket));
    dispatch({ type: 'UPDATE_BASKET', payload: newBasket });
  };

  const clearBasket = () => {
    localStorage.removeItem('list');
    dispatch({ type: 'UPDATE_BASKET', payload: [] });
  };

  const getTotalPrice = () => {
    let total = 0;
    state.basketItems?.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  const setToken = (token) => {
    localStorage.setItem('token', token);
    dispatch({ type: 'UPDATE_TOKEN', payload: token });
  }

  return (
    <BasketContext.Provider value={{ basketItems: state.basketItems, updateBasket, clearBasket, getTotalPrice, setToken, token: state.token }}>
      {children}
    </BasketContext.Provider>
  );
};

// Custom hook to access the context
export const useBasket = () => {
  return useContext(BasketContext);
};
