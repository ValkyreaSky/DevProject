import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { asyncAddEducation } from 'store/actions/profile';
import Button from 'components/common/Button/Button';
import BackButton from 'components/common/BackButton/BackButton';
import FormInput from 'components/forms/FormInput/FormInput';

const validate = ({
  school, degree, fieldOfStudy, from,
}) => {
  const errors = {};

  if (!school) {
    errors.school = 'This field is required!';
  }

  if (!degree) {
    errors.degree = 'This field is required!';
  }

  if (!fieldOfStudy) {
    errors.fieldOfStudy = 'This field is required!';
  }

  if (!from) {
    errors.from = 'This field is required!';
  }

  return errors;
};

class AddEducationForm extends Component {
  state = {
    current: true,
  }

  onFormSubmit = (values) => {
    const { current } = this.state;
    const { asyncAddEducation, history } = this.props;

    return asyncAddEducation({
      ...values, current,
    }, history);
  }

  handleToggleCurrent = () => {
    this.setState(prevState => ({
      current: !prevState.current,
    }));
  }

  render() {
    const {
      handleSubmit, history, valid, pristine,
    } = this.props;
    const { current } = this.state;

    return (
      <form onSubmit={handleSubmit(this.onFormSubmit)}>
        <div className="row">
          <div className="col-md-5 m-auto">
            <BackButton click={() => history.push('/dashboard')} />
            <p className="text-center form-title">Add Education</p>
            <Field
              name="school"
              component={FormInput}
              inputType="textinput"
              type="text"
              placeholder="* School Name"
              label="School Name"
            />
            <Field
              name="degree"
              component={FormInput}
              inputType="textinput"
              type="text"
              placeholder="* Degree"
              label="Degree"
            />
            <Field
              name="fieldOfStudy"
              component={FormInput}
              inputType="textinput"
              type="text"
              placeholder="* Field Of Study"
              label="Field Of Study"
            />
            <Field
              name="from"
              component={FormInput}
              inputType="textinput"
              type="date"
              placeholder="From"
              label="From"
            />
            {current ? null : (
              <Field
                name="to"
                component={FormInput}
                inputType="textinput"
                type="date"
                placeholder="To"
                label="To"
                disabled={current}
              />
            )}
            <div className="form-check mb-5">
              <input onChange={this.handleToggleCurrent} id="exampleCheck1" type="checkbox" className="form-check-input" checked={current} />
              <label className="form-check-label" htmlFor="exampleCheck1">Current School</label>
            </div>
            <Field
              name="description"
              component={FormInput}
              inputType="textarea"
              placeholder="Description"
              label="Description"
            />
            <Button
              block
              type="submit"
              disabled={!valid || pristine}
              text="Save"
            />
          </div>
        </div>
      </form>
    );
  }
}

AddEducationForm.propTypes = {
  valid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  asyncAddEducation: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default compose(
  withRouter,
  connect(undefined, {
    asyncAddEducation,
  }),
  reduxForm({
    form: 'addEducationForm', validate, enableReinitialize: true,
  }),
)(AddEducationForm);
