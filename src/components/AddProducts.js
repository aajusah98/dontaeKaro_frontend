import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLoginContext } from '../Contexts/loginContext';
import '../css/editProfile.css';
import {
  addProducts,
  getCategory,
  getCategoryBySubCategoryId
} from '../services/Services';
import { useHistory, Redirect } from 'react-router-dom';

const AddProducts = () => {
  let history = useHistory();

  const { data } = useLoginContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const [list_category, setCategory] = useState([]);
  const [getCategoryId, setCategoryId] = useState({
    categoryId: ''
  });
  const [list_sub_category, setSubCategory] = useState([]);
  const [productData, setProductData] = useState({
    productName: '',
    subCategoryId: '',
    isFree: 'free',
    productPrice: '',
    description: '',
    userId: data?.id
  });

  const getAllCategory = async () => {
    const data = await getCategory();
    setCategory(data.data);
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const getSubCategoryByCatgoryId = async () => {
    const data = await getCategoryBySubCategoryId(getCategoryId?.categoryId);
    setSubCategory(data.data);
  };

  console.log(getCategoryId);
  console.log(list_sub_category);

  useEffect(() => {
    getSubCategoryByCatgoryId();
  }, [getCategoryId]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('product', JSON.stringify(productData));
    formData.append('productFile', selectedFile);
    addProducts(formData)
      .then((res) => {
        toast.success(res.statusMessage || 'Product Added Successfully', {
          position: toast.POSITION.TOP_RIGHT
        });
        setSelectedFile(null);
        setProductData({
          productName: '',
          subCategoryId: '',
          isFree: 'free',
          productPrice: '',
          description: '',
          userId: data?.id
        });
        history.push('/profile/products');
      })
      .catch((err) => {
        toast.error('Could Not Add Product', {
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
                  value={productData.productName}
                />
              </div>
            </div>
          </li>

          <li>
            <div className="grid grid-2">
              <div>
                <label htmlFor="category">Category</label>
                <select onChange={handCatgeoryId} name="categoryId">
                  <option> ---Select Category--- </option>
                  {list_category.map((category, i) => (
                    <option key={i} value={category.categoryId}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="subCategory">Sub Category</label>
                <select onChange={handleDataChange} name="subCategoryId">
                  <option> ---Select Sub Category--- </option>
                  {list_sub_category.map((subCategory, i) => (
                    <option key={i} value={subCategory.subCategoryId}>
                      {subCategory.subCategoryName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </li>

          <li>
            <div className="grid grid-2">
              <div>
                <label htmlFor="isFree">IsFree</label>
                <select onChange={handleDataChange} name="isFree">
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
                  value={productData.productPrice}
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
              value={productData.description}
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
  );
};

export default AddProducts;
