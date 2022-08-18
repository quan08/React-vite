import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { Provider } from 'react-redux';
import store from './redux/store'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(

  
   <Provider store={store}>
    <BrowserRouter><App /></BrowserRouter>
  </Provider>
)
