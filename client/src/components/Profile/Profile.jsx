import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from 'components/common/Spinner/Spinner';
import Aux from 'components/hoc/Aux/Aux';
import ExperienceItem from 'components/Profile/ExperienceItem/ExperienceItem';
import EducationItem from 'components/Profile/EducationItem/EducationItem';
import { asyncGetProfileByHandle } from 'store/actions/profile';
import './Profile.scss';

class Profile extends Component {
  componentWillMount() {
    const { match, asyncGetProfileByHandle } = this.props;
    if (match.params.handle) {
      asyncGetProfileByHandle(match.params.handle);
    }
  }

  render() {
    let render;
    const { profile, isLoading } = this.props;

    if (isLoading === true || profile === null) {
      render = <Spinner />;
    } else {
      render = (
        <div className="profile__box">
          <div className="profile__heading">
            <img className="profile__image" src={profile.user.avatar} alt="" />
            <p className="profile__name">{profile.user.name}</p>
            <p className="profile__status">
              {profile.status} {profile.company && `at ${profile.company}`}
            </p>
            <p className="profile__location">{profile.location}</p>
          </div>
          <p className="profile__bio mb-0">{profile.bio}</p>
          <div className="profile__skills mb-4">
            {profile.skills.map(skill => <span key={skill} className="profile__skill">{skill}</span>)}
          </div>
          <div>{profile.experience.map(exp => (
            <ExperienceItem key={exp._id} experience={exp} />
          ))}
          </div>
          <div>{profile.education.map(edu => <EducationItem key={edu._id} education={edu} />)}</div>
          <div className="profile__links">
            <span className="profile__link">{profile.website && <a href={`///${profile.website}`}>Website</a>}</span>
            <span className="profile__link">{profile.githubUsername && <a href={`https://www.github.com/${profile.githubUsername}`}>GitHub</a>}</span>
            {profile && profile.social && Object.keys(profile.social).length > 0 && (
              <Aux>
                <span className="profile__link">{profile.social.facebook && <a href={`${profile.social.facebook}`}>Facebook</a>}</span>
                <span className="profile__link">{profile.social.twitter && <a href={`${profile.social.twitter}`}>Twitter</a>}</span>
                <span className="profile__link">{profile.social.instagram && <a href={`${profile.social.instagram}`}>Instagram</a>}</span>
                <span className="profile__link">{profile.social.youtube && <a href={`${profile.social.youtube}`}>Youtube</a>}</span>
                <span className="profile__link">{profile.social.linkedin && <a href={`${profile.social.linkedin}`}>LinkedIn</a>}</span>
              </Aux>
            )}
          </div>
        </div>
      );
    }
    return render;
  }
}

Profile.defaultProps = {
  profile: null,
};

Profile.propTypes = {
  asyncGetProfileByHandle: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  profile: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
  isLoading: state.profile.loading,
  profile: state.profile.developerProfile,
});

export default connect(mapStateToProps, {
  asyncGetProfileByHandle,
})(Profile);
