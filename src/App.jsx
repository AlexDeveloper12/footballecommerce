import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { FormControlLabel, FormGroup, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import './App.css';
import FootballShirtCard from './components/FootballShirtCard';
import { teams } from './utils/Utils';
import FootballCheckBox from "./components/FootballCheckbox";
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
  const [filteredFootballShirtData, setFileredFootballShirtData] = useState([]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (localStorage.length > 0) {
      getTShirtsInCart();
    }
  }, []);

  const handleOnChange = (position) => {
    console.log(position);
    // eslint-disable-next-line max-len
    const updatedCheckState = checkedState.map((item, index) => (index === position ? !item : item));
    setCheckedState(updatedCheckState);
  };

  const updateTshirtQuantity = (tshirtID, quantity) => {
    const tshirt = JSON.parse(localStorage.getItem(tshirtID));
    tshirt["quantityChosen"] = quantity;
  }

  useEffect(() => {
    axios.get('./footballtshirts.json')
      .then((response) => {
        setFootballShirtData(response.data);
      })
      .catch((error) => {
        console.log(`Error fetching football shirt data: ${error} `);
      });
  }, [footballShirtData]);

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

  const getTShirtsInCart = () => {
    const tempArray = [];
    for (let myIndex = 0; myIndex < localStorage.length; myIndex++) {
      const key = localStorage.key(myIndex);
      const item = localStorage.getItem(key);
      tempArray.push(item);
      console.log(key);
      console.log(item);
    }

    setCartData(tempArray);
  };

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
