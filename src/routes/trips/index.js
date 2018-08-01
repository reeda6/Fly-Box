
import React from 'react';
import Layout from '../../components/Layout';
import Trips from './Trips';

const title = 'Fishing Trips';

function action() {
  return {
    chunks: ['trips'],
    title,
    component: (
      <Layout>
        <Trips title={title} />
      </Layout>
    ),
  };
}

export default action;
