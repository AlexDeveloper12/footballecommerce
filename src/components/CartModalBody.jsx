import React, { useState } from 'react';
import { TableCell, TableRow , TableBody} from '@mui/material';
import CartModalRow from './CartModalRow';

function CartModalBody({ removeItem, cartData }) {

    const [customQuantity, setCustomQuanity] = useState(0);

    const handleQuantityChange = (tshirt) => {
        var tempCartData = [...cartData]
        const tShirtKey = localStorage.key(tshirt);
        const tShirtItem = localStorage.getItem(tShirtKey);
        console.log(`key: ${tShirtKey} - Item: ${tShirtItem}`);

    }

    const calculateTotal = () => {
        const tempCartData = [...cartData];

        // eslint-disable-next-line max-len
        const reduceCartData = parseFloat(tempCartData.reduce((total, item) => total + (parseFloat(item.price) * parseFloat(item.quantityChosen)), 0)).toFixed(2);

        return `£${reduceCartData}`;
    };

    return (
        <TableBody>
        {
            cartData.map((value) => (
                <CartModalRow
                    value={value}
                    removeItem={removeItem}
                />
            ))
        }

        <TableRow>
            <TableCell>
                Total:
                {calculateTotal()}
            </TableCell>
        </TableRow>

    </TableBody>
    )

}

export default CartModalBody;
