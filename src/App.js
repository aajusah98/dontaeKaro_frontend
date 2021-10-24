import React, { useState } from 'react';
import './App.css';
import Header from './components/header';
import MainContent from './components/mainContent';
import Footer from './components/footer';
import Login from './components/Login';
import Profile from './components/Profile';
import ProductDetails from './components/ProductDetails';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContextProvider } from './Contexts/loginContext';
import Protected from './config/Protected';
import Error404 from './components/Error404';
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  return (
    <div className="products-container">
      <LoginContextProvider>
        <ToastContainer />
        <Header />
        <Switch>
          <Route exact path="/" component={MainContent} />

          <Route exact path="/login-signup">
            <Login />
          </Route>
          <Protected exact path="/profile/:submenu" component={Profile} />
          <Route exact path="/product/description/:id">
            <ProductDetails />
          </Route>
          <Route>
            <Error404 />
          </Route>
        </Switch>
        <Footer />
      </LoginContextProvider>
    </div>
  );
}

export default App;
