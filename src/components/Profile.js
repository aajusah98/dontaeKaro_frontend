import React, { useEffect, useState } from 'react';
import '../css/profile.css';
import { Link } from 'react-router-dom';
import { useLoginContext } from '../Contexts/loginContext';
import MainContent from './mainContent';
import { useHistory } from 'react-router-dom';
import EditProfile from './EditProfile';
import { getProductsByUser } from '../services/Services';
import Category from './Category';
import SubCategory from './SubCategory';
import AddProducts from './AddProducts';
import AddCategoryModel from './AddCategoryModal';
import LogOut from './LogOut';
import Users from './Users';

const Profile = () => {
  let history = useHistory();
  const { data } = useLoginContext();
  const [productsByUser, setProductsData] = useState(true);
  const [products, setProducts] = useState(
    history.location.pathname === '/profile/products'
  );
  const [addProducts, setAddProducts] = useState(
    history.location.pathname === '/profile/add-products'
  );
  const [category, setCategory] = useState(
    history.location.pathname === '/profile/category'
  );
  const [subCategory, setSubCategory] = useState(
    history.location.pathname === '/profile/subcategory'
  );
  const [settings, setSettings] = useState(
    history.location.pathname === '/profile/settings'
  );
  const [users, setAbout] = useState(
    history.location.pathname === '/profile/users'
  );

  const handleProducts = () => {
    setProducts(true);
    setAddProducts(false);
    setCategory(false);
    setSubCategory(false);
    setSettings(false);
    setAbout(false);
  };
  const handleAddProducts = () => {
    setProducts(false);
    setAddProducts(true);
    setCategory(false);
    setSubCategory(false);
    setSettings(false);
    setAbout(false);
  };

  const handleCategory = () => {
    setProducts(false);
    setAddProducts(false);
    setCategory(true);
    setSubCategory(false);
    setSettings(false);
    setAbout(false);
  };

  const handleSubCategory = () => {
    setProducts(false);
    setAddProducts(false);
    setCategory(false);
    setSubCategory(true);
    setSettings(false);
    setAbout(false);
  };

  const handleSettings = () => {
    setProducts(false);
    setAddProducts(false);
    setCategory(false);
    setSubCategory(false);
    setSettings(true);
    setAbout(false);
  };

  const handleAbout = () => {
    setProducts(false);
    setAddProducts(false);
    setCategory(false);
    setSubCategory(false);
    setSettings(false);
    setAbout(true);
  };

  const getAllProductsByUser = async () => {
    const d = await getProductsByUser(data?.id);
    setProductsData(d.data);
  };

  useEffect(() => {
    getAllProductsByUser();
  }, []);

  return (
    <>
      <input type="checkbox" id="checkbox" />
      <header className="header-profile">
        <h2 className="u-name">
          Profile <b>Details</b>
          <label htmlFor="checkbox">
            <i id="navbtn" className="fa fa-bars" aria-hidden="true"></i>
          </label>
        </h2>
        <i className="fa fa-user" aria-hidden="true"></i>
      </header>
      <div className="profile-body">
        <nav className="side-bar">
          <div className="user-p">
            <i
              className="fa fa-user"
              aria-hidden="true"
              style={{ fontSize: '50px' }}
            ></i>
            <h4>{data.firstName || 'Anonyms'}</h4>
          </div>
          <ul>
            {data.typeName === 'user' || data.typeName === 'superadmin' ? (
              <Link to={`/profile/products`}>
                <li
                  className={`profile-list ${
                    products && 'profile-active-background'
                  } `}
                  onClick={handleProducts}
                >
                  <i className="fa fa-product-hunt" aria-hidden="true"></i>

                  <span>My Products</span>
                </li>
              </Link>
            ) : (
              <span></span>
            )}

            <Link to={`/profile/add-products`}>
              <li
                className={`profile-list ${
                  addProducts && 'profile-active-background'
                } `}
                onClick={handleAddProducts}
              >
                <i className="fa fa-plus" aria-hidden="true"></i>

                <span>Add Products</span>
              </li>
            </Link>

            {data.typeName === 'superadmin' ? (
              <Link to="/profile/category">
                <li
                  className={`profile-list ${
                    category && 'profile-active-background'
                  } `}
                  onClick={handleCategory}
                >
                  <span>Categories</span>
                </li>
              </Link>
            ) : (
              <span></span>
            )}

            {data.typeName === 'superadmin' ? (
              <Link to="/profile/subcategory">
                <li
                  className={`profile-list ${
                    subCategory && 'profile-active-background'
                  } `}
                  onClick={handleSubCategory}
                >
                  <span>Sub Category</span>
                </li>
              </Link>
            ) : (
              <span></span>
            )}

            {data.typeName === 'superadmin' ? (
              <Link to="/profile/users">
                <li
                  className={`profile-list ${
                    users && 'profile-active-background'
                  } `}
                  onClick={handleAbout}
                >
                  <i className="fa fa-users" aria-hidden="true"></i>
                  <span>Users</span>
                </li>
              </Link>
            ) : (
              <span></span>
            )}
            <Link to="/profile/settings">
              <li
                className={`profile-list ${
                  settings && 'profile-active-background'
                } `}
                onClick={handleSettings}
              >
                <i className="fa fa-cog" aria-hidden="true"></i>
                <span>Setting</span>
              </li>
            </Link>
            <li className="profile-list">
              <i className="fa fa-power-off" aria-hidden="true"></i>
              <LogOut />
            </li>
          </ul>
        </nav>
        <section className="section-1">
          {products && (
            <MainContent
              showCart={false}
              productsByUser={productsByUser}
              path="/profile/products"
            />
          )}

          {addProducts && <AddProducts />}
          {category && <Category />}
          {settings && <EditProfile />}
          {users && (
            <p>
              <Users />
            </p>
          )}
          {subCategory && <SubCategory />}
        </section>
      </div>
    </>
  );
};

export default Profile;
