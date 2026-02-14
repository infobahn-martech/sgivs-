import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomModal from '../../components/common/CustomModal';
import useCenterReducer from '../../stores/CenterReducer';

const nameSchema = z.object({
  name: z
    .string()
    .nonempty('Name is required')
    .max(20, 'Name must be 10 characters or less'),
  isEZPass: z.boolean().optional(),
  country_id: z.union([z.string(), z.number()]).optional(),
  mission_id: z.union([z.string(), z.number()]).optional(),
});

export function AddEditModal({ showModal, closeModal, onRefreshCenter }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: '',
      isEZPass: false,
      country_id: '',
      mission_id: '',
    },
  });

  const countryId = watch('country_id');

  const {
    postData,
    patchData,
    isLoading,
    countryList,
    missionList,
    isLoadingCountries,
    isLoadingMissions,
    getCountries,
    getMissionsByCountry,
  } = useCenterReducer((state) => state);

  // Load countries on mount
  useEffect(() => {
    getCountries();
  }, []);

  const prevCountryIdRef = useRef(undefined);

  // When country changes: fetch missions for that country; clear mission only when user changes country
  useEffect(() => {
    if (countryId) {
      getMissionsByCountry(countryId);
    } else {
      useCenterReducer.setState({ missionList: [] });
    }
    if (prevCountryIdRef.current !== undefined && prevCountryIdRef.current !== countryId) {
      setValue('mission_id', '');
    }
    prevCountryIdRef.current = countryId;
  }, [countryId]);

  // Prefill form when editing
  useEffect(() => {
    if (showModal?.id) {
      setValue('name', showModal?.name || '');
      setValue('isEZPass', showModal?.isEZPass ?? false);
      setValue('country_id', showModal?.country_id ?? '');
      setValue('mission_id', showModal?.mission_id ?? '');
      if (showModal?.country_id) {
        getMissionsByCountry(showModal.country_id);
      }
    } else {
      reset();
    }
  }, [showModal?.id]);

  const onSubmit = (data) => {
    if (showModal?.id) {
      patchData({ id: showModal.id, ...data }, () => {
        onRefreshCenter();
      });
    } else {
      postData(data, () => {
        onRefreshCenter();
      });
    }
    closeModal();
  };

  const renderHeader = () => (
    <>
      <h4 className="modal-title">
        {showModal?.id ? 'Edit Center' : 'Add Center'}
      </h4>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
        onClick={closeModal}
      />
    </>
  );

  const renderBody = () => (
    <>
      <div className="modal-body custom-scroll">
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                autoComplete="off"
                maxLength={20}
                {...register('name')}
              />
              {errors.name && (
                <span className="error">{errors.name.message}</span>
              )}
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="country_id" className="form-label">
                Country
              </label>
              <select
                id="country_id"
                className="form-control form-select"
                {...register('country_id')}
                disabled={isLoadingCountries}
              >
                <option value="">Select Country</option>
                {countryList.map((item) => (
                  <option key={item.country_id} value={item.country_id}>
                    {item.country_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="mission_id" className="form-label">
                Mission
              </label>
              <select
                id="mission_id"
                className="form-control form-select"
                {...register('mission_id')}
                disabled={!countryId || isLoadingMissions}
              >
                <option value="">Select Mission</option>
                {missionList.map((item) => (
                  <option key={item.mission_id} value={item.mission_id}>
                    {item.mission_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderFooter = () => (
    <>
      <div className="modal-footer bottom-btn-sec">
        <button type="button" className="btn btn-cancel" onClick={closeModal}>
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-submit"
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
        >
          {isLoading ? 'Loading...' : 'Save'}
        </button>
      </div>
    </>
  );

  return (
    <CustomModal
      className="modal fade category-mgmt-modal show"
      dialgName="modal-dialog-scrollable"
      show={!!showModal}
      closeModal={closeModal}
      body={renderBody()}
      header={renderHeader()}
      footer={renderFooter()}
      isLoading={false}
    />
  );
}
