import React from 'react';
import { FormControlLabel, Checkbox, Typography } from '@mui/material';

function FootballCheckbox({
  label, handleOnChange, index, checkedState,
}) {
  return (
      <FormControlLabel
            control={<Checkbox
                onChange={(e) => handleOnChange(e)}
                value={label}
                checked={checkedState[index]}
            />}
            label={<Typography color="black" >{label}</Typography>}
      />
  );
}

export default FootballCheckbox;
