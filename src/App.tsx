import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProductAdminPage from './pages/Admin/Product/products'
import CategoriesPage from './pages/Admin/Catefories/categories'
import AdminLayout from './components/Layout/AdminLayout'
import UserLayout from './components/Layout/WebsiteLayout'
import HomePage from './pages/User/Home/Home'
import AddProductPage from './pages/Admin/Product/add'
import EditProduct from './pages/Admin/Product/edit'
import SigninPage from 'pages/Auth/signin'

import { getAll, getByCate, getById, remove, updateProduct } from './api/product'
import { ProductTye } from './types/product'
import { message } from 'antd'
import ProductsDetail from './pages/User/ProductsDetail/ProductsDetail'
import Cart from './pages/User/Cart/Cart'
import SingnUpPape from './pages/Auth/signup'
import { User } from './types/User'
import { getLocalStorage, setLocalStorage } from './utils/cart'
import { useDispatch, useSelector } from 'react-redux';

function App(props: any) {
  const [products, setProducts] = useState<ProductTye[]>([]);
  

  const handleUPdateProducts = async (datas: any, id: any) => {
    await updateProduct(datas, id)
    const { data } = await getAll();
    setProducts(data)
  }

  useEffect(() => {
   
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path='' element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products/:id" element={<ProductsDetail  />}/>
          <Route path="cart" element={<Cart  />}/>
          <Route path="signin" element={<SigninPage  />}/>
          <Route path="signup" element={<SingnUpPape  />}/>
        </Route>
        <Route path='admin' element={<AdminLayout />}>
          <Route index element={<Navigate to="products" />} />
          <Route path='products' >
            <Route index element={<ProductAdminPage  />} />
            <Route path='add' element={<AddProductPage />} />
            <Route path='edit/:id' element={<EditProduct handleUPdates={handleUPdateProducts} />} />
          </Route>
          {/* <Route path='categories' element={<CategoriesPage changeStatus={changeStatus} />} /> */}
        </Route>
      </Routes>
    </div>
  )
}

export default App
