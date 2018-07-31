import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './DeveloperItem.scss';

const DeveloperItem = ({ developer }) => (
  <div className="developer-item">
    {developer.location && <p className="developer-item__location">{developer.location}</p>}
    <img src={developer.user.avatar} alt="" className="rounded-circle developer-item__image" />
    <p className="developer-item__name">{developer.user.name}</p>
    <p className="developer-item__status">
      {developer.status} {developer.company && `at ${developer.company}`}
    </p>
    <Link to={`/profile/${developer.handle}`}>View Profile</Link>
  </div>
);

DeveloperItem.propTypes = {
  developer: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DeveloperItem;
