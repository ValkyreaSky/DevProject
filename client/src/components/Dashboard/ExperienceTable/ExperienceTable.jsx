import React from 'react';
import moment from 'moment';
import Button from 'components/common/Button/Button';

const ExperienceTable = ({ experience, handleDeleteExperience }) => {
  let render;
  if (!experience || experience.length === 0) {
    render = <p>No experience!</p>;
  } else if (experience) {
    render = (
      <div className="table-responsive">
        <p>Experience</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Company</th>
              <th scope="col">Title</th>
              <th scope="col">Years</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {experience.map(item => (
              <tr key={item._id}>
                <td>{item.company}</td>
                <td>{item.title}</td>
                <td>{moment(item.from).format('DD-MM-YYYY')} - {item.to ? moment(item.to).format('DD-MM-YYYY') : 'Now'}</td>
                <td>
                  <Button
                    text="Remove"
                    click={() => handleDeleteExperience(item._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return render;
};

export default ExperienceTable;
