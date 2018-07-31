import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditProfileForm from 'components/forms/EditProfileForm/EditProfileForm';
import Spinner from 'components/common/Spinner/Spinner';
import Button from 'components/common/Button/Button';
import ExperienceTable from 'components/Dashboard/ExperienceTable/ExperienceTable';
import EducationTable from 'components/Dashboard/EducationTable/EducationTable';
import { asyncGetProfile, deleteAccount, asyncDeleteEducation, asyncDeleteExperience } from 'store/actions/profile';

class Dashboard extends Component {
  componentWillMount() {
    const { asyncGetProfile } = this.props;
    asyncGetProfile();
  }

  handleDeleteAccount = () => {
    const { deleteAccount, history } = this.props;
    deleteAccount(history);
  }

  render() {
    let render;
    const {
      isLoading, profile, asyncDeleteExperience, asyncDeleteEducation,
    } = this.props;

    if (isLoading) {
      render = <Spinner />;
    } else if (profile && Object.keys(profile).length === 0) {
      render = (
        <div>
          <p className="text-center mb-4">
            To use our site, you must first create your profile.
          </p>
          <EditProfileForm showBackButton={false} />
          <Button
            classes="m-auto d-block"
            click={this.handleDeleteAccount}
            text="Delete My Account"
          />
        </div>
      );
    } else {
      render = (
        <div>
          <p className="text-center form-title">
            Dashboard
          </p>
          {profile && (
            <ExperienceTable
              handleDeleteExperience={asyncDeleteExperience}
              experience={profile.experience}
            />
          )}
          {profile && (
            <EducationTable
              handleDeleteEducation={asyncDeleteEducation}
              education={profile.education}
            />
          )}
          <Button
            classes="m-auto d-block"
            click={this.handleDeleteAccount}
            text="Delete My Account"
          />
        </div>
      );
    }
    return render;
  }
}

Dashboard.defaultProps = {
  profile: {},
};

Dashboard.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  asyncGetProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  asyncDeleteEducation: PropTypes.func.isRequired,
  asyncDeleteExperience: PropTypes.func.isRequired,
  profile: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile.profile,
  isLoading: state.profile.loading,
});

export default connect(mapStateToProps, {
  asyncGetProfile, deleteAccount, asyncDeleteEducation, asyncDeleteExperience,
})(Dashboard);
