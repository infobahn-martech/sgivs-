import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomModal from '../../components/common/CustomModal';
import useSubCategoryReducer from '../../stores/SubCategoryReducer';
import CustomSelect from './Select';

const nameSchema = z.object({
  name: z
    .string()
    .nonempty('Name is required')
    .max(10, 'Name must be 10 characters or less'),
  categoryId: z.string().nonempty('Category is required'),
});

export function AddEditModal({ showModal, closeModal }) {
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
      categoryId: '',
    },
  });

  console.log('watch', watch());

  const { postData, patchData, isLoading, getCategory, getAllCategory } =
    useSubCategoryReducer((state) => state);

  const selectedCategoryId = watch('categoryId');

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    if (showModal?.id && getAllCategory?.length > 0) {
      setValue('name', showModal?.name || '');
      setValue('categoryId', showModal?.categoryId || '');
    } else if (!showModal?.id) {
      reset();
    }
  }, [showModal?.id, getAllCategory]);

  const categoryOptions =
    getAllCategory?.map((item) => ({
      label: item.name,
      value: item.id,
    })) || [];

  const onSubmit = (data) => {
    if (showModal?.id) {
      patchData({ id: showModal.id, ...data });
    } else {
      postData(data);
    }
    closeModal();
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

        <div className="row">
          <div className="col-lg-6">
            <div className="form-group forms-custom">
              <label htmlFor="categoryId" className="label">
                Category<span className="text-danger">*</span>
              </label>
              <CustomSelect
                options={categoryOptions}
                value={
                  categoryOptions.find(
                    (option) => option.value === selectedCategoryId
                  ) || null
                }
                onChange={(selected) => {
                  setValue('categoryId', selected?.value || '');
                }}
                placeholder="Select Category"
                showIndicator={false}
              />

              {errors.categoryId && (
                <span className="error">{errors.categoryId.message}</span>
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
