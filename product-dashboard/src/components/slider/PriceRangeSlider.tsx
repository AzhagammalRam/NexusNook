import * as React from 'react';
import Box from '@mui/material/Box';
import MuiSlider from '@mui/material/Slider'; // Renamed the Material-UI Slider import
import Typography from '@mui/material/Typography';

// Helper function for the value label (optional, but good for context)
function valueLabelFormat(value: number) {
  return `$${value}`; // Format as currency
}

interface PriceRangeSliderProps { // Renamed interface to match component name
  label?: string; // Optional label for the slider (e.g., "Price Range")
  min: number; // The minimum possible value for the slider
  max: number; // The maximum possible value for the slider
  value: number[]; // The current selected range [min, max]
  onChange: (newValue: number[]) => void; // Callback to send updated range to parent
  step?: number; // Optional step value for the slider
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({ // Renamed your custom component
  label = "Price Range", // Default label
  min,
  max,
  value,
  onChange,
  step = 1, // Default step
}) => {

  const handleChange = (event: Event, newValue: number | number[]) => {
    onChange(newValue as number[]); // Cast to number[] as it's a range slider
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 300,p: 2,justifySelf: 'center'}}>
      <Typography id="range-slider" gutterBottom>
        {label}
      </Typography>
      <MuiSlider // Use the renamed Material-UI Slider here
        getAriaLabel={() => label}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valueLabelFormat}
        min={min} // Dynamic min
        max={max} // Dynamic max
        step={step} // Dynamic step
        disableSwap // Prevents thumb overlap
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2">{valueLabelFormat(value[0])}</Typography>
        <Typography variant="body2">{valueLabelFormat(value[1])}</Typography>
      </Box>
    </Box>
  );
};

export default PriceRangeSlider; // Export the new component name