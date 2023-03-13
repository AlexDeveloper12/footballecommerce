import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import './App.css'
import FootballShirtCard from './components/FootballShirtCard';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  
  const [footballShirtData, setFootballShirtData] = useState([]);

  useEffect(() => {
    axios.get('./footballtshirts.json')
      .then(response => {
        console.log(response.data);
        setFootballShirtData(response.data);
      })
      .catch(error => {
        console.log(`Error fetching football shirt data: ${error} `)
      })
  }, [])

  return (
    <Grid container>
      {
        footballShirtData.map((value, index) => {
          return (
            <Grid item xs={6}>
              <Item>
                <FootballShirtCard
                  shirt={value}
                />
              </Item>
            </Grid>
          )
        })
      }

    </Grid>
  )
}

export default App
