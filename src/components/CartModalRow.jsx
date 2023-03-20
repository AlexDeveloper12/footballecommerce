import React, { useState } from 'react';
import { TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function CartModalRow({ value, removeItem }) {
    const [updatedQuantity, setUpdatedQuantity] = useState(value.quantityChosen);

    const handleQuantityUpdate = (action) => {
        switch (action) {
            case 'increase':
                setUpdatedQuantity((prevState) => prevState += 1)
                break;
            case 'decrease':
                setUpdatedQuantity((prevState) => prevState -= 1)
                break;
            default:
                break;
        }
        //if quantity is 0 then run the remove item function

    };

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                <img src={value.imageURLFrontCover} height={200} width={200} />
            </TableCell>
            <TableCell component="th" scope="row" >{value.team}</TableCell>
            <TableCell component="th" scope="row">{value.description}</TableCell>
            <TableCell component="th" scope="row"> <button onClick={() => handleQuantityUpdate('increase')} >-</button> {updatedQuantity}<button onClick={() => handleQuantityUpdate('decrease')}>+</button></TableCell>
            <TableCell component="th" scope="row">£{value.price}</TableCell>
            <TableCell component="th" scope="row" align="right" ><DeleteIcon onClick={() => removeItem(value)} /></TableCell>
        </TableRow>
    )

}

export default CartModalRow;
