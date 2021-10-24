import React, { useEffect, useState } from 'react';
// import product_card from '../data/product_data';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProducts } from '../services/Services';
import EditProductsModal from './EditProductModal';
import Loader from './Loader';

const MainContent = ({ showCart, productsByUser, path }) => {
  const [product_card, setProducts] = useState([]);
  console.log(product_card);
  let history = useHistory();
  const [editDataProduct, setDataEditProduct] = useState({});
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggle = () => setModal(!modal);

  const handleProductDetails = (item) => {
    history.push({
      pathname: `/product/description/${item.productID}`,
      state: item
    });
  };

  const getAllProducts = async () => {
    getProducts()
      .then((res) => {
        setProducts(res.data);
        toast.success('Fetched Products Successfully', {
          position: toast.POSITION.TOP_RIGHT
        });
        setLoading(false);
      })
      .catch((err) => {
        toast.error('Could Not Fetch Products', {
          position: toast.POSITION.TOP_RIGHT
        });
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const selectedData =
    path === '/profile/products' && productsByUser.length > 0
      ? productsByUser
      : product_card;

  console.log(
    '🚀 ~ file: mainContent.js ~ line 35 ~ MainContent ~ productsByUser',
    productsByUser
  );
  const listItems =
    path === '/profile/products' && productsByUser.length === 0
      ? 'No Data Found'
      : selectedData?.map((item) => (
          <div className="card" key={item?.id || item?.productID}>
            {path === '/profile/products' && (
              <div
                style={{
                  color: '#fe8033',
                  position: 'absolute',
                  zIndex: 100,
                  top: 0,
                  right: 0
                }}
              >
                <i
                  onClick={() => {
                    toggle();
                    setDataEditProduct(item);
                  }}
                  class="fa fa-pencil"
                ></i>
              </div>
            )}
            <div
              className="card_img"
              onClick={() => handleProductDetails(item)}
            >
              <img src={item.productImage} alt="data" />
            </div>
            <div
              className="card_header"
              onClick={() => handleProductDetails(item)}
            >
              <h2>{item.productName}</h2>
              <p>{item.description}</p>
              <p className="price">
                <span>Rs</span> {item.productPrice}
              </p>
            </div>
            {showCart && (
              <div
                className="btn"
                style={{ marginTop: '-15px', marginBottom: '20px' }}
              >
                Add to cart
              </div>
            )}
          </div>
        ));
  return (
    <div className="main_content">
      <EditProductsModal
        modal={modal}
        toggle={toggle}
        className="edit"
        editDataProduct={editDataProduct}
      />
      <h3>{product_card[0]?.categoryName}</h3>
      {loading ? <Loader /> : listItems}
    </div>
  );
};
export default MainContent;
