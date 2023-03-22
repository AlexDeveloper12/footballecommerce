import React, { useState, useEffect } from 'react';
import { TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function CartModalRow({ value, removeItem, calculateCartTotal }) {
    const [updatedQuantity, setUpdatedQuantity] = useState();

    useEffect(()=>{
        setUpdatedQuantity(Number(value.quantityChosen))
    },[]);

    const handleQuantityUpdate = (action) => {
        switch (action) {
            case 'increase':
                setUpdatedQuantity(updatedQuantity + 1);
                break;
            case 'decrease':
                setUpdatedQuantity(updatedQuantity - 1);
                break;
            default:
                break;
        }

        calculateCartTotal();


        value['quantityChosen'] = updatedQuantity;

        //localStorage.setItem(`shirtcartitem-${value.id}`, JSON.stringify(value));

        console.log(updatedQuantity);

        if (updatedQuantity === 0) {
            removeItem(value, 'remove');
        }

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
            <TableCell component="th" scope="row"> <button onClick={() => handleQuantityUpdate('decrease')} >-</button> {updatedQuantity}<button onClick={() => handleQuantityUpdate('increase')}>+</button></TableCell>
            <TableCell component="th" scope="row">£{value.price}</TableCell>
            <TableCell component="th" scope="row" align="right" ><DeleteIcon onClick={() => removeItem(value, "remove")} /></TableCell>
        </TableRow>
    );

}

export default CartModalRow;
