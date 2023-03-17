import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import './App.css';
import FootballShirtCard from './components/FootballShirtCard';
import CartButton from './components/CartButton';
import CartModal from './components/CartModal';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  const [footballShirtData, setFootballShirtData] = useState([]);
  const [checkedState, setCheckedState] = useState(
    new Array(footballShirtData.length).fill(false),
  );

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartData, setCartData] = useState([]);

  const getTShirtsInCart = () => {
    const tempArray = [];
    for (let myIndex = 0; myIndex < localStorage.length; myIndex += 1) {
      const key = localStorage.key(myIndex);
      const item = JSON.parse(localStorage.getItem(key));
      console.log(item);
      tempArray.push(item);
    }
    setCartData(tempArray);
  };

  const handleOnChange = (position) => {
    console.log(position);
    // eslint-disable-next-line max-len
    const updatedCheckState = checkedState.map((item, index) => (index === position ? !item : item));
    setCheckedState(updatedCheckState);
  };

  useEffect(() => {
    axios.get('./footballtshirts.json')
      .then((response) => {
        setFootballShirtData(response.data);
      })
      .catch((error) => {
        console.log(`Error fetching football shirt data: ${error} `);
      });
  }, []);

  const addShirtToCart = (item, quantity) => {
    const {
      id, name, description, imageURLFrontCover, imageURLBackCover, price,
      numberAvailable,
    } = item;

    if (numberAvailable > quantity) {
      const newNumAvailable = numberAvailable - quantity;

      const shirtToAdd = JSON.stringify({
        id,
        name,
        description,
        imageURLFrontCover,
        imageURLBackCover,
        price,
        quantityChosen: quantity,
        numberAvailable: newNumAvailable,
      });

      localStorage.setItem(`shirtcartitem-${id}`, shirtToAdd);
    }
  };

  const toggleCartModal = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    if (localStorage.length > 0) {
      getTShirtsInCart();
    }
  }, []);

  return (
    <Grid container>
      {/* 
      <div style={{ display: 'flex', flexDirection: 'row' }}>
      <FormGroup>
        {
        teams.map((value, index) => (
          <FootballCheckBox
            label={value}
            handleOnChange={handleOnChange}
            index={index}
            checkedState={checkedState}
          />
        ))
      }
      </FormGroup>
      </div> */}

      <Grid item xs={6}>
        <CartButton
          toggleModal={toggleCartModal}
        />
      </Grid>

      {
        footballShirtData !== null ? footballShirtData.map((value) => (
          <Grid item xs={6}>
            <Item>
              <FootballShirtCard
                shirt={value}
                key={value.id}
                addShirt={addShirtToCart}
              />
            </Item>
          </Grid>
        ))

          : null
      }

      {
        isCartOpen
          ? (
            <CartModal
              isOpen={isCartOpen}
              toggleModal={toggleCartModal}
              cartData={cartData}
            />
          )

          : null
      }

    </Grid>
  );
}

export default App;
