import useAuthReducer from '../../stores/AuthReducer';
import { dateFormat } from '../../utils/helpers';
import editIcon from '../../assets/images/edit-icon-pen.svg';
import { useEffect, useState } from 'react';
import EditProfile from './EditProfile';

const MyAccount = () => {
  const { profileData, successMessage, getUserProfile } = useAuthReducer(
    (state) => state
  );

  const [isEdit, setIsEdit] = useState(false);

  console.log('isEdit', isEdit);

  useEffect(() => {
    if (successMessage) {
      setIsEdit(false);
      getUserProfile({ details: 'all' });
      useAuthReducer.setState({ successMessage: '' });
    }
  }, [successMessage]);

  return (
    <>
      <div className="box-section">
        <button
          type="button"
          class="btn btn-edit"
          onClick={() => setIsEdit(profileData)}
        >
          <img src={editIcon} alt="" />
        </button>
        <div className="col-md-6 boxes">
          <div className="box-inner">
            <div className="lft-txt">
              <span className="light">First Name</span>
              <span className="dark-name">{profileData?.user?.firstName}</span>
            </div>
          </div>
        </div>
        <div className="col-md-6 boxes box2">
          <div className="box-inner">
            <div className="lft-txt">
              <span className="light">Last Name</span>
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
        {/* <div className="col-md-6 boxes">
          <div className="box-inner">
            <div className="lft-txt">
              <span className="light">Joined Date</span>
              <span className="dark-name">
                {dateFormat(profileData?.user?.createdAt)}
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-6 boxes">
          <div className="box-inner">
            <div className="lft-txt">
              <span className="light">Credit Card Available</span>
              <span className="dark-name">
                {profileData?.user?.isCreditCardAvailable ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div> */}
      </div>
      {isEdit && (
        <EditProfile
          showModal={isEdit}
          closeModal={() => setIsEdit(false)}
          profileData={profileData}
        />
      )}
    </>
  );
};

export default MyAccount;
