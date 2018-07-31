import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import Aux from 'components/hoc/Aux/Aux';
import Button from 'components/common/Button/Button';
import BackButton from 'components/common/BackButton/BackButton';
import FormInput from 'components/forms/FormInput/FormInput';
import { asyncCreateProfile, asyncGetProfile } from 'store/actions/profile';
import Spinner from 'components/common/Spinner/Spinner';

const dropDownOptions = [
  {
    key: 'null', text: '* Select Professional Status', value: '',
  },
  {
    key: 'Developer', text: 'Developer', value: 'Developer',
  },
  {
    key: 'Junior Developer', text: 'Junior Developer', value: 'Junior Developer',
  },
  {
    key: 'Senior Developer', text: 'Senior Developer', value: 'Senior Developer',
  },
  {
    key: 'Manager', text: 'Manager', value: 'Manager',
  },
  {
    key: 'Student or Learning', text: 'Student or Learning', value: 'Student or Learning',
  },
  {
    key: 'Instructor', text: 'Instructor', value: 'Instructor',
  },
  {
    key: 'Intern', text: 'Intern', value: 'Intern',
  },
  {
    key: 'Other', text: 'Other', value: 'Other',
  },
];

const validate = ({ handle, status, skills }) => {
  const errors = {};

  if (!handle) {
    errors.handle = 'This field is required!';
  }

  if (!status) {
    errors.status = 'This field is required!';
  }

  if (!skills) {
    errors.skills = 'This field is required!';
  }

  return errors;
};

class EditProfileForm extends Component {
  state = {
    showSocialInputs: false,
  }

  componentWillMount() {
    const { asyncGetProfile, initialize, loadProfile } = this.props;

    const loadForm = async () => {
      asyncGetProfile().then(data => initialize({
        ...data,
        skills: data.skills.join(','),
      }));
    };

    if (loadProfile) { loadForm(); }
  }

  onFormSubmit = (values) => {
    const { asyncCreateProfile, history } = this.props;

    return asyncCreateProfile(values, history);
  }

  handleToggleSocialInputs = () => {
    this.setState(prevState => ({
      showSocialInputs: !prevState.showSocialInputs,
    }));
  }

  render() {
    const { showSocialInputs } = this.state;
    const {
      isLoading, handleSubmit, showBackButton, history, formName, valid, pristine,
    } = this.props;

    const form = isLoading ? (
      <Spinner />
    ) : (
      <form onSubmit={handleSubmit(this.onFormSubmit)}>
        <div className="row">
          <div className="col-md-5 m-auto">
            {showBackButton && <BackButton click={() => history.push('/dashboard')} />}
            {formName && (
            <p className="text-center form-title">
              {formName}
            </p>
            )}
            <Field
              name="handle"
              component={FormInput}
              inputType="textinput"
              type="text"
              placeholder="* Profile Handle"
              label="Profile Handle"
            />
            <Field
              name="status"
              component={FormInput}
              inputType="select"
              label="Status"
              options={dropDownOptions}
            />
            <Field
              name="company"
              component={FormInput}
              inputType="textinput"
              type="text"
              placeholder="Company"
              label="Company"
            />
            <Field
              name="website"
              component={FormInput}
              inputType="textinput"
              type="text"
              placeholder="Website"
              label="Website"
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
              name="skills"
              component={FormInput}
              inputType="textinput"
              type="text"
              placeholder="* Skills"
              label="Skills"
            />
            <Field
              name="githubUsername"
              component={FormInput}
              inputType="textinput"
              type="text"
              placeholder="Github Username"
              label="Github Username"
            />
            <Field
              name="bio"
              component={FormInput}
              inputType="textarea"
              placeholder="Biography"
              label="Biography"
            />
            <Button
              block
              classes="mb-5"
              text={`${showSocialInputs ? 'Hide' : 'Show'} Social Networks Links`}
              click={this.handleToggleSocialInputs}
            />
            {showSocialInputs ? (
              <Aux>
                <Field
                  name="facebook"
                  type="text"
                  component={FormInput}
                  inputType="textinput"
                  placeholder="Facebook Account"
                  label="Facebook Account"
                />
                <Field
                  name="twitter"
                  type="text"
                  component={FormInput}
                  inputType="textinput"
                  placeholder="Twitter Account"
                  label="Twitter Account"
                />
                <Field
                  name="instagram"
                  type="text"
                  component={FormInput}
                  inputType="textinput"
                  placeholder="Instagram Account"
                  label="Instagram Account"
                />
                <Field
                  name="youtube"
                  type="text"
                  component={FormInput}
                  inputType="textinput"
                  placeholder="Youtube Account"
                  label="Youtube Account"
                />
                <Field
                  name="linkedin"
                  type="text"
                  component={FormInput}
                  inputType="textinput"
                  placeholder="LinkedIn Account"
                  label="LinkedIn Account"
                />
              </Aux>
            ) : (
              null
            )}
            <Button
              block
              type="submit"
              classes="mb-5"
              text="Save"
              disabled={!valid || pristine}
            />
          </div>
        </div>
      </form>
    );
    return form;
  }
}

EditProfileForm.defaultProps = {
  formName: '',
  showBackButton: true,
  loadProfile: false,
};

EditProfileForm.propTypes = {
  formName: PropTypes.string,
  valid: PropTypes.bool.isRequired,
  showBackButton: PropTypes.bool,
  pristine: PropTypes.bool.isRequired,
  asyncCreateProfile: PropTypes.func.isRequired,
  loadProfile: PropTypes.bool,
  asyncGetProfile: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  // initialValues: PropTypes.objectOf(PropTypes.any).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => 
  // const skills = (state.profile.profile && state.profile.profile.skills)
  //   ? state.profile.profile.skills.join(',')
  //   : null;
  // const social = (state.profile.profile && state.profile.profile.social)
  //   ? state.profile.profile.social
  //   : null;
   ({
    isLoading: state.profile.loading,
    // initialValues: {
    //   ...state.profile.profile,
    //   ...social,
    //   skills,
    // },
  })
;

export default compose(
  reduxForm({
    form: 'editProfileForm', validate, enableReinitialize: true, keepDirtyOnReinitialize: true,
  }),
  withRouter,
  connect(mapStateToProps, {
    asyncCreateProfile, asyncGetProfile,
  }),
)(EditProfileForm);
