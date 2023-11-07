import React, {useEffect, useState} from 'react';

import { useBasket } from '../../context/BasketContext';

import TableItems from '../TableItems';

import TypesApi from '../../services/TypesApi';

function ListItems() {
    const { basketItems } = useBasket();
    const [types, setTypes] = useState([]);

    useEffect(() => {
      TypesApi.getTypes().then((types) => {
        setTypes(types);
    });
    }, []);

    return (
        <TableItems products={basketItems} types={types} />
    );

}

export default ListItems;
