import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomModal from '../../components/common/CustomModal';
import useCategoryReducer from '../../stores/CategoryReducer';

const nameSchema = z.object({
  name: z
    .string()
    .nonempty('Name is required')
    .max(10, 'Name must be 10 characters or less'),
});

export function AddEditModal({ showModal, closeModal }) {
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
    },
  });

  const { postData, patchData, isLoading } = useCategoryReducer(
    (state) => state
  );

  // Prefill form when editing
  useEffect(() => {
    if (showModal?.id) {
      setValue('name', showModal?.name || '');
    } else {
      reset(); // clear form when adding
    }
  }, [showModal?.id]);

  const onSubmit = (data) => {
    if (showModal?.id) {
      patchData({ id: showModal.id, ...data });
    } else {
      postData(data);
    }
    closeModal(); // close modal after submission
  };

  const renderHeader = () => (
    <h4 className="modal-title">
      {showModal?.id ? 'Edit Category' : 'Add Category'}
    </h4>
  );

  const renderBody = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="modal-body custom-scroll">
        <div className="row">
          <div className="col-lg-6">
            <div className="form-group forms-custom">
              <label htmlFor="name" className="label">
                Name<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                autoComplete="off"
                maxLength={10}
                {...register('name')}
              />
              {errors.name && (
                <span className="error">{errors.name.message}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary btn-modalSubmit"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary btn-rounded btn-modalSubmit justify-content-center"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Save'}
        </button>
      </div>
    </form>
  );

  return (
    <CustomModal
      className="modal fade show"
      dialgName="modal-dialog modal-lg modal-dialog-centered add-employee-modal"
      show={!!showModal}
      closeModal={closeModal}
      body={renderBody()}
      header={renderHeader()}
      isLoading={false}
    />
  );
}
