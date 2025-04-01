import useAuthReducer from '../../stores/AuthReducer';
import { dateFormat } from '../../utils/helpers';

const MyAccount = () => {
  const { profileData } = useAuthReducer((state) => state);

  console.log('profileData', profileData);

  return (
    <div className="box-section">
      <div className="col-md-6 boxes">
        <div className="box-inner">
          <div className="lft-txt">
            <span className="light">First name</span>
            <span className="dark-name">{profileData?.user?.firstName}</span>
          </div>
        </div>
      </div>
      <div className="col-md-6 boxes box2">
        <div className="box-inner">
          <div className="lft-txt">
            <span className="light">Last name</span>
            <span className="dark-name"> {profileData?.user?.lastName}</span>
          </div>
        </div>
      </div>
      <div className="col-md-6 boxes">
        <div className="box-inner">
          <div className="lft-txt">
            <span className="light">Email Address</span>
            <span className="dark-name">{profileData?.user?.email}</span>
          </div>
        </div>
      </div>
      <div className="col-md-6 boxes">
        <div className="box-inner">
          <div className="lft-txt">
            <span className="light">Phone Number</span>
            <span className="dark-name">
              {profileData?.user?.countryCode + profileData?.user?.phone}
            </span>
          </div>
        </div>
      </div>
      <div className="col-md-6 boxes">
        <div className="box-inner">
          <div className="lft-txt">
            <span className="light">Joined date</span>
            <span className="dark-name">
              {dateFormat(profileData?.user?.createdAt)}
            </span>
          </div>
        </div>
      </div>
      <div className="col-md-6 boxes">
        <div className="box-inner">
          <div className="lft-txt">
            <span className="light">Credit card available</span>
            <span className="dark-name">
              {profileData?.user?.isCreditCardAvailable ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
