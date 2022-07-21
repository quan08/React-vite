import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProductAdminPage from './pages/Admin/Product/product'
import CategoriesPage from './pages/Admin/categories'
import AdminLayout from './components/Layout/admin'
import UserLayout from './components/Layout/user'
import HomePage from './pages/Home/home'
import AddProductPage from './pages/Admin/Product/add'
import DetailPage from './pages/Home/Detail'
import EditProduct from './pages/Admin/Product/edit'
import SigninPage from './pages/Auth/signin'

function App(props: any) {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <Routes>
        {/* Auth */}
        <Route path='/signin' element={<SigninPage />} />
        {/* User layout */}
        <Route path='/' element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path='detail' element={<DetailPage />} />
        </Route>
        {/* Admin layout */}
        <Route path='admin' element={<AdminLayout />}>
          <Route index element={<Navigate to="products" />} />
          <Route path='products' >
            <Route index element={<ProductAdminPage />}/>
            <Route path='add' element={<AddProductPage />} />
            <Route path='edit/:id' element={<EditProduct />} />
          </Route>
          <Route path='categories' element={<CategoriesPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
