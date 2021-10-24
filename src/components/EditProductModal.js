import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLoginContext } from '../Contexts/loginContext';
import '../css/editProfile.css';
import {
  addProducts,
  getCategory,
  getCategoryBySubCategoryId,
  updateProduct
} from '../services/Services';
import { useHistory } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const EditProductsModal = ({ modal, toggle, className, editDataProduct }) => {
  console.log(
    '🚀 ~ file: EditProductModal.js ~ line 15 ~ EditProductsModal ~ editDataProduct',
    editDataProduct
  );
  let history = useHistory();

  const { data } = useLoginContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const [getCategoryId, setCategoryId] = useState({
    categoryId: ''
  });
  const [productData, setProductData] = useState({
    productName: '',
    subCategoryId: '',
    isFree: '',
    productPrice: '',
    description: '',
    userId: data?.id
  });

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const updatedProductData = {
      productName: productData.productName
        ? productData.productName
        : editDataProduct.productName,
      subCategoryId: productData.subCategoryId
        ? productData.subCategoryId
        : editDataProduct.subCategoryId,
      isFree: productData.isFree ? productData.isFree : editDataProduct.isFree,
      productPrice: productData.productPrice
        ? productData.productPrice
        : editDataProduct.productPrice,
      description: productData.description
        ? productData.description
        : editDataProduct.description,
      userId: data?.id
    };
    const formData = new FormData();
    formData.append('product', JSON.stringify(updatedProductData));
    formData.append('productFile', selectedFile);
    updateProduct(editDataProduct.productID, formData)
      .then((res) => {
        toast.success(res.statusMessage || 'Product Updated Successfully', {
          position: toast.POSITION.TOP_RIGHT
        });

        toggle();
      })
      .catch((err) => {
        toast.error('Could Not Update Product', {
          position: toast.POSITION.TOP_RIGHT
        });
      });
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handCatgeoryId = (e) => {
    const { name, value } = e.target;
    setCategoryId({ ...getCategoryId, [name]: value });
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Edit Product</ModalHeader>
        <ModalBody>
          <form className="my-form" onSubmit={handleUpdateProfile}>
            <div className="edit-container">
              <h1>Add Product</h1>
              <ul>
                <li>
                  <div className="grid grid-12">
                    <div>
                      <label htmlFor="productName">Product Name</label>
                      <input
                        type="text"
                        placeholder="Enter Product Name"
                        onChange={handleDataChange}
                        name="productName"
                        defaultValue={editDataProduct?.productName}
                      />
                    </div>
                  </div>
                </li>

                <li>
                  <div className="grid grid-2">
                    <div>
                      <label htmlFor="category">Category</label>
                      <select onChange={handCatgeoryId} name="categoryId">
                        {editDataProduct?.categoryName && (
                          <option>{editDataProduct?.categoryName}</option>
                        )}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="subCategory">Sub Category</label>
                      <select onChange={handleDataChange} name="subCategoryId">
                        {!editDataProduct?.subCategoryName && (
                          <option> ---Select Sub Category--- </option>
                        )}
                        {editDataProduct?.subCategoryName && (
                          <option>{editDataProduct?.subCategoryName}</option>
                        )}
                        {/* {list_sub_category.map((subCategory, i) => (
                          <option key={i} value={subCategory.subCategoryId}>
                            {subCategory.subCategoryName}
                          </option>
                        ))} */}
                      </select>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="grid grid-2">
                    <div>
                      <label htmlFor="isFree">IsFree</label>
                      <select onChange={handleDataChange} name="isFree">
                        {editDataProduct?.isFree && (
                          <option>{editDataProduct?.isFree}</option>
                        )}
                        <option value="free" selected>
                          Free
                        </option>
                        <option value="paid">Paid</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="phone">Product Price</label>
                      <input
                        type="text"
                        placeholder="Enter Product Price"
                        onChange={handleDataChange}
                        name="productPrice"
                        defaultValue={editDataProduct?.productPrice}
                      />
                    </div>
                  </div>
                </li>

                <li>
                  <label htmlFor="description">Description</label>
                  <textarea
                    type="text"
                    placeholder="description"
                    onChange={handleDataChange}
                    name="description"
                    defaultValue={editDataProduct?.description}
                  />
                </li>
                <li>
                  <label htmlFor="description">Select Product Image</label>
                  <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    name="productFile"
                  />
                </li>

                <li>
                  <div className="grid grid-3">
                    <div className="required-msg"></div>
                    <div></div>
                    <button className="btn-grid" type="submit">
                      <span className="back">
                        <img
                          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/email-icon.svg"
                          alt=""
                        />
                      </span>
                      <span className="front">SUBMIT</span>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditProductsModal;
