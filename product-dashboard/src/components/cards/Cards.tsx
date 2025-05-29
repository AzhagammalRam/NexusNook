import React, { useState, useEffect } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import './Cards.css';
import {
  AddCircleOutline,
  AddShoppingCart,
  RemoveCircleOutline,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../../redux/reducer/CartSlice'; // Adjust path
import type { RootState } from '../../redux/store/store';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

type Product = {
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
};

type CardProps = {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onRemoveFromCart?: (productId: number) => void;
  isItemInCart?: (productId: number) => boolean;
};

const Cards: React.FC<CardProps> = ({ product, onAddToCart, onRemoveFromCart, isItemInCart }) => {
  const [clicked, setClicked] = useState(isItemInCart ? isItemInCart(product.id) : false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find(item => item.id === product.id)
  );
  const count = cartItem?.count || 0;
  const available = product.rating.count - count > 0;

  const handleBuyClick = () => {
    if (available) {
      dispatch(increment(product.id));
      setClicked(true);
      setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  };

  const handleRemoveClick = () => {
    dispatch(decrement(product.id));
    if (count <= 1) {
      setClicked(false);
    }
  };

  const handleCloseClick = () => {
    setClicked(false);
  };

  const handleAddClick = () => {
    setClicked(true);
  };

  const handleDescClick = () => {
    navigate(`/ProductDescription/${product.id}`); // Adjust route as per your app
  };

  useEffect(() => {
    if (isItemInCart) {
      setClicked(isItemInCart(product.id));
    }
  }, [product.id, isItemInCart]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <div className="col-md-4">
      <Collapse in={showAlert}>
        <Alert
          severity="warning"
          sx={{ mt: 2 }}
          action={
            <IconButton
              aria-label="close"
              size="small"
              onClick={() => setShowAlert(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Out of stock
        </Alert>
      </Collapse>
      <div className="wrapper">
        <div className="container1">
          <div
            className="top" onClick={handleDescClick}
            style={{
              background: `url(${product.image}) no-repeat center center`,
            }}
          ></div>
          <div className={`bottom ${clicked ? 'clicked' : ''}`}>
            <div className="left">
              <div className="details">
                <p className='blue-clr wrap-text'>{product.title}</p>
                <div className="align-left-right">
                  <p className='capitalize'>
                    <b>{product.category}</b>
                  </p>
                  <p className="red-clr">
                    <b>$ {product.price}</b>
                  </p>
                </div>
              </div>
              <div className="buy" onClick={handleAddClick}>
                <AddShoppingCart />
              </div>
            </div>
            <div className="right">
              <div className="done">
                <DoneIcon />
              </div>
              <div className="details">
                <h6 className='red-clr'><b>Add Product</b></h6>
                <div className="p-2">
                  <span className='red-clr'><RemoveCircleOutline onClick={handleRemoveClick} /></span>
                  <span className='blue-clr p-2 mx-2 border'><b>{count}</b></span>
                  <span className='green-clr'><AddCircleOutline onClick={handleBuyClick} /></span>
                </div>
              </div>
              <div className="remove" onClick={handleCloseClick}>
                <ClearIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
