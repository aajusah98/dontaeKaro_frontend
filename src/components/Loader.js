import React from 'react';
import { Spinner } from 'reactstrap';

const Loader = () => {
  return (
    <div>
      <Spinner size="sm" type="grow" color="primary" />
      <Spinner size="sm" type="grow" color="secondary" />
      <Spinner size="sm" type="grow" color="success" />
      <Spinner size="sm" type="grow" color="danger" />
      <Spinner size="sm" type="grow" color="warning" />
      <Spinner size="sm" type="grow" color="info" />
      <Spinner size="sm" type="grow" color="light" />
      <Spinner size="sm" type="grow" color="dark" />
    </div>
  );
};

export default Loader;
