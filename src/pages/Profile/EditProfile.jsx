import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomModal from '../../components/common/CustomModal';
import useAuthReducer from '../../stores/AuthReducer';
import { Spinner } from 'react-bootstrap';

const profileSchema = z.object({
  firstName: z.string().nonempty('First Name is required'),
  lastName: z.string().nonempty('Last Name is required'),
});

const EditProfile = ({ showModal, closeModal, profileData }) => {
  const { patchUserProfile, profileEditLoader } = useAuthReducer(
    (state) => state
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: profileData?.user?.firstName || '',
      lastName: profileData?.user?.lastName || '',
    },
  });

  const onSubmit = (data) => {
    patchUserProfile({
      ...data,
    });
  };

  return (
    <CustomModal
      className="modal modal-small-width fade edit-profile-modal"
      dialgName="modal-dialog modal-dialog-centered modal-dialog-scrollable"
      show={showModal}
      header={
        <>
          <h5 className="modal-title">Edit Profile</h5>
          <button type="button" className="btn-close" onClick={closeModal} />
        </>
      }
      body={
        <div className="modal-body modal-form">
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
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
        </div>
      }
    />
  );
};

export default EditProfile;
