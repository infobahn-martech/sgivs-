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

export function AddEditModal({ showModal, closeModal, onRefreshSubCategory }) {
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
      patchData({ id: showModal.id, ...data }, () => {
        onRefreshSubCategory();
      });
    } else {
      postData(data, () => {
        onRefreshSubCategory();
      });
    }
    closeModal();
  };

  const renderHeader = () => (
    <>
      <h4 className="modal-title">
        {showModal?.id ? 'Edit Sub Category' : 'Add Sub Category'}
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
      <div className="modal-body">
        <div className="set-dealine-wrp">
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group forms-custom">
                <label htmlFor="categoryId" className="label">
                  Select Category<span className="text-danger">*</span>
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
                  className="form-select form-control"
                />

                {errors.categoryId && (
                  <span className="error">{errors.categoryId.message}</span>
                )}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group forms-custom">
                <label htmlFor="name" className="label">
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
