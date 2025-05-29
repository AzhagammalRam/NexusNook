import React from 'react';
import './FilterTags.css';
import ClearIcon from '@mui/icons-material/Clear';

const FilterTags: React.FC = () => {
  return (
    <div className="d-flex flex-wrap">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="me-2 mb-3">
          <div className="filter-tags d-flex justify-content-between align-items-center border">
            <span className='me-2'>Furniture</span>
            <ClearIcon style={{ fontSize: '13px' }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterTags;
