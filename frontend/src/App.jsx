import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import UserLayout from './components/layout/UserLayout'
import Home from './pages/Home'
import {Toaster} from "sonner"
import Login from './pages/Login'
import Register from './pages/Register'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import Profile from './pages/Profile'
import CollectionPage from './pages/CollectionPage'
import ProductDetails from './components/products/ProductDetails'
import Checkout from './components/cart/Checkout'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import MyOrderPage from './pages/MyOrderPage'
import AdminLayout from './components/admin/AdminLayout'
import AdminHomepage from './pages/AdminHomepage'
import UserManagement from './components/admin/UserManagement'
import ProductManagement from './components/admin/ProductManagement'
import EditProdcutsPage from './components/admin/EditProdcutsPage'
import OrderManagement from './components/admin/OrderManagement'

import {Provider} from "react-redux";
import store from './redux/store'
import ProtectedRoute from './components/common/ProtectedRoute'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import FAQ from './pages/FAQ'
import Features from './pages/Features'
import ShopManagement from './components/admin/ShopManagement'
import SubscribeManagement from './components/admin/SubscribeManagement'
import ContactManagement from './components/admin/ContactManagement'



const App = () => {
  return (
    <Provider store={store}>
       <BrowserRouter>
       <Toaster position="top-right"/>
        <Routes>

          {/* for user layout */}
        <Route path='/' element={<UserLayout />}>
            <Route index element={<Home />}/>
            <Route path='login' element={<Login />}/>
            <Route path='register' element={<Register />}/>
            <Route path='password/forget' element={<ForgetPassword />}/>
            <Route path='password/reset/:resetToken' element={<ResetPassword />}/>
            <Route path='profile' element={<Profile />}/>
            <Route path='collections/:collection' element={<CollectionPage />}/>
            <Route path='product/:id' element={<ProductDetails />}/>
            <Route path='checkout' element={<Checkout />}/>
            <Route path='order-confirmation' element={<OrderConfirmationPage />}/>
            <Route path='order/:id' element={<OrderDetailsPage />}/>
            <Route path='my-orders' element={<MyOrderPage />}/>
            <Route path='about-us' element={<AboutUs />} />
            <Route path='contact-us' element={<ContactUs />} />
            <Route path='faq' element={<FAQ />} />
            <Route path='features' element={<Features />} />
        </Route>

          {/* for admin layout */}
        <Route path='/admin' element={<ProtectedRoute role="admin">
          <AdminLayout />
        </ProtectedRoute>}>
          <Route index element={<AdminHomepage />} />
          <Route path='users' element={<UserManagement />} />
          <Route path='products' element={<ProductManagement />} />
          <Route path='products/:id/edit' element={<EditProdcutsPage />} />
          <Route path='orders' element={<OrderManagement />} />
          <Route path='shops' element={<ShopManagement />} />
          <Route path='subscribes' element={<SubscribeManagement />} />
          <Route path='contacts' element={<ContactManagement />} />
        </Route>

        </Routes>
       </BrowserRouter>
    </Provider>
  )
}

export default App
