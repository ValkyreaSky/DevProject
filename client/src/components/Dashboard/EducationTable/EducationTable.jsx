import React from 'react';
import moment from 'moment';
import Button from 'components/common/Button/Button';

const EducationTable = ({ education, handleDeleteEducation }) => {
  let render;

  if (!education || education.length === 0) {
    render = <p>No education!</p>;
  } else if (education) {
    render = (
      <div className="table-responsive">
        <p>Education</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">School</th>
              <th scope="col">Degree</th>
              <th scope="col">Years</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {education.map(item => (
              <tr key={item._id}>
                <td>{item.school}</td>
                <td>{item.degree}</td>
                <td>{moment(item.from).format('DD-MM-YYYY')} - {item.to ? moment(item.to).format('DD-MM-YYYY') : 'Now'}</td>
                <td>
                  <Button
                    text="Remove"
                    click={() => handleDeleteEducation(item._id)}
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

export default EducationTable;
