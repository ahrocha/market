import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {formatPercentage, formatPrice} from '../utils/ContentFormat';

function TableItems({products, types}) {

    const getProductType = (type_id) => {
        if (!types.length) return;
        return types.find((type) => type.id === type_id);
      };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Price per unit</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total price</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Tax</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {products.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">{formatPrice(item.price)}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">{formatPrice(item.price * item.quantity)}</TableCell>
              <TableCell align="right">{getProductType(item.type_id)?.name}</TableCell>
              <TableCell align="right">{formatPercentage(getProductType(item.type_id)?.tax)}</TableCell>
            </TableRow>
            ))}
            </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableItems;
