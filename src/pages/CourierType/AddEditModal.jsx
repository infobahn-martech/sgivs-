import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomModal from '../../components/common/CustomModal';
import useCourierTypeReducer from '../../stores/CourierTypeReducer';

// Updated schema with isEZPass as a boolean
const courierTypeSchema = z.object({
  name: z
    .string()
    .nonempty('Name is required')
    .max(20, 'Name must be 10 characters or less'),
});

export function AddEditModal({ showModal, closeModal, onRefreshCourierType }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(courierTypeSchema),
    defaultValues: {
      name: '',
    },
  });

  const { postData, patchData, isLoading } = useCourierTypeReducer(
    (state) => state
  );

  // Prefill form when editing
  useEffect(() => {
    if (showModal?.id) {
      reset({ name: showModal?.name || '' });
    } else {
      reset();
    }
  }, [showModal?.id]);

  const onSubmit = (data) => {
    if (showModal?.id) {
      patchData({ id: showModal.id, ...data }, () => {
        onRefreshCourierType();
      });
    } else {
      postData(data, () => {
        onRefreshCourierType();
      });
    }
    closeModal();
  };

  const renderHeader = () => (
    <>
      <h4 className="modal-title">
        {showModal?.id ? 'Edit Courier Type' : 'Add Courier Type'}
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
