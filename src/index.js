import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import BlogIndex from './components/Blog/BlogIndex';
import Detail from './components/Blog/Detail';
import Index from './components/Member/IndexLogin';
import Account from './components/Member/Account';
import Product from './components/Product/Product';
import AddProduct from './components/Product/AddProduct';
import UpdateProd from './components/Product/UpdateProd';
import ProdDetail from './components/Product/ProdDetail';
import Cart from './components/Product/Cart';
import Home from './components/Home/Home';
import Wishlist from './components/Product/WishList';

import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
   <Router> 
      <App>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/account/update' element={<Account />} />
          <Route path='/account/my-product' element={<Product />} />
          <Route path='/product/detail/:id' element={<ProdDetail />} />
          <Route path='/account/create-product' element={<AddProduct />} />
          <Route path='/account/my-product/update/:id' element={<UpdateProd />} />
          <Route  path='/blog/list' element={<BlogIndex />} />
          <Route path='/blog/detail/:id' element={<Detail />} />
          <Route path='/login' element={<Index />} />
        </Routes>
      </App>
    </Router>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
