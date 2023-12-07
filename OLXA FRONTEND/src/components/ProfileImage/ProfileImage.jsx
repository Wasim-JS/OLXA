import './ProfileImage.scss'
import PropTypes from 'prop-types';

const ProfileImage = ({pimage}) => {

  return (
    <img className='pimg' src={pimage} alt="profile image" />
  )
}


ProfileImage.propTypes = {
    pimage:PropTypes.string
}
ProfileImage.defaultProps = {
    pimage: 'https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png'
};
export default ProfileImage