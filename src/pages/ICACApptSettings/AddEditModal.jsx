import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomModal from '../../components/common/CustomModal';
import useCounterReducer from '../../stores/CounterReducer';
import CustomSelect from './Select';

const USE_MOCK = true;

// ✅ Dummy centers list (Select Center dropdown)
const mockCenters = [
  { id: '1', name: 'Dubai Center' },
  { id: '2', name: 'Abu Dhabi Center' },
  { id: '3', name: 'Sharjah Center' },
  { id: '4', name: 'Ajman Center' },
];

const nameSchema = z.object({
  name: z
    .string()
    .nonempty('Name is required')
    .max(20, 'Name must be 20 characters or less'),
  centerId: z.string().nonempty('Center is required'),
});

export function AddEditModal({ showModal, closeModal, onRefreshCounter }) {
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
      centerId: '',
    },
  });

  const { postData, patchData, isLoading, getAllCenter, centers } =
    useCounterReducer((state) => state);

  const selectedCenterId = watch('centerId');

  // ✅ Load center list (API mode only)
  useEffect(() => {
    if (!USE_MOCK) getAllCenter();
  }, []);

  // ✅ Fill form for edit / clear for add
  useEffect(() => {
    const centers = USE_MOCK ? mockCenters : centers;

    if (showModal?.id && (centers?.length || 0) > 0) {
      // Your listing page now uses counterName/centerName.
      // For edit modal, accept both old & new keys safely.
      setValue('name', showModal?.counterName || showModal?.name || '');
      setValue(
        'centerId',
        String(showModal?.centerId || showModal?.center?.id || showModal?.centerId || '')
      );
    } else if (!showModal?.id) {
      reset();
    }
  }, [showModal?.id, centers, reset, setValue]);

  // ✅ Options for select
  const centerOptions = useMemo(() => {
    const centers = USE_MOCK ? mockCenters : centers || [];
    return centers.map((item) => ({
      label: item.name,
      value: String(item.id),
    }));
  }, [centers]);

  // ✅ Dummy submit (no API)
  const onSubmit = (data) => {
    if (USE_MOCK) {
      // Just close modal + refresh UI
      onRefreshCounter?.();
      closeModal?.();
      return;
    }

    if (showModal?.id) {
      patchData({ id: showModal.id, ...data }, () => {
        onRefreshCounter?.();
      });
    } else {
      postData(data, () => {
        onRefreshCounter?.();
      });
    }
    closeModal?.();
  };

  const renderHeader = () => (
    <>
      <h4 className="modal-title">
        {showModal?.id ? 'Edit Counter' : 'Add Counter'}
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
            <label htmlFor="centerId" className="label">
              Select Center<span className="text-danger">*</span>
            </label>
            <CustomSelect
              options={centerOptions}
              value={
                centerOptions.find(
                  (option) => option.value === String(selectedCenterId || '')
                ) || null
              }
              onChange={(selected) => {
                setValue('centerId', selected?.value || '');
              }}
              placeholder="Select Center"
              showIndicator={false}
              className="form-select form-control"
            />

            {errors.centerId && (
              <span className="error">{errors.centerId.message}</span>
            )}
          </div>
        </div>

        <div className="col-sm-6">
          <div className="form-group forms-custom">
            <label htmlFor="name" className="label">
              Counter Name<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              autoComplete="off"
              maxLength={20}
              placeholder="Enter counter name"
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
