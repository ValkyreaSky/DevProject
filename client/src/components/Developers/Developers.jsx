import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from 'components/common/Spinner/Spinner';
import DeveloperItem from 'components/Developers/DeveloperItem/DeveloperItem';
import BackButton from 'components/common/BackButton/BackButton';
import { asyncGetProfiles } from 'store/actions/profile';

class Developers extends Component {
  componentWillMount() {
    const { asyncGetProfiles } = this.props;
    asyncGetProfiles();
  }

  render() {
    let render;
    const { profiles, isLoading, history } = this.props;

    if (isLoading || profiles === null) {
      render = <Spinner />;
    } else if (profiles && profiles.length === 0) {
      render = <h1>no profiles</h1>;
    } else if (profiles && profiles.length > 0) {
      render = (
        <div>
          <BackButton click={() => history.push('/dashboard')} />
          {profiles.map(profile => <DeveloperItem key={profile._id} developer={profile} />)}
        </div>
      );
    }
    return render;
  }
}

Developers.defaultProps = {
  profiles: [],
};

Developers.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  asyncGetProfiles: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  profiles: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
};

const mapStateToProps = state => ({
  profiles: state.profile.profiles,
  isLoading: state.profile.loading,
});

export default connect(mapStateToProps, {
  asyncGetProfiles,
})(Developers);
