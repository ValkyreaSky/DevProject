import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './ExperienceItem.scss';

const ExperienceItem = ({
  experience: {
    title, company, location, from, to, description,
  },
}) => (
  <div className="experience-item">
    <p className="mb-1">
      <span className="font-weight-bold">{title}</span> at
      <span className="font-weight-bold"> {company}</span>
      {location && ` in ${location}`}
    </p>
    <div className="mb-1">{moment(from).format('DD-MM-YYYY')} - {to ? moment(to).format('DD-MM-YYYY') : 'now'}</div>
    <div className="mb-1">{description && description}</div>
  </div>
);

ExperienceItem.propTypes = {
  experience: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ExperienceItem;
