import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Example for routing
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home/Home';
import ProductDescription from './pages/home/ProductDescription';

function App() {
  return (
    <BrowserRouter>
  
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/ProductDescription/:id' element={<ProductDescription />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;