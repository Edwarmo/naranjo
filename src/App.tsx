import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/cartContext';
import HomePage from './pages/home/HomePage';
import Productos from './pages/products/products';
import Metodos from './pages/methods/methods';
import Nosotros from './pages/About us/AboutUs';
import PaymentPage from './pages/payment/PaymentPage';
import Navbar from './components/Navbar';
import Cart from './components/Cart';

function App() {
  return (
    <CartProvider>
      <div className="relative">
        <Cart />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={
            <>
              <Navbar />
              <Productos />
            </>
          } />
          <Route path="/metodos" element={
            <>
              <Navbar />
              <Metodos />
            </>
          } />
          <Route path="/nosotros" element={
            <>
              <Navbar />
              <Nosotros />
            </>
          } />
          <Route path="/pago" element={
            <>
              <Navbar />
              <PaymentPage />
            </>
          } />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;