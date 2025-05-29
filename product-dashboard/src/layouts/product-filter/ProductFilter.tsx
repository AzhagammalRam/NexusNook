import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material'; // Ensure this type is importe
import MultiSelectFilter from '../../components/filter/MultiSelectFilter';
import PriceRangeSlider from '../../components/slider/PriceRangeSlider';
import RadioToggle from '../../components/toggle/RadioToggle'; // Only need RadioToggle here

export interface Product {
 id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface FilterOptions {
  category: string | 'All';
  priceRange: [number | null, number | null]; // [min, max]
  sortBy: 'name' | 'price' | null;
  sortOrder: 'asc' | 'desc' | 'lowToHigh' | 'highToLow' | null; // Expanded sortOrder options
}

interface ProductFilterProps {
  products: Product[]; // Original products passed from parent
  onFilterChange: (filteredAndSortedProducts: Product[]) => void; // Callback to send combined result
}

const ProductFilter: React.FC<ProductFilterProps> = ({ products, onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 0]);

  // We'll use specific states for name and price sort orders
  const [nameSortOrder, setNameSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [priceSortOrder, setPriceSortOrder] = useState<'lowToHigh' | 'highToLow' | null>(null);

  // Determine the overall min/max price from the products for the slider bounds
  const minProductPrice = products.length > 0 ? Math.min(...products.map(p => p.price)) : 0;
  const maxProductPrice = products.length > 0 ? Math.max(...products.map(p => p.price)) : 1000; // Default max

  // Extract unique categories from products

  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Initialize priceRange to cover the full range of products when component mounts
  useEffect(() => {
    setPriceRange([minProductPrice, maxProductPrice]);
  }, [minProductPrice, maxProductPrice]); // Re-initialize if product prices change

  // Effect to apply filters and sorting whenever relevant state changes
  useEffect(() => {
    applyFiltersAndSorting();
  }, [selectedCategories, priceRange, nameSortOrder, priceSortOrder, products]); // Now depend on nameSortOrder and priceSortOrder

  const applyFiltersAndSorting = () => {
    let currentProducts = [...products];

    // Apply category filter if any categories are selected
    if (selectedCategories.length > 0) {
      currentProducts = currentProducts.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    // Apply price range filter
    currentProducts = currentProducts.filter((p) =>
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // --- Apply Sorting ---
    // Prioritize price sorting if active, then name sorting
    if (priceSortOrder) {
        currentProducts.sort((a, b) => {
            if (priceSortOrder === 'lowToHigh') return a.price - b.price;
            if (priceSortOrder === 'highToLow') return b.price - a.price;
            return 0;
        });
    } else if (nameSortOrder) { // Only sort by name if price sort isn't active
        currentProducts.sort((a, b) => {
            if (nameSortOrder === 'asc') return a.title.localeCompare(b.title);
            if (nameSortOrder === 'desc') return b.title.localeCompare(a.title);
            return 0;
        });
    }

    // Send the final filtered and sorted products back to the parent
    onFilterChange(currentProducts);
  };


  const handleResetFilters = () => {
    setSelectedCategories([]); // Reset categories to empty array
    setPriceRange([minProductPrice, maxProductPrice]); // Reset price range to full extent
    setNameSortOrder(null); // Reset name sort order
    setPriceSortOrder(null); // Reset price sort order
  };

  // Define options for Product Name sorting
  const nameSortOptions = [
    { value: 'asc', label: 'Ascending (A-Z)' },
    { value: 'desc', label: 'Descending (Z-A)' },
  ];

  // Define options for Price sorting
  const priceSortOptions = [
    { value: 'lowToHigh', label: 'Price: Low to High' },
    { value: 'highToLow', label: 'Price: High to Low' },
  ];

  return (
    <>
      <Box className="filter-width" sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2,  height:'90vh' ,backgroundColor:'white'}}>
        <div className='d-flex justify-content-between'>
          <h5 className='fw-bold'>
            Filters
          </h5>
          <p className='text-primary cursor-pointer' onClick={handleResetFilters}>
            Clear all
          </p>
        </div>
        <Box
          sx={{
            padding: '10px 0px',
          }}>
          {/* Filter by Category */}
          <MultiSelectFilter  
            label="Category" 
            options={categories}
            selectedValues={selectedCategories}
            onChange={setSelectedCategories}
          />


          {/* Filter by Price Range */}
          <PriceRangeSlider
            label="Price Range"
            min={minProductPrice}
            max={maxProductPrice}
            value={priceRange}
            onChange={setPriceRange}
          />
        </Box>

        {/* --- Sorting Options --- */}
        <h5 className='fw-bold'>
          Sort By
        </h5>
      <Box sx={{ p: 2,  mb: 3 }}>
        {/* Product Name Sort Toggle */}
        <RadioToggle
          label="Product Name"
          options={nameSortOptions}
          selectedValue={nameSortOrder} // Use nameSortOrder state
          onChange={(value) => {
            setNameSortOrder(value as 'asc' | 'desc');
            setPriceSortOrder(null); // Clear price sort when name sort is selected
          }}
          collapsible={true}
          defaultExpanded={false} // Keep expanded by default as requested
        />

        {/* Price Sort Toggle */}
        <RadioToggle
          label="Price"
          options={priceSortOptions}
          selectedValue={priceSortOrder} // Use priceSortOrder state
          onChange={(value) => {
            setPriceSortOrder(value as 'lowToHigh' | 'highToLow');
            setNameSortOrder(null); // Clear name sort when price sort is selected
          }}
          collapsible={true}
          defaultExpanded={false} // Keep expanded by default as requested
        />
         </Box>
      </Box>
    </>
  );
};

export default ProductFilter;