import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/reducer/ProductSlice";
import type { RootState, AppDispatch } from "../../redux/store/store";
import "./ProductDetails.css";
import { Button } from "react-bootstrap";
import { ArrowBack } from "@mui/icons-material";

export type Product = {
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

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch<AppDispatch>();

  // const { items: products, status } = useSelector((state: RootState) => state.products);
  const { items: products, status } = useSelector((state: RootState) => state.products) as {
      items: Product[];
      status: string;
    };

  

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const productId = Number(id);
  const product = products.find((p) => p.id === productId);

  if (status === "loading") {
    return <div className="container p-5">Loading product details...</div>;
  }

  if (!product) {
    return <div className="container p-5">Product not found.</div>;
  }

  return (
    <div className="container p-5">
          <Link to="/" style={{ textDecoration: "none" }} onClick={() => window.history.back()}><ArrowBack/>&nbsp;Back to Home</Link>
      <div className="card row mx-0 flex-md-row flex-column">
        <div className="photo col-md-6 col-12">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="description col-md-6 col-12">
          <h3>{product.title}</h3>
          <h4>{product.category}</h4>
          <h1>${product.price}</h1>
          <h6>Availability: {product.rating.count > 0 ? "In Stock" : "Out of Stock"}</h6>
          <br />
          <h6>Description</h6>
          <p>{product.description}</p>
          <br />
          <h6>Specifications</h6>
          <ul>
            <li>Rating: {product.rating.rate} / 5</li>
            <li>Stock Count: {product.rating.count}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
