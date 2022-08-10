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
import SigninPage from './pages/Admin/Product/Auth/signin'
import { getAll, getByCate, getById, remove, updateProduct } from './api/product'
import { ProductTye } from './types/product'
import { message } from 'antd'
import ProductsDetail from './pages/User/ProductsDetail/ProductsDetail'
import Cart from './pages/User/Cart/Cart'
import SingnUpPape from './pages/Admin/Product/Auth/signup'
import { User } from './types/User'
import { getLocalStorage, setLocalStorage } from './utils/cart'


function App(props: any) {
  const [isSignIn, setIsSignIn] = useState<any>()
  const [cart, setCart] = useState<any>()
  const [products, setProducts] = useState<ProductTye[]>([]);

  const handleChangeFilter = async (e: any) => {
    if (e === '') {
      const { data } = await getAll();
      setProducts(data)
      return
    }
    const data = await getByCate(e)
    setProducts(data.data)
  }

  const handleFillterCate = async (key: any) => {
    if(key == "All") {
      const {data} = await getAll();
      setProducts(data)
      return
    }
    const {data} = await getByCate(key)
    setProducts(data)
  }

  const handleUPdateProducts = async (datas: any, id: any) => {
    await updateProduct(datas, id)
    const { data } = await getAll();
    setProducts(data)
  }

  const handleRemove = async (id: any) => {
    await remove(id);
    const { data } = await getAll();
    setProducts(data)
  }

  const changeStatus = async (id: any) => {
    const { data } = await getById(id)
    let statusNew = "";
    if (data[0].status == "hiện") {
      statusNew = 'ẩn'
    } else {
      statusNew = 'hiện'
    }
    const dataUpdate = { ...data[0], status: statusNew }

    await updateProduct(dataUpdate, id)
    const dataNew = await getAll();
    setProducts(dataNew.data)
    console.log(dataUpdate)
  }

  const handleSignIn = (userValue: User) => {
    setLocalStorage("user", userValue)
    setIsSignIn(userValue)
  }

  const handleAddCart = () => {
    const data = getLocalStorage("cart")
    setCart(data.length)
  }
  const handleRemoveCartItem = () => {
    const data = getLocalStorage("cart")
    setCart(data.length)
  }
  useEffect(() => {
    const getPro = async () => {
      const { data } = await getAll();
      setProducts(data)
    }
    getPro()
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path='' element={<UserLayout cart={cart} isSignInValue={isSignIn} />}>
          <Route index element={<HomePage onFilter={handleFillterCate} products={products}/>} />
          <Route path="products/:id" element={<ProductsDetail addToCart={handleAddCart} />}/>
          <Route path="cart" element={<Cart removeCartItem={handleRemoveCartItem} />}/>
          <Route path="signin" element={<SigninPage onSignIn={handleSignIn} />}/>
          <Route path="signup" element={<SingnUpPape onSignUp={handleSignIn}  />}/>
        </Route>
        <Route path='admin' element={<AdminLayout />}>
          <Route index element={<Navigate to="products" />} />
          <Route path='products' >
            <Route index element={<ProductAdminPage onRemovePro={handleRemove} changeStatus={changeStatus} handleChangeFilter={handleChangeFilter} product={products} />} />
            <Route path='add' element={<AddProductPage />} />
            <Route path='edit/:id' element={<EditProduct handleUPdates={handleUPdateProducts} />} />
          </Route>
          <Route path='categories' element={<CategoriesPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
