import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomModal from '../../components/common/CustomModal';
import CustomSelect from '../../components/common/CustomSelect';
import useOptionalServiceReducer from '../../stores/OptionalServiceReducer';

const USE_MOCK = true;

// ✅ Dummy centers list (Select Center dropdown)
const mockOptionalServices = [
  { id: '1', optionalServiceName: 'Optional Service 1' },
  { id: '2', optionalServiceName: 'Optional Service 2' },
  { id: '3', optionalServiceName: 'Optional Service 3' },
  { id: '4', optionalServiceName: 'Optional Service 4' },
];

const nameSchema = z.object({
  name: z
    .string()
    .nonempty('Name is required')
    .max(20, 'Name must be 20 characters or less'),
  optionalServiceId: z.string().nonempty('Optional Service is required'),
});

export function AddEditModal({ showModal, closeModal, onRefreshOptionalService }) {
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
      optionalServiceId: '',
    },
  });

  const { postData, patchData, isLoading, getAllOptionalService, optionalServices } =
    useOptionalServiceReducer((state) => state);

  const selectedOptionalServiceId = watch('optionalServiceId');

  // ✅ Load center list (API mode only)
  useEffect(() => {
    if (!USE_MOCK) getAllOptionalService();
  }, []);

  // ✅ Fill form for edit / clear for add
  useEffect(() => {
    const optionalServices = USE_MOCK ? mockOptionalServices : optionalServices;

    if (showModal?.id && (optionalServices?.length || 0) > 0) {
      // Your listing page now uses counterName/centerName.
      // For edit modal, accept both old & new keys safely.
      setValue('name', showModal?.optionalServiceName || showModal?.name || '');
      setValue(
        'optionalServiceId',
        String(showModal?.optionalServiceId || showModal?.optionalService?.id || showModal?.optionalServiceId || '')
      );
    } else if (!showModal?.id) {
      reset();
    }
  }, [showModal?.id, optionalServices, reset, setValue]);

  // ✅ Options for select
  const optionalServiceOptions = useMemo(() => {
    const optionalServices = USE_MOCK ? mockOptionalServices : optionalServices || [];
    return optionalServices.map((item) => ({
      label: item.optionalServiceName,
      value: String(item.id),
    }));
  }, [optionalServices]);

  // ✅ Dummy submit (no API)
  const onSubmit = (data) => {
    if (USE_MOCK) {
      // Just close modal + refresh UI
      onRefreshOptionalService?.();
      closeModal?.();
      return;
    }

    if (showModal?.id) {
      patchData({ id: showModal.id, ...data }, () => {
        onRefreshOptionalService?.();
      });
    } else {
      postData(data, () => {
        onRefreshOptionalService?.();
      });
    }
    closeModal?.();
  };

  const renderHeader = () => (
    <>
      <h4 className="modal-title">
        {showModal?.id ? 'Edit Optional Service' : 'Add Optional Service'}
      </h4>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
        onClick={closeModal}
      />
    </>
  );

  const renderBody = () => (
    <div className="modal-body">
      <div className="row">
        <div className="col-sm-6">
          <div className="form-group forms-custom">
            <label htmlFor="optionalServiceId" className="label">
              Select Optional Service<span className="text-danger">*</span>
            </label>

            <CustomSelect
              options={optionalServiceOptions}
              value={
                optionalServiceOptions.find(
                  (option) => option.value === String(selectedOptionalServiceId || '')
                ) || null
              }
              onChange={(selected) => {
                setValue('optionalServiceId', selected?.value || '');
              }}
              placeholder="Select Optional Service"
              showIndicator={false}
              className="form-select form-control"
            />

            {errors.optionalServiceId && (
              <span className="error">{errors.optionalServiceId.message}</span>
            )}
          </div>
        </div>

        <div className="col-sm-6">
          <div className="form-group forms-custom">
            <label htmlFor="name" className="label">
              Optional Service Name<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              autoComplete="off"
              maxLength={20}
              placeholder="Enter optional service name"
              {...register('name')}
            />
            {errors.name && (
              <span className="error">{errors.name.message}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderFooter = () => (
    <div className="modal-footer bottom-btn-sec">
      <button type="button" className="btn btn-cancel" onClick={closeModal}>
        Cancel
      </button>
      <button
        type="button"
        className="btn btn-submit"
        disabled={USE_MOCK ? false : isLoading}
        onClick={handleSubmit(onSubmit)}
      >
        {USE_MOCK ? 'Save' : isLoading ? 'Loading...' : 'Save'}
      </button>
    </div>
  );

  return (
    <CustomModal
      className="modal fade category-modal show"
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
