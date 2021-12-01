import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_WISH } from '../../utils/mutations';
import { QUERY_WISHS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const WishForm = () => {
  const [wishText, setWishText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addWish, { error }] = useMutation(ADD_WISH, {
    update(cache, { data: { addWish } }) {
      try {
        const { wishs } = cache.readQuery({ query: QUERY_WISHS });

        cache.writeQuery({
          query: QUERY_WISHS,
          data: { wishs: [addWish, ...wishs] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, wishs: [...me.wishs, addWish] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addWish({
        variables: {
          wishText,
          wishAuthor: Auth.getProfile().data.username,
        },
      });

      setWishText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'wishText' && value.length <= 280) {
      setWishText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>Look deep inside yourself, what do you want?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="wishText"
                placeholder="Here's a new wish..."
                value={wishText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Wish
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your wishes silly!{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default WishForm;
