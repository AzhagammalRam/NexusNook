import ProductDetails from "../../components/Product-description/ProductDetails";
import NavBar from "../../layouts/nav-bar/NavBar";


function ProductDescription() {
  return (
    <>
      <NavBar onSearchChange={() => {}} searchTerm=""  />
      <div className="content d-flex ">
         <ProductDetails/>
      </div>
    </>
    
  )
}

export default ProductDescription