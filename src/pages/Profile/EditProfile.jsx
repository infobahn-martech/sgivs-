import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomModal from '../../components/common/CustomModal';
import useAuthReducer from '../../stores/AuthReducer';
import { Spinner } from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const profileSchema = z.object({
  firstName: z.string().nonempty('First Name is required'),
  lastName: z.string().nonempty('Last Name is required'),
  phoneNumber: z.string().nonempty('Phone number is required'),
  email: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email address'),
});

const EditProfile = ({ showModal, closeModal, profileData }) => {
  const { patchUserProfile, profileEditLoader } = useAuthReducer(
    (state) => state
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: profileData?.user?.firstName || '',
      lastName: profileData?.user?.lastName || '',
      phoneNumber: profileData?.user?.phone || '',
      email: profileData?.user?.email || '',
    },
  });

  const onSubmit = (data) => {
    patchUserProfile({
      ...data,
    });
  };
  // edit-profile-modal
  return (
    <CustomModal
      className="modal modal-small-width fade set-deadline-modal edit-profile-modal"
      dialgName="modal-dialog modal-dialog-centered modal-dialog-scrollable"
      show={showModal}
      header={
        <>
          <h5 className="modal-title">Edit Profile</h5>
          <button type="button" className="btn-close" onClick={closeModal} />
        </>
      }
      body={
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-body modal-form">
          <div className="set-dealine-wrp">
            <div className="row">
            <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                className="form-control"
                placeholder="First Name"
                {...register('firstName')}
              />
              {errors.firstName && (
                <span className="error">{errors.firstName.message}</span>
              )}
            </div>
            </div>
            <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                className="form-control"
                placeholder="Last Name"
                {...register('lastName')}
              />
              {errors.lastName && (
                <span className="error">{errors.lastName.message}</span>
              )}
            </div>
            </div>
            <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <PhoneInput
                id="phoneNumber"
                className="form-control"
                placeholder="Enter phone number"
                defaultCountry="US"
                {...register('phoneNumber')}
              />
              {errors.phoneNumber && (
                <span className="error">{errors.phoneNumber.message}</span>
              )}
            </div>
            </div>
            <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="text"
                className="form-control"
                placeholder="Email"
                {...register('email')}
                disabled
              />
              {errors.email && (
                <span className="error">{errors.email.message}</span>
              )}
            </div>
            </div>
          </div>
          </div>  
          </div>
          <div className="modal-footer bottom-btn-sec">
            <button
              type="button"
              className="btn btn-cancel"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-submit">
              {profileEditLoader ? (
                <Spinner
                  size="sm"
                  as="span"
                  animation="border"
                  variant="light"
                  aria-hidden="true"
                  className="custom-spinner"
                />
              ) : (
                'Submit'
              )}
            </button>
          </div>
          </form>
          </>
          
      }
    />
  );
};

export default EditProfile;
