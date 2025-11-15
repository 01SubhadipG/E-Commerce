import React from 'react'
import { Route,  Routes } from 'react-router-dom'
import OrderList from './pages/OrderList'
import Navbar from './components/Navbar'
import AddProduct from './pages/AddProduct'
import UpdateProduct from './pages/UpdateProduct'
import RemoveProduct from './pages/RemoveProduct'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" component={OrderList} />
        <Route path="/admin/add" component={AddProduct} />
        <Route path="/admin/update/:id" component={UpdateProduct} />
        <Route path="/adminS/remove/:id" component={RemoveProduct} />

      </Routes>
    </div>
  )
}

export default App
