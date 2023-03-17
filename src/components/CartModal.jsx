import React from 'react';
import ReactModal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '500',
    },
};

ReactModal.setAppElement('#root');

function CartModal({ isOpen, toggleModal, cartData }) {
    if (cartData) {
        return (
            <ReactModal
                isOpen={isOpen}
                style={customStyles}
            >
                <table>
                    <thead>
                        <tr>
                            <th>
                                <span style={{ color: 'black' }}>Image</span>
                            </th>
                            <th>
                                <span style={{ color: 'black' }}> Name </span>
                            </th>
                            <th>
                                <span style={{ color: 'black' }}>Description</span>
                            </th>
                            <th>
                                <span style={{ color: 'black' }}>Price</span>

                            </th>
                            <th>
                                <span style={{ color: 'black' }}>Quantity</span>
                            </th>
                            <th>
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cartData.map((value) => {
                                return (
                                    <tr>
                                        <td><img src={value.imageURLFrontCover} /></td>
                                        <td><span style={{ color: 'black' }}>{value.name}</span></td>
                                        <td><span style={{ color: 'black' }}>{value.description}</span></td>
                                        <td><span style={{ color: 'black' }}>{value.price}</span></td>
                                        <td><span style={{ color: 'black' }}>{value.quantityChosen}</span></td>
                                        <td>Delete</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                    <div>
                        <button type="button" onClick={toggleModal}>Close</button>
                    </div>

                </table>
            </ReactModal>
        );
    }
}

export default CartModal;
