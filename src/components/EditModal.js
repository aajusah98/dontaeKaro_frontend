import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import '../css/editProfile.css';
import { addCategory, updateCategory } from '../services/Services';
import { useHistory, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
const EditModal = (props) => {
  const {
    modal,
    toggle,
    editDataCategory,
    setCategorySucess,
    addCategorySucess
  } = props;

  const [getCategory, setCategoryData] = useState({
    categoryName: '',
    categoryCode: ''
  });

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    updateCategory(editDataCategory?.categoryId, {
      categoryName: getCategory.categoryName
        ? getCategory.categoryName
        : editDataCategory?.categoryName,
      categoryCode: getCategory.categoryCode
        ? getCategory.categoryCode
        : editDataCategory?.categoryCode
    })
      .then((res) => {
        toast.success(res.statusMessage || 'Category Updated Successfully', {
          position: toast.POSITION.TOP_RIGHT
        });
        setCategorySucess(!addCategorySucess);
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

  const { className } = props;

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Edit Category</ModalHeader>
        <ModalBody>
          <form className="my-form" onSubmit={handleUpdateCategory}>
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
                        defaultValue={editDataCategory.categoryName}
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
                        defaultValue={editDataCategory.categoryCode}
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

export default EditModal;
