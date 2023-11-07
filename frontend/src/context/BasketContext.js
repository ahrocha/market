import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  basketItems: [],
  token: null,
};

const BasketContext = createContext();

const basketReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_BASKET':
      return { ...state, basketItems: action.payload };
    case 'UPDATE_TOKEN':
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

export const BasketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(basketReducer, initialState);

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

export const useBasket = () => {
  return useContext(BasketContext);
};
