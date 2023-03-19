import React from 'react';
import { TextField } from '@mui/material';

function SearchTeam({text, onTextChange}) {
    return(
        <TextField 
            value={text} 
            onChange={(e)=>onTextChange(e)} 
            placeholder="Search for team" 
            style={{width:'200px'}}
        />
    )
}

export default SearchTeam;
