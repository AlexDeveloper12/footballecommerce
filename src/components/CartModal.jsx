import React from 'react';
import {
  Box, Modal, Typography, Button,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function CartModal({isOpen, toggleModal, cartData}) {
    return (
        <Modal
            open={isOpen}
            onClose={toggleModal}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" color="black">
                    Cart
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} color="black" >
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
                <Button variant="contained" fullWidth onClick={toggleModal}>
                    Close
                </Button>
            </Box>

        </Modal>
    );

}

export default CartModal;
