import * as React from 'react';
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  Box,
  Collapse,
  Button,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

export interface RadioToggleOption {
  value: string;
  label: string;
}

interface RadioToggleProps {
  label: string;
  options: RadioToggleOption[];
  selectedValue: string | null;
  // Ensure onChange expects a string, matching option.value type
  onChange: (newValue: string) => void;
  row?: boolean;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

const RadioToggle: React.FC<RadioToggleProps> = ({
  label,
  options,
  selectedValue,
  onChange,
  row = true,
  collapsible = false,
  defaultExpanded = true,
}) => {
  const [expanded, setExpanded] = React.useState(defaultExpanded);

  const handleToggleCollapse = () => {
    setExpanded(!expanded);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value); // This already correctly passes the string value
  };

  return (
    <Box sx={{ mb: 2 ,borderBottom: '1px solid #c5cbda'}}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle1" component="legend">
          {label}
        </Typography>
        {collapsible && (
          <Button
            onClick={handleToggleCollapse}
            size="small"
            endIcon={expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            sx={{ ml: 'auto' }}
          >
           
          </Button>
        )}
      </Box>
      <Collapse in={expanded}>
        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            row={row}
            aria-label={label.toLowerCase().replace(/\s/g, '-')}
            name={`${label.toLowerCase().replace(/\s/g, '-')}-group`}
            value={selectedValue}
            onChange={handleChange}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Collapse>
    </Box>
  );
};

export default RadioToggle;