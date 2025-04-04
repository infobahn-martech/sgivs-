import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomModal from '../../components/common/CustomModal';
import useAuthReducer from '../../stores/AuthReducer';
import { Spinner } from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input';
import { parsePhoneNumber } from 'libphonenumber-js';
import 'react-phone-number-input/style.css';

const profileSchema = z.object({
  firstName: z.string().nonempty('First Name is required'),
  lastName: z.string().nonempty('Last Name is required'),
  // countryCode: z.string().nonempty('Country code is required'),
  phone: z.string().nonempty('Phone number is required'),
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
      countryCode: profileData?.user?.countryCode || '',
      phone: profileData?.user?.phone || '',
      email: profileData?.user?.email || '',
    },
  });

  const [fullPhoneNumber, setFullPhoneNumber] = useState(
    (profileData?.user?.countryCode || '') + (profileData?.user?.phone || '')
  );

  useEffect(() => {
    try {
      const parsed = parsePhoneNumber(fullPhoneNumber || '');
      if (parsed) {
        setValue('countryCode', `+${parsed.countryCallingCode}`);
        setValue('phone', parsed.nationalNumber);
      }
    } catch (error) {
      setValue('countryCode', '');
      setValue('phone', '');
    }
  }, [fullPhoneNumber, setValue]);

  const onSubmit = (data) => {
    patchUserProfile({
      firstName: data.firstName,
      lastName: data.lastName,
      countryCode: data.countryCode,
      phone: data.phone,
      email: data.email,
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
            <div className="form-group">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <PhoneInput
                id="phoneNumber"
                className="form-control"
                placeholder="Enter phone number"
                defaultCountry="IN"
                value={fullPhoneNumber}
                onChange={setFullPhoneNumber}
              />
              {errors.phone && (
                <span className="error">{errors.phone.message}</span>
              )}
              {/* {errors.countryCode && (
                <span className="error">{errors.countryCode.message}</span>
              )} */}
            </div>
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
