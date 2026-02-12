import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomModal from '../../components/common/CustomModal';
import useVisaDigitizationReducer from '../../stores/VisaDigitizationReducer';

// ✅ Schema: only file is required
const fileSchema = z.object({
  file: z
    .any()
    .refine((v) => v instanceof FileList && v.length > 0, 'File is required')
    .refine(
      (v) => v instanceof FileList && v.length > 0 && v[0].size <= 5 * 1024 * 1024,
      'File must be less than 5MB'
    ),
  // If you want to restrict types, uncomment:
  // .refine(
  //   (v) =>
  //     v instanceof FileList &&
  //     v.length > 0 &&
  //     ['application/pdf', 'image/png', 'image/jpeg'].includes(v[0].type),
  //   'Only PDF / PNG / JPG allowed'
  // ),
});

export function AddEditModal({ showModal, closeModal, onRefreshVisaDigitization }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(fileSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const { postData, patchData, isLoading } = useVisaDigitizationReducer((state) => state);

  // Reset on open/close or when switching edit/add
  useEffect(() => {
    if (!showModal) reset();
  }, [showModal, reset]);

  const onSubmit = (data) => {
    const selectedFile = data?.file?.[0];

    // ✅ send as FormData (recommended for file upload)
    const formData = new FormData();
    formData.append('file', selectedFile);

    if (showModal?.id) {
      patchData({ id: showModal.id, data: formData }, () => {
        onRefreshVisaDigitization();
      });
    } else {
      postData(formData, () => {
        onRefreshVisaDigitization();
      });
    }

    closeModal();
  };

  const renderHeader = () => (
    <>
      <h4 className="modal-title">
        {showModal?.id ? 'Edit Upload' : 'Upload File'}
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
    <div className="modal-body custom-scroll">
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="file" className="form-label">
              Upload File<span className="text-danger">*</span>
            </label>

            <input
              type="file"
              id="file"
              className="form-control"
              {...register('file')}
            />

            {errors.file && (
              <span className="error">{errors.file.message}</span>
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
        type="submit"
        className="btn btn-submit"
        disabled={isLoading}
        onClick={handleSubmit(onSubmit)}
      >
        {isLoading ? 'Loading...' : 'Upload'}
      </button>
    </div>
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
