import React from 'react';
import { useHistory } from 'react-router-dom';
import { useLoginContext } from '../Contexts/loginContext';

const LogOut = () => {
  const { setData } = useLoginContext();

  let history = useHistory();

  const logOut = () => {
    setData({});
    history.push('/');
  };
  return <span onClick={logOut}>LogOut</span>;
};

export default LogOut;
