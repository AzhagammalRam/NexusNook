import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select'; // Keep Select from here
import type { SelectChangeEvent } from '@mui/material'; 
import Checkbox from '@mui/material/Checkbox';


const ITEM_HEIGHT = 38;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface MultiSelectFilterProps {
  label: string; 
  options: string[]; 
  selectedValues: string[]; 
  onChange: (selected: string[]) => void; 
  width?: number; 
}

const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({
  label,
  options,
  selectedValues,
  onChange,
  width = 300, // Default width
}) => {
  const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
    const {
      target: { value },
    } = event;
    // On autofill we get a stringified value.
    const newSelectedValues = typeof value === 'string' ? value.split(',') : value;
    onChange(newSelectedValues); // Pass the updated values to the parent
  };

  return (
    <FormControl sx={{ m: 1, width: width }} size="small">
      <InputLabel id={`multi-select-label-${label}`}>{label}</InputLabel>
      <Select
        labelId={`multi-select-label-${label}`}
        id={`multi-select-${label}`}
        multiple
        value={selectedValues}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={selectedValues.includes(option)} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectFilter;