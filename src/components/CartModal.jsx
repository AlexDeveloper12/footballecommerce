import React from 'react';
import ReactModal from 'react-modal';
import '../styles/CartModal.css';
import { Button, TableBody, TableCell, TableRow } from '@mui/material';
import CartModalHeader from './CartModalHeader';
import CartModalTableContainer from './Containers/CartModalTableContainer';
import CartModalRow from './CartModalRow';
import CloseButton from './Custom/CloseButton';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '60%',
    width: '65%',
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
                {
                    cartData.length > 0 ?
                        <CartModalTableContainer>
                            <CartModalHeader />
                            <TableBody>
                                {
                                    cartData.map((value) => {
                                        return (
                                            <CartModalRow key={value.id} value={value} removeItem={removeItem} />
                                        )
                                    }
                                    )
                                }

                                <TableRow>
                                    <TableCell align="right" colSpan={6}>
                                        Total:
                                        {calculateTotal()}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right" colSpan={6}>
                                        <Button variant="contained" color="error" onClick={()=> removeItem()}>Remove all</Button></TableCell>
                                </TableRow>

                            </TableBody>
                        </CartModalTableContainer>

                        : <span style={{ color: 'black' }}>Your cart is empty</span>}

                <CloseButton toggle={toggleModal} />

            </ReactModal>
        );
  }
}

export default CartModal;
