import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { getUsers } from '../services/Services';

const Users = () => {
  const [list_users, setUsers] = useState([]);

  console.log(list_users);

  const getAllUser = async () => {
    const data = await getUsers();
    setUsers(data.data);
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <>
      {/* <AddCategoryModel setCategorySucess={addSubCategorySucess} /> */}
      <Table bordered variant="dark">
        <thead>
          <tr>
            <th>Sn.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>TypeName</th>
          </tr>
        </thead>
        <tbody>
          {list_users.map((u, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
              <td>{u.email}</td>
              <td>{u.mobile}</td>
              <td>{u.address}</td>
              <td>{u.typeName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Users;
