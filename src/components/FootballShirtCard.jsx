import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AddToCartButton from './AddToCartButton';

function FootballShirtCard({ shirt, addShirt }) {
  const { team, description, price, imageURLFrontCover, numberAvailable } = shirt;

  const [isValidationMessage, setIsValidationMessage] = useState(false);
  const [quantityChosen, setQuantityChosen] = useState(0);

  const handleMaxQuantity = (event) => {
    const { value } = event.target;

    if (value > numberAvailable) {
      setIsValidationMessage(true);
    } else {
      setIsValidationMessage(false);
      setQuantityChosen(value);
    }
  };

  return (
    <Card style={{ marginBottom: '30px'}}>
      <CardMedia
        component="img"
        sx={{ height: 370 }}
        image={imageURLFrontCover}
        title={team}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" />
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          £{price}
        </Typography>
        <TextField type="number" onBlur={(event) => handleMaxQuantity(event)} />
        <Typography variant="body2" color="text.secondary">
          Number of shirts available:
           {numberAvailable}
        </Typography>

        {
          isValidationMessage
            ? <span>Quantity cannot be greater than the shirts available</span>
            : null
        }
      </CardContent>
      <CardActions>
        <AddToCartButton shirt={shirt} addShirt={() => addShirt(shirt, quantityChosen)} />
      </CardActions>
    </Card>
  );
}
export default FootballShirtCard;
