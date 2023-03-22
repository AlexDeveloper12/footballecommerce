import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import './App.css';
import FootballShirtCard from './components/FootballShirtCard';
import CartModal from './components/CartModal';
import AddToCartAlert from './components/Alerts/AddToCartAlert';
import ValidationMessage from './components/Alerts/ValidationMessage';
import SearchTeam from './components/SearchTeam';
import HeaderContainer from './components/Containers/HeaderContainer';
import SearchContainer from './components/Containers/SearchContainer';
import Loading from './components/ClipLoader/Loading';

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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [isAddedAlertOpen, setIsAddedAlertOpen] = useState(false);
  const [isValidationMessage, setValidationMessage] = useState(false);
  const [validationText, setValidationText] = useState({
    headerText: '', valueText: '',
  });
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getTShirtsInCart = () => {
    const tempArray = [];
    for (let myIndex = 0; myIndex < localStorage.length; myIndex += 1) {
      const key = localStorage.key(myIndex);
      const item = JSON.parse(localStorage.getItem(key));
      tempArray.push(item);
    }
    setCartData(tempArray);
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;

    const tempShirtData = [...footballShirtData];

    // eslint-disable-next-line max-len
    let results = filteredFootballShirtData.filter((tshirt) => tshirt.team.toLowerCase().includes(value.toLowerCase()));

    if (value === '') {
      results = tempShirtData;
    }

    setSearchValue(value);
    setFilteredFootballShirtData(results);

    console.log(results);
  };

  const removeFromCart = (tshirt, action) => {
    switch (action) {
      case 'remove':
        const tshirtItem = localStorage.getItem(`shirtcartitem-${tshirt.id}`);
        if (tshirtItem !== null) {
          localStorage.removeItem(`shirtcartitem-${tshirt.id}`);
        }
        break;
      default:
        localStorage.clear();
        break;
    }
    getTShirtsInCart();
  };

  useEffect(() => {
    axios.get('./footballtshirts.json')
      .then((response) => {
        setFootballShirtData(response.data);
        setFilteredFootballShirtData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(`Error fetching football shirt data: ${error} `);
      });
  }, []);

  const addShirtToCart = (item, quantity) => {

    console.log('addShirtToCart');
    console.log(item.id);
    

    const shirtIndex = footballShirtData.findIndex((e)=>e.id===item.id);
    console.log(shirtIndex);

    if(shirtIndex){
      //t shirts initially aren't in local storage they are just in file
    }


    const {
      id, team, description, imageURLFrontCover, imageURLBackCover, price,
      numberAvailable,
    } = item;

    const tshirtItem = localStorage.getItem(`shirtcartitem-${id}`);

    if (tshirtItem) {
      setValidationMessage(true);
      setValidationText({ headerText: 'Warning', valueText: 'You have already added this tshirt to your cart' });
    }

    if (quantity === 0) {
      setValidationMessage(true);
      setValidationText({ headerText: 'Warning', valueText: 'Please enter a valid quantity' });
    } else if (numberAvailable > quantity) {
      const newNumAvailable = numberAvailable - quantity;

      const shirtToAdd = {
        id,
        team,
        description,
        imageURLFrontCover,
        imageURLBackCover,
        price,
        quantityChosen: quantity,
        numberAvailable: newNumAvailable,
      };

      localStorage.setItem(`shirtcartitem-${id}`, JSON.stringify(shirtToAdd));
      setIsAddedAlertOpen(true);
    }
  };

  const toggleCartModal = () => {
    if (!isCartOpen) {
      getTShirtsInCart();
    }
    setIsCartOpen(!isCartOpen);
  };

  const toggleAlert = (alertType) => {
    switch (alertType) {
      case 'addcart':
        setIsAddedAlertOpen(!isAddedAlertOpen);
        break;
      case 'validation':
        setValidationMessage(!isValidationMessage);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (localStorage.length > 0) {
      getTShirtsInCart();
    }
  }, []);

  if (isLoading) {
    return (
      <Loading
        loading={isLoading}
      />
    );
  }

  return (
    <Grid container>

      <HeaderContainer toggleCartModal={toggleCartModal} />

      <SearchContainer>
        <SearchTeam
          text={searchValue}
          onTextChange={handleSearchChange}
        />
      </SearchContainer>

      <Grid container>

        {
          isAddedAlertOpen ? (
            <AddToCartAlert toggleAlert={toggleAlert} />
          )
            : null
        }

        {
          isValidationMessage ? (
            <ValidationMessage
              headerText={validationText.headerText}
              text={validationText.valueText}
              toggleAlert={toggleAlert}
            />
          )
            : null
        }
      </Grid>

      {
        filteredFootballShirtData !== null ? filteredFootballShirtData.map((value) => (
          <Grid item xs={4} key={value.id}>
            <Item style={{ marginTop: '20px', marginRight: '30px' }}>
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

    </Grid>
  );
}

export default App;
