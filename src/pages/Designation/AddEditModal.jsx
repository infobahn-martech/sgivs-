import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomModal from '../../components/common/CustomModal';
import useDesignationReducer from '../../stores/CounterReducer';
import CustomSelect from './Select';

const USE_MOCK = true;

// ✅ Dummy centers list (Select Center dropdown)
const mockRoles = [
  { id: '1', name: 'Role A' },
  { id: '2', name: 'Role B' },
  { id: '3', name: 'Role C' },
  { id: '4', name: 'Role D' },
  { id: '5', name: 'Role E' },
  { id: '6', name: 'Role F' },
];

const nameSchema = z.object({
  name: z
    .string()
    .nonempty('Name is required')
    .max(20, 'Name must be 20 characters or less'),
  roleId: z.string().nonempty('Role is required'),
});

export function AddEditModal({ showModal, closeModal, onRefreshDesignation }) {
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
      roleId: '',
    },
  });

  const { postData, patchData, isLoading, getAllRole, roles } =
    useDesignationReducer((state) => state);

  const selectedRoleId = watch('roleId');

  // ✅ Load center list (API mode only)
  useEffect(() => {
    if (!USE_MOCK) getAllRole();
  }, []);

  // ✅ Fill form for edit / clear for add
  useEffect(() => {
    const roles = USE_MOCK ? mockRoles : roles;

    if (showModal?.id && (roles?.length || 0) > 0) {
      // Your listing page now uses counterName/centerName.
      // For edit modal, accept both old & new keys safely.
      setValue('name', showModal?.roleName || showModal?.name || '');
      setValue(
        'roleId',
        String(showModal?.roleId || showModal?.role?.id || showModal?.roleId || '')
      );
    } else if (!showModal?.id) {
      reset();
    }
  }, [showModal?.id, roles, reset, setValue]);

  // ✅ Options for select
  const roleOptions = useMemo(() => {
    const roles = USE_MOCK ? mockRoles : roles || [];
    return roles.map((item) => ({
      label: item.name,
      value: String(item.id),
    }));
  }, [roles]);

  // ✅ Dummy submit (no API)
  const onSubmit = (data) => {
    if (USE_MOCK) {
      // Just close modal + refresh UI
      onRefreshDesignation?.();
      closeModal?.();
      return;
    }

    if (showModal?.id) {
      patchData({ id: showModal.id, ...data }, () => {
        onRefreshDesignation?.();
      });
    } else {
      postData(data, () => {
        onRefreshDesignation?.();
      });
    }
    closeModal?.();
  };

  const renderHeader = () => (
    <>
      <h4 className="modal-title">
        {showModal?.id ? 'Edit Designation' : 'Add Designation'}
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
            <label htmlFor="roleId" className="label">
              Select Role<span className="text-danger">*</span>
            </label>

            <CustomSelect
              options={roleOptions}
              value={
                roleOptions.find(
                  (option) => option.value === String(selectedRoleId || '')
                ) || null
              }
              onChange={(selected) => {
                setValue('roleId', selected?.value || '');
              }}
              placeholder="Select Role"
              showIndicator={false}
              className="form-select form-control"
            />

            {errors.roleId && (
              <span className="error">{errors.roleId.message}</span>
            )}
          </div>
        </div>

        <div className="col-sm-6">
          <div className="form-group forms-custom">
            <label htmlFor="name" className="label">
              Designation Name<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              autoComplete="off"
              maxLength={20}
              placeholder="Enter designation name"
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
