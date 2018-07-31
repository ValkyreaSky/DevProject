import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './EducationItem.scss';

const EducationItem = ({
  education: {
    school, degree, fieldOfStudy, from, to, description,
  },
}) => (
  <div className="education-item">
    <p className="mb-1">
      <span className="font-weight-bold">{school}</span>,
      <span className="font-weight-bold"> {degree}</span>
      {fieldOfStudy && `, ${fieldOfStudy}`}
    </p>
    <p className="mb-1">{moment(from).format('DD-MM-YYYY')} - {to ? moment(to).format('DD-MM-YYYY') : 'now'}</p>
    <p className="mb-1">{description && description}</p>
  </div>
);

EducationItem.propTypes = {
  education: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EducationItem;
