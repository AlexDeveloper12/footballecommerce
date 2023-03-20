import React from 'react';
import ReactModal from 'react-modal';
import '../styles/CartModal.css';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
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
        width:'50%'
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
                                        console.log('inside map')
                                        console.log(value);
                                        return (
                                            <CartModalRow value={value} removeItem={removeItem} />
                                        )
                                    }
                                    )
                                }

                                <TableRow>
                                    <TableCell>
                                        Total:
                                        {calculateTotal()}
                                    </TableCell>
                                </TableRow>

                            </TableBody>
                        </CartModalTableContainer>

                        : <span style={{color:'black'}}>Your bag is empty</span>}

                <CloseButton toggle={toggleModal} />

            </ReactModal>
        );
    }
}

export default CartModal;
