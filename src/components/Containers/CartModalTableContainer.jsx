import React from 'react';
import { Table, TableContainer, Paper } from '@mui/material';

function CartModalTableContainer({ children }) {
  return (
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            {children}
          </Table>
      </TableContainer>
    );
}

export default CartModalTableContainer;
