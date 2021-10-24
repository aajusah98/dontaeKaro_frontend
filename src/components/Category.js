import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { getCategory } from '../services/Services';
import AddCategoryModel from './AddCategoryModal';
import EditModal from './EditModal';

const Category = () => {
  const [list_category, setProducts] = useState([]);
  const [addCategorySucess, setCategorySucess] = useState(false);

  const [modal, setModal] = useState(false);
  const [editDataCategory, setDataEditCategory] = useState({});

  const toggle = () => setModal(!modal);
  const getAllCategory = async () => {
    const data = await getCategory();
    setProducts(data.data);
  };

  useEffect(() => {
    getAllCategory();
  }, [addCategorySucess]);

  return (
    <>
      <AddCategoryModel
        setCategorySucess={setCategorySucess}
        addCategorySucess={addCategorySucess}
      />
      <EditModal
        className="edit-Modal"
        modal={modal}
        toggle={toggle}
        editDataCategory={editDataCategory}
        setCategorySucess={setCategorySucess}
        addCategorySucess={addCategorySucess}
      />
      <Table bordered variant="dark">
        <thead>
          <tr>
            <th>Category Id</th>
            <th>Category Name</th>
            <th>Category Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list_category.map((category, i) => (
            <tr key={i}>
              <td>{category.categoryId}</td>
              <td>{category.categoryName}</td>
              <td>{category.categoryCode}</td>
              <td
                style={{
                  justifyContent: 'space-evenly'
                }}
              >
                <i
                  class="fa fa-pencil"
                  onClick={() => {
                    toggle();
                    setDataEditCategory(category);
                  }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Category;
