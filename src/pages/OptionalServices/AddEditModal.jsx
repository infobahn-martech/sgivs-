import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomModal from '../../components/common/CustomModal';
import CustomSelect from '../../components/common/CustomSelect';
import useOptionalServiceReducer from '../../stores/OptionalServiceReducer';

const USE_MOCK = true;

// ✅ Dummy Services Types list (Select dropdown)
const mockServicesTypesOptions = [
  { id: '1', servicesTypeName: 'Services Type 1' },
  { id: '2', servicesTypeName: 'Services Type 2' },
  { id: '3', servicesTypeName: 'Services Type 3' },
  { id: '4', servicesTypeName: 'Services Type 4' },
];

const formSchema = z.object({
  servicesTypeId: z.string().nonempty('Services Type is required'),
  name: z.string().nonempty('Name is required').max(20, 'Name must be 20 characters or less'),

  serviceFee: z
    .number({ required_error: 'Service Fee is required', invalid_type_error: 'Service Fee is required' })
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
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      servicesTypeId: '',
      serviceFee: '',
    },
  });

  const { postData, patchData, isLoading, getAllOptionalService, optionalServices } =
    useOptionalServiceReducer((state) => state);

  const selectedServicesTypeId = watch('servicesTypeId');

  // ✅ Source list for dropdown (mock vs API)
  const servicesTypeSourceList = USE_MOCK ? mockServicesTypesOptions : optionalServices || [];

  // ✅ Options for CustomSelect
  const servicesTypesOptions = useMemo(() => {
    return (servicesTypeSourceList || []).map((item) => ({
      label: item.servicesTypeName,
      value: String(item.id),
    }));
  }, [servicesTypeSourceList]);

  // ✅ Load list (API mode only)
  useEffect(() => {
    if (!USE_MOCK) getAllOptionalService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Fill form for edit / clear for add
  useEffect(() => {
    if (showModal?.id) {
      setValue('name', showModal?.name || showModal?.optionalServiceName || '');
      setValue(
        'servicesTypeId',
        String(
          showModal?.servicesTypeId ||
          showModal?.servicesType?.id ||
          ''
        ),
        { shouldValidate: true }
      );
      setValue('serviceFee', showModal?.serviceFee ?? '', { shouldValidate: true });
    } else {
      reset({
        name: '',
        servicesTypeId: '',
        serviceFee: '',
      });
    }
  }, [showModal?.id, reset, setValue, showModal]);

  // ✅ Submit
  const onSubmit = (data) => {
    if (USE_MOCK) {
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
        {/* Services Type */}
        <div className="col-sm-6">
          <div className="form-group forms-custom">
            <label htmlFor="servicesTypeId" className="label">
              Select Services Type<span className="text-danger">*</span>
            </label>

            <CustomSelect
              options={servicesTypesOptions}
              value={
                servicesTypesOptions.find(
                  (option) => option.value === String(selectedServicesTypeId || '')
                ) || null
              }
              onChange={(selected) => {
                setValue('servicesTypeId', selected?.value || '', { shouldValidate: true });
              }}
              placeholder="Select Services Type"
              showIndicator={false}
              className="form-select form-control"
            />

            {errors.servicesTypeId && (
              <span className="error">{errors.servicesTypeId.message}</span>
            )}
          </div>
        </div>

        {/* Optional Service Name */}
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
            {errors.name && <span className="error">{errors.name.message}</span>}
          </div>
        </div>

        {/* ✅ Service Fee */}
        <div className="col-sm-6">
          <div className="form-group forms-custom">
            <label htmlFor="serviceFee" className="label">
              Service Fee<span className="text-danger">*</span>
            </label>
            <input
              type="number"
              id="serviceFee"
              className="form-control"
              placeholder="Enter service fee"
              min={0}
              {...register('serviceFee', { valueAsNumber: true })}
            />

            {errors.serviceFee && (
              <span className="error">{errors.serviceFee.message}</span>
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
