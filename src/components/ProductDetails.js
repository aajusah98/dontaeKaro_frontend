import React from 'react';
import '../css/productDetail.scss';
import { useHistory } from 'react-router-dom';

const ProductDetails = () => {
  let history = useHistory();
  const { state } = history.location;
  console.log(
    '🚀 ~ file: ProductDetails.js ~ line 8 ~ ProductDetails ~ history',
    state
  );

  return (
    <section className="productCard">
      <div className="container">
        <div className="info">
          <h3 className="name">{state?.productName}</h3>
          {/* <h1 className="slogan">{state?.description}</h1> */}
          <p>Ad Posted: {state?.createdAt}</p>
          <h3>Description</h3>
          <p>{state?.description}</p>

          <p className="price">Price: Rs.{state?.productPrice}</p>
          <div className="attribs">
            <div className="attrib size">
              <p className="header">Category: {state?.categoryName}</p>
              <p className="header">Sub Category: {state?.subCategoryName}</p>
            </div>
            <div className="attrib color">
              <p className="header">Contact Details</p>
              <p>
                Name: {state?.firstName} {state?.lastName}
              </p>
              <p>Mobile: {state?.mobile}</p>
              <p>Email: {state?.email}</p>
              <p>Address: {state?.address}</p>
            </div>
          </div>
          <div className="buttons">
            <div className="button">Add to cart</div>
            <div className="button colored">Buy now</div>
          </div>
        </div>
        <div className="preview">
          <div className="imgs">
            <img className="activ" src={state?.productImage} alt="img 1" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
