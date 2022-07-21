import { useEffect, useState } from 'react'
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
import { getAll, getByCate, getById, updateProduct } from './api/product'
import { ProductTye } from './types/product'
import { message } from 'antd'

function App(props: any) {
  const [count, setCount] = useState(0)
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

  const handleUPdateProducts = async(datas: any, id: any) => {
    await updateProduct(datas, id)
    const {data} = await getAll();
    setProducts(data)
  }

  const changeStatus = async (id: any) => {
    const {data} = await getById(id)
    let statusNew = "";
    if(data[0].status == "hiện") {
        statusNew = 'ẩn'
    }else{
        statusNew = 'hiện'
    }
    const dataUpdate = {...data[0], status: statusNew }

    await updateProduct(dataUpdate, id)
    const dataNew = await getAll();
    setProducts(dataNew.data)
    console.log(dataUpdate)
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
            <Route index element={<ProductAdminPage changeStatus={changeStatus} handleChangeFilter={handleChangeFilter} product={products} />} />
            <Route path='add' element={<AddProductPage />} />
            <Route path='edit/:id' element={<EditProduct  handleUPdates={handleUPdateProducts}/>} />
          </Route>
          <Route path='categories' element={<CategoriesPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
