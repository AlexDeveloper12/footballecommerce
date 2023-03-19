import React from 'react';
import ReactModal from 'react-modal';
import '../styles/CartModal.css';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import CartModalHeader from './CartModalHeader';
import CartModalTableContainer from './Containers/CartModalTableContainer';
import CloseButton from './Custom/CloseButton';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '90%',
  },
};

ReactModal.setAppElement('#root');

function CartModal({ isOpen, toggleModal, cartData, removeItem }) {
    const calculateTotal = () => {
        const tempCartData = [...cartData];

        // eslint-disable-next-line max-len
        const reduceCartData = parseFloat(tempCartData.reduce((total, item) => total + (parseFloat(item.price) * parseFloat(item.quantityChosen)), 0)).toFixed(2);

        return `£${reduceCartData}`;
    };

    if (cartData) {
        return (
            <ReactModal
                isOpen={isOpen}
                style={customStyles}
            >

                <CartModalTableContainer>
                    <CartModalHeader />
                    <TableBody>
                        {
                            cartData.map((value) => (

                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <img src={value.imageURLFrontCover} height={200} width={200} />
                                    </TableCell>
                                    <TableCell component="th" scope="row" >{value.team}</TableCell>
                                    <TableCell component="th" scope="row">{value.description}</TableCell>
                                    <TableCell component="th" scope="row"> <button onClick={() => handleQuantityChange(value)} >-</button> {value.quantityChosen}<button onClick={() => handleQuantityChange(value)}>+</button></TableCell>
                                    <TableCell component="th" scope="row">£{value.price}</TableCell>
                                    <TableCell component="th" scope="row" align="right" ><DeleteIcon onClick={() => removeItem(value)} /></TableCell>
                                </TableRow>

                            ))
                        }

                        <TableRow>
                            <TableCell>
                                Total:
                                {calculateTotal()}
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </CartModalTableContainer>

                <CloseButton toggle={toggleModal} />

            </ReactModal>
        );
    }
}

export default CartModal;
