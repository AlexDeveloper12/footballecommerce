import React, {useState} from 'react';
import ReactModal from 'react-modal';
import '../styles/CartModal.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

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

    const [customQuantity, setCustomQuanity] = useState(cartData.quantityChosen);

    const calculateTotal = () => {
        const tempCartData = [...cartData];

    // eslint-disable-next-line max-len
    const reduceCartData = parseFloat(tempCartData.reduce((total, item) => total + (parseFloat(item.price) * parseFloat(item.quantityChosen)), 0)).toFixed(2);

    return `£${reduceCartData}`;
    };

    const handleQuantityChange = (tshirt) =>{
        //get local storage item from the items id and then update the quantity chosen from there
        var tempCartData = [...cartData]
        const tShirtKey = localStorage.key(tshirt);
        const tShirtItem = localStorage.getItem(tShirtKey);
        console.log(`key: ${tShirtKey} - Item: ${tShirtItem}`);

        //update cart data and local storage
    }



    if (cartData) {
        return (
            <ReactModal
                isOpen={isOpen}
                style={customStyles}
            >

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell align="center">Team</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Remove</TableCell>
                            </TableRow>
                        </TableHead>
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
                                        <TableCell component="th" scope="row"> <button onClick={()=>handleQuantityChange(value)} >-</button> {value.quantityChosen}<button onClick={()=>handleQuantityChange(value)}>+</button></TableCell>
                                        <TableCell component="th" scope="row">£{value.price}</TableCell>
                                        <TableCell component="th" scope="row" ><DeleteIcon onClick={()=>removeItem(value)} /></TableCell>
                                    </TableRow>
                                ))
                            }

                            <TableRow>
                                <TableCell>Total: {calculateTotal()}</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ textAlign: 'center', marginTop: 100 }}>
                    <Button variant="contained" onClick={toggleModal}>Close</Button>
                </div>

            </ReactModal>
    );
  }
}

export default CartModal;
