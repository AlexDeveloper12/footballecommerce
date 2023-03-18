import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Grid, FormGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import './App.css';
import FootballShirtCard from './components/FootballShirtCard';
import CartButton from './components/CartButton';
import CartModal from './components/CartModal';
import AddToCartAlert from './components/Alerts/AddToCartAlert';
import ValidationMessage from './components/Alerts/ValidationMessage';
import { teams } from './utils/Utils';
import FootballCheckBox from './components/FootballCheckbox';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  const [footballShirtData, setFootballShirtData] = useState([]);
  const [filteredFootballShirtData, setFilteredFootballShirtData] = useState([]);
  const [checkedState, setCheckedState] = useState(
    new Array(footballShirtData.length).fill(false),
  );

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [isAddedAlertOpen, setIsAddedAlertOpen] = useState(false);
  const [isValidationMessage, setValidationMessage] = useState(false);

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

  const handleTShirtFilter = (team) => {
    const tempTShirtsArray = [...filteredFootballShirtData];

    const filteredArray = tempTShirtsArray.filter((value) => value.team === team);

    console.log(team);

    setFilteredFootballShirtData(filteredArray);
  };

  const removeFromCart = (tshirt) => {
    const tshirtKey = localStorage.key(tshirt);

    localStorage.removeItem(tshirtKey);
    getTShirtsInCart();
  };

  useEffect(() => {
    axios.get('./footballtshirts.json')
      .then((response) => {
        setFootballShirtData(response.data);
        setFilteredFootballShirtData(response.data);
      })
      .catch((error) => {
        console.log(`Error fetching football shirt data: ${error} `);
      });
  }, []);

  const addShirtToCart = (item, quantity) => {
    const {
      id, team, description, imageURLFrontCover, imageURLBackCover, price,
      numberAvailable,
    } = item;

    if (quantity === 0) {
      setValidationMessage(true);
    } else if (numberAvailable > quantity) {
      const newNumAvailable = numberAvailable - quantity;

      const shirtToAdd = JSON.stringify({
        id,
        team,
        description,
        imageURLFrontCover,
        imageURLBackCover,
        price,
        quantityChosen: quantity,
        numberAvailable: newNumAvailable,
      });

      localStorage.setItem(`shirtcartitem-${id}`, shirtToAdd);
      setIsAddedAlertOpen(true);
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
      <Grid item>
        <FormGroup
          sx={{
            position: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
          }}
        >
          {
            teams.map((value, index) => (
              <FootballCheckBox
                label={value}
                handleOnChange={handleTShirtFilter}
                index={index}
                checkedState={checkedState}
              />
            ))
          }
        </FormGroup>
      </Grid>

      {
        isAddedAlertOpen ? (
          <AddToCartAlert />
        )
          : null
      }

      {
        isValidationMessage ? (
          <ValidationMessage headerText="Warning" text="Please enter a valid quantity" />
        )
          : null
      }

      <Grid container spacing={2}>
        <Grid item>
          <CartButton
            toggleModal={toggleCartModal}
          />
        </Grid>

      </Grid>

      {
        filteredFootballShirtData !== null ? filteredFootballShirtData.map((value) => (
          <Grid item xs={4}>
            <Item style={{ marginTop: '20px' }}>
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
              removeItem={removeFromCart}
            />
          )

          : null
      }

    </Grid >
  );
}

export default App;
