import React from "react";
import Cards from "../../components/cards/Cards";
import FilterTags from "../../components/filter-tags/FilterTags";

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

type CardsProps = {
  products: Product[]; // Corrected type to Product[]
  onAddToCart?: (product: Product) => void;
  onRemoveFromCart?: (productId: number) => void;
  isItemInCart?: (productId: number) => boolean;
};


  const ProductList: React.FC<CardsProps> = ({ products, onAddToCart, onRemoveFromCart, isItemInCart }) => {
    // console.log(products);
  return (
    <div className="" style={{ height: "90vh",overflowY: "scroll",width: "100%" }}>
      <div className="row col-md-12 p-2">
        {/* <FilterTags /> */}
        {products.map((product) => (
        <Cards
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
          isItemInCart={isItemInCart}
        />
      ))}
      </div>
    </div>
  );
};

export default ProductList;
