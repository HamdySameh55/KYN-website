import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Product from './pages/Product';
import ProductDetails from './pages/ProductDetails';
import Contact from './pages/Contact';
import About from './pages/About';
import Cart from './pages/Cart'; // لو الصفحة مش موجودة احذف السطر ده

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          {/* الصفحة الافتراضية */}
          <Route path="/" element={<Home />} />

          {/* باقي الروابط */}
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/About" element={<About />} />
          
          {/* صفحة السلة - احذف السطر ده لو الصفحة مش موجودة */}
          <Route path="/cart" element={<Cart />} />

          {/* أي لينك مش موجود → يرجع على الـ Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
          {/* أو لو عايز تعرض الـ Home فعليًا مش مجرد ريدايركت */}
          {/* <Route path="*" element={<Home />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;