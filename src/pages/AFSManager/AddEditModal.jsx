import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomModal from '../../components/common/CustomModal';
import useCounterReducer from '../../stores/CounterReducer';
import CustomSelect from './Select';

const USE_MOCK = true;

// ✅ Application Type options
const applicationTypeOptions = [
  { label: 'Passport', value: 'Passport' },
  { label: 'Visa', value: 'Visa' },
  { label: 'OCI', value: 'OCI' },
  { label: 'Attestation', value: 'Attestation' },
];

// ✅ Schema
const formSchema = z
  .object({
    passportNumber: z
      .string()
      .nonempty('Passport Number is required')
      .max(20, 'Passport Number must be 20 characters or less'),
    applicationType: z.string().nonempty('Application Type is required'),

    // VAS Services
    formFilling: z.boolean().optional(),
    photocopy: z.boolean().optional(),
    photograph: z.boolean().optional(),

    photographNotes: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    // If Photograph checked -> notes required
    if (values.photograph) {
      if (!values.photographNotes || values.photographNotes.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['photographNotes'],
          message: 'Please enter details for Photograph',
        });
      }
    }
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
    resolver: zodResolver(formSchema),
    defaultValues: {
      passportNumber: '',
      applicationType: '',
      formFilling: false,
      photocopy: false,
      photograph: false,
      photographNotes: '',
    },
  });

  const { postData, patchData, isLoading } = useCounterReducer((state) => state);

  const selectedApplicationType = watch('applicationType');
  const isPhotographChecked = watch('photograph');

  // ✅ Fill form for edit / clear for add
  useEffect(() => {
    if (showModal?.id) {
      setValue('passportNumber', showModal?.passportNumber || '');
      setValue('applicationType', showModal?.applicationType || '');

      setValue('formFilling', !!showModal?.formFilling);
      setValue('photocopy', !!showModal?.photocopy);
      setValue('photograph', !!showModal?.photograph);

      setValue('photographNotes', showModal?.photographNotes || '');
    } else {
      reset();
    }
  }, [showModal?.id, reset, setValue]);

  // ✅ Options for select
  const appTypeOptions = useMemo(() => applicationTypeOptions, []);

  // ✅ Submit
  const onSubmit = (data) => {
    if (USE_MOCK) {
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
        {showModal?.id ? 'Edit VAS Services' : 'Add VAS Services'}
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
        {/* Passport Number */}
        <div className="col-sm-6">
          <div className="form-group forms-custom">
            <label htmlFor="passportNumber" className="label">
              Passport Number<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="passportNumber"
              className="form-control"
              autoComplete="off"
              maxLength={20}
              placeholder="Enter passport number"
              {...register('passportNumber')}
            />
            {errors.passportNumber && (
              <span className="error">{errors.passportNumber.message}</span>
            )}
          </div>
        </div>

        {/* Application Type */}
        <div className="col-sm-6">
          <div className="form-group forms-custom">
            <label htmlFor="applicationType" className="label">
              Application Type<span className="text-danger">*</span>
            </label>

            <CustomSelect
              options={appTypeOptions}
              value={
                appTypeOptions.find(
                  (option) =>
                    option.value === String(selectedApplicationType || '')
                ) || null
              }
              onChange={(selected) => {
                setValue('applicationType', selected?.value || '', {
                  shouldValidate: true,
                });
              }}
              placeholder="Select Application Type"
              showIndicator={false}
              className="form-select form-control"
            />

            {errors.applicationType && (
              <span className="error">{errors.applicationType.message}</span>
            )}
          </div>
        </div>

        {/* VAS Services */}
        <div className="col-12">
          <div className="form-group forms-custom mt-2">
            <label className="label">Option VAS Services</label>

            <div className="d-flex flex-wrap gap-3 mt-1">
              <label className="d-flex align-items-center gap-2">
                <input type="checkbox" {...register('formFilling')} />
                <span>Form Filling</span>
              </label>

              <label className="d-flex align-items-center gap-2">
                <input type="checkbox" {...register('photocopy')} />
                <span>Photocopy</span>
              </label>

              <label className="d-flex align-items-center gap-2">
                <input type="checkbox" {...register('photograph')} />
                <span>Photograph</span>
              </label>
            </div>
          </div>
        </div>

        {/* Photograph textarea (only if checked) */}
        {isPhotographChecked && (
          <div className="col-12">
            <div className="form-group forms-custom mt-2">
              <label htmlFor="photographNotes" className="label">
                Photograph Details<span className="text-danger">*</span>
              </label>
              <textarea
                id="photographNotes"
                className="form-control"
                rows={3}
                placeholder="Enter photograph details..."
                {...register('photographNotes')}
              />
              {errors.photographNotes && (
                <span className="error">{errors.photographNotes.message}</span>
              )}
            </div>
          </div>
        )}
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

export default AddEditModal;