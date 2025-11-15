import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import PlaceOrder from './pages/PlaceOrder'
import Collections from './pages/Collections'
import AboutUs from './pages/AboutUs'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Wishlist from './pages/Wishlist'
import Footer from './components/Footer'
import Signup from './pages/Signup'
import MyOrder from './pages/MyOrder'
import OrderSuccess from './pages/OrderSuccess'
import AddProduct from './pages/AddProduct'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/order/:id' element={<MyOrder/>} />
        <Route path='/collections' element={<Collections />} />
        <Route path='/about' element={<AboutUs/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/wishlist' element={<Wishlist/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/addproducts' element={<AddProduct />} />
        <Route path='/order-success' element={<OrderSuccess />} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App
