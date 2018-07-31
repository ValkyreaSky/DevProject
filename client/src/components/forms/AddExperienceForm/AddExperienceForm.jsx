import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { asyncAddExperience } from 'store/actions/profile';
import Button from 'components/common/Button/Button';
import BackButton from 'components/common/BackButton/BackButton';
import FormInput from 'components/forms/FormInput/FormInput';

const validate = ({ title, company, from }) => {
  const errors = {};

  if (!title) {
    errors.title = 'This field is required!';
  }

  if (!company) {
    errors.company = 'This field is required!';
  }

  if (!from) {
    errors.from = 'This field is required!';
  }

  return errors;
};

class AddExperienceForm extends Component {
  state = {
    current: true,
  }

  onFormSubmit = (values) => {
    const { asyncAddExperience, history } = this.props;
    const { current } = this.state;

    return asyncAddExperience({
      ...values,
      current,
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
            <p className="text-center form-title">Add Experience</p>
            <Field
              name="title"
              component={FormInput}
              inputType="textinput"
              type="text"
              placeholder="* Job Title"
              label="Job Title"
            />
            <Field
              name="company"
              component={FormInput}
              inputType="textinput"
              type="text"
              placeholder="* Company"
              label="Company"
            />
            <Field
              name="location"
              component={FormInput}
              inputType="textinput"
              type="text"
              placeholder="Location"
              label="Location"
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
              <input onChange={this.handleToggleCurrent} type="checkbox" id="exampleCheck1" className="form-check-input" checked={current} />
              <label className="form-check-label" htmlFor="exampleCheck1">Current Job</label>
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

AddExperienceForm.propTypes = {
  valid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  asyncAddExperience: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default compose(
  withRouter,
  connect(undefined, {
    asyncAddExperience,
  }),
  reduxForm({
    form: 'addExperienceForm', validate, enableReinitialize: true,
  }),
)(AddExperienceForm);
