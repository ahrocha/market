import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckoutsApi from '../../services/CheckoutsApi';
import TableItems from '../TableItems';
import TypesApi from '../../services/TypesApi';
import Button from '@mui/material/Button';
import {formatDateAndTime, formatPrice} from '../../utils/ContentFormat';

function CheckoutList() {

    const [checkouts, setCheckouts] = useState([]);

    const [types, setTypes] = useState([]);
    const fetchCheckouts = async () => {
        const response = await CheckoutsApi.getCheckouts();
        setCheckouts(response);
    };

    const convertStringToJson = (string) => {
        if (!string) return [];
        return JSON.parse(string);
    }

    const handleDelete = (checkout) => async () => {
        await CheckoutsApi.deleteCheckout(checkout.id);
        fetchCheckouts();
    }

    useEffect(() => {
        TypesApi.getTypes().then((types) => {
            setTypes(types);
        });
    fetchCheckouts();
    }, []);
    
    if (!checkouts.length || !types.length) {
        return (<div>Loading...</div>)
    };

    return (
        <Container>
            <h1>CheckoutList</h1>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Total price</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {checkouts.map((checkout) => (
                <>
            <TableRow
              key={`checkout-${checkout.id}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              style={{ verticalAlign: 'top' }}
            >
              <TableCell component="td" scope="row">
                {checkout.name}</TableCell>
              <TableCell align="right">{checkout.email}</TableCell>
              <TableCell align="right">{checkout.address}</TableCell>
              <TableCell align="right">{formatDateAndTime(checkout.created)}</TableCell>
              <TableCell align="right">{formatPrice(checkout.total_price)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5}>
                <Button variant="outlined" onClick={handleDelete(checkout)}>Delete</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" colSpan={5}>
                <TableItems products={convertStringToJson(checkout.extra_info)} types={types} />
              </TableCell>
            </TableRow>
            </>
            ))}
            </TableBody>
            </Table>
            </TableContainer>

        </Container>
    );
}

export default CheckoutList;
