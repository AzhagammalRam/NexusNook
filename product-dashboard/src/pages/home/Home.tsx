import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../../layouts/nav-bar/NavBar';
import ProductFilter from '../../layouts/product-filter/ProductFilter';
import ProductList from '../../layouts/product-list/ProductList';
import { fetchProducts } from '../../redux/reducer/ProductSlice';
import type { RootState, AppDispatch } from '../../redux/store/store';
import { Button, Offcanvas } from 'react-bootstrap';

interface Product {
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

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, status, error } = useSelector(
    (state: RootState) => state.products
  ) as {
    items: Product[];
    status: string;
    error: string | null;
  };

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredBySearchProducts, setFilteredBySearchProducts] = useState<Product[]>([]);
  const [finallyFilteredAndSortedProducts, setFinallyFilteredAndSortedProducts] = useState<Product[]>([]);
  const [showFilter, setShowFilter] = useState(false); // ✅ moved up here

  const toggleFilter = () => setShowFilter(!showFilter);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const applySearchFilter = () => {
      if (!searchTerm) {
        setFilteredBySearchProducts(products);
      } else {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const searchFiltered = products.filter((product) =>
          product.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          product.category.toLowerCase().includes(lowerCaseSearchTerm) ||
          (product.description && product.description.toLowerCase().includes(lowerCaseSearchTerm))
        );
        setFilteredBySearchProducts(searchFiltered);
      }
    };
    applySearchFilter();
  }, [products, searchTerm]);

  const handleFinalProductChange = (processedProducts: Product[]) => {
    setFinallyFilteredAndSortedProducts(processedProducts);
  };

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  // ✅ no hook below this point
  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <>
      <NavBar onSearchChange={handleSearchChange} searchTerm={searchTerm} />
      <div className="w-100 bg-color">
        {/* Mobile & Tablet: Hamburger Button */}
        <div className="d-lg-none">
          <Button variant="primary" onClick={toggleFilter} className='m-2'>
            ☰ Filters
          </Button>

          <Offcanvas show={showFilter} onHide={toggleFilter} placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Filter Products</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ProductFilter
                products={filteredBySearchProducts}
                onFilterChange={handleFinalProductChange}
              />
            </Offcanvas.Body>
          </Offcanvas>
        </div>

        {/* Desktop: Side-by-side view */}
        <div className="d-none d-lg-flex">
          <ProductFilter
            products={filteredBySearchProducts}
            onFilterChange={handleFinalProductChange}
          />
          <ProductList products={finallyFilteredAndSortedProducts} />
        </div>

        {/* Mobile & Tablet: Product list always visible */}
        <div className="d-lg-none">
          <ProductList products={finallyFilteredAndSortedProducts} />
        </div>
      </div>

    </>
  );
};


export default Home;
