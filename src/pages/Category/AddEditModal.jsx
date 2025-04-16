import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomModal from '../../components/common/CustomModal';
import useCategoryReducer from '../../stores/CategoryReducer';

// Updated schema with isEZPass as a boolean
const nameSchema = z.object({
  name: z
    .string()
    .nonempty('Name is required')
    .max(10, 'Name must be 10 characters or less'),
  isEZPass: z.boolean().optional(),
});

export function AddEditModal({ showModal, closeModal, onRefreshCategory }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: '',
      isEZPass: false,
    },
  });

  const { postData, patchData, isLoading } = useCategoryReducer(
    (state) => state
  );

  // Prefill form when editing
  useEffect(() => {
    if (showModal?.id) {
      setValue('name', showModal?.name || '');
      setValue('isEZPass', showModal?.isEZPass || false);
    } else {
      reset();
    }
  }, [showModal?.id]);

  const onSubmit = (data) => {
    if (showModal?.id) {
      patchData({ id: showModal.id, ...data }, () => {
        onRefreshCategory();
      });
    } else {
      postData(data, () => {
        onRefreshCategory();
      });
    }
    closeModal();
  };

  const renderHeader = () => (
    <>
      <h4 className="modal-title">
        {showModal?.id ? 'Edit Category' : 'Add Category'}
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
        <div className="set-dealine-wrp">
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
                  maxLength={40}
                  {...register('name')}
                />
                {errors.name && (
                  <span className="error">{errors.name.message}</span>
                )}
              </div>
            </div>

            <div className="col-12">
              <div className="form-group">
                <label htmlFor="isEZPass" className="form-label me-2">
                  EZ Pass
                </label>
                <input
                  type="checkbox"
                  id="isEZPass"
                  className="form-check-input"
                  {...register('isEZPass')}
                />
                {errors.isEZPass && (
                  <span className="error">{errors.isEZPass.message}</span>
                )}
              </div>
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
