import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import '../css/editProfile.css';
import { addCategory } from '../services/Services';
import { useHistory, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
const AddCategoryModel = (props) => {
  let history = useHistory();
  const [getCategory, setCategoryData] = useState({
    categoryName: '',
    categoryCode: ''
  });

  const handleCategory = (e) => {
    e.preventDefault();
    addCategory(getCategory)
      .then((res) => {
        toast.success(res.statusMessage || 'Category Added Successfully', {
          position: toast.POSITION.TOP_RIGHT
        });
        props.setCategorySucess(!props?.addCategorySucess);
        setCategoryData({
          categoryName: '',
          categoryCode: ''
        });
        history.push('/profile/category');
      })
      .catch((err) => {
        toast.error('Could Not Add Category', {
          position: toast.POSITION.TOP_RIGHT
        });
      });
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...getCategory, [name]: value });
  };

  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  console.log(className);

  return (
    <div>
      <Button
        color="danger"
        onClick={toggle}
        style={{ display: 'flex', margin: '20px' }}
      >
        {buttonLabel}Add
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add Category</ModalHeader>
        <ModalBody>
          <form className="my-form" onSubmit={handleCategory}>
            <div className="edit-container">
              <ul>
                <li>
                  <div className="grid grid-12">
                    <div>
                      <label htmlFor="categoryName">Category Name</label>
                      <input
                        type="text"
                        placeholder="Enter Category Name"
                        onChange={handleDataChange}
                        name="categoryName"
                        required
                        value={getCategory.productName}
                      />
                    </div>
                    <div>
                      <label htmlFor="categoryCode">Sub Category</label>
                      <input
                        type="text"
                        placeholder="Enter Sub Category"
                        onChange={handleDataChange}
                        required
                        name="categoryCode"
                        value={getCategory.subCategoryId}
                      />
                    </div>
                  </div>
                </li>

                <li>
                  <div className="grid grid-3">
                    <div className="required-msg"></div>
                    <div></div>
                    <button className="btn-grid" type="submit" onClick={toggle}>
                      <span className="back">
                        <i class="fa fa-paper-plane"></i>
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

export default AddCategoryModel;
