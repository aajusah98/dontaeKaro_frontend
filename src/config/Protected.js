import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useLoginContext } from '../Contexts/loginContext';
const Protected = ({ component: Cmp, ...rest }) => {
  const { data } = useLoginContext();
  console.log('🚀 ~ file: Protected.js ~ line 6 ~ Protected ~ data', Object.keys(data).length !== 0 && data?.id);

  return (
    <Route
      {...rest}
      render={(props) => {
        return Object.keys(data).length !== 0 && data?.id ? (
          <Cmp {...props} />
        ) : (
          <Redirect to="/login-signup" />
        );
      }}
    />
  );
};

export default Protected;
