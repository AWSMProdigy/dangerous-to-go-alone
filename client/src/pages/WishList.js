import React from 'react';
import { useQuery } from '@apollo/client';

import WishList from '../components/WishList';
import WishForm from '../components/WishForm';

import { QUERY_THOUGHTS } from '../utils/queries';
import WishList from '../components/WishList';

const WishList = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const wishes = data?.wishes || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <WishForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <WishList
              wishes={wishes}
              title="Your WishList"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default WishList;
