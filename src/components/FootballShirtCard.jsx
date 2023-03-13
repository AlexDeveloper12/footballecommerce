import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AddToCartButton from './AddToCartButton';

function FootballShirtCard({ shirt }) {

    const { team, description, price, imageURLFrontCover } = shirt;

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                sx={{ height: 140 }}
                image={imageURLFrontCover}
                title={team}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">

                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {price}
                </Typography>

            </CardContent>
            <CardActions>
                <AddToCartButton />
            </CardActions>
        </Card>
    )
}
export default FootballShirtCard;