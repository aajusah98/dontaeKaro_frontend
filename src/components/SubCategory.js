import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { getSubCategory } from '../services/Services';
// import AddSubCategoryModel from './';

const SubCategory = () => {
  const [list_sub_category, setSubCategory] = useState([]);
  const [addSubCategorySucess, setSubCategorySucess] = useState(false);

  console.log(list_sub_category);

  const getAllSubCategory = async () => {
    const data = await getSubCategory();
    setSubCategory(data.data);
  };

  useEffect(() => {
    getAllSubCategory();
  }, [addSubCategorySucess]);

  return (
    <>
      {/* <AddCategoryModel setCategorySucess={addSubCategorySucess} /> */}
      <Table bordered variant="dark">
        <thead>
          <tr>
            <th>Sub Category Id</th>
            <th>SubCategoryName</th>
            <th>Category Name</th>
            <th>Category Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list_sub_category.map((subcategory, i) => (
            <tr key={i}>
              <td>{subcategory.subCategoryId}</td>
              <td>{subcategory.subCategoryName}</td>
              <td>{subcategory.categoryId.categoryName}</td>
              <td>{subcategory.categoryId.categoryCode}</td>
              <td
                style={{
                  justifyContent: 'space-evenly'
                }}
              >
                <i class="fa fa-trash"></i> <i class="fa fa-pencil"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default SubCategory;
