import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './css/home.css';
import './css/addProduct.css';
import './css/addProduction.css';

import Navbar from './layout/navbar';
import Home from './pages/home';
import AddProduction from './pages/addProduction';
import AddProduct from './pages/addProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/api-control-produccion.web.app' element={<Navbar />} >
          <Route index element={<Home />} />
          <Route path='addproduction' element={<AddProduction />} />
          <Route path='addproduct' element={<AddProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
