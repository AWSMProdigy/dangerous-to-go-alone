import React from 'react';
import { Link } from 'react-router-dom';

const WishList = ({
  wishes,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!wishes.length) {
    return <h3>If you don't wish for anything how will santa know what to buy?</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {wishes &&
        wishes.map((wish) => (
          <div key={wish._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${wish.wishAuthor}`}
                >
                  {wish.wishAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    wished this wish on {wish.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You wished this wish on {wish.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{wish.wishText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/wishes/${wish._id}`}
            >
              Leave your thoughts on this game.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default WishList;
