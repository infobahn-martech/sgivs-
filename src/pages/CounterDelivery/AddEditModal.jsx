import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomModal from '../../components/common/CustomModal';
import useCounterDeliveryReducer from '../../stores/CounterDeliveryReducer';

const collectedByOptions = [
    { value: 'MY_SELF', label: 'My self' },
    { value: 'OTHER_PERSON', label: 'Other person' },
];

const schema = z.object({
    applicationNumbers: z
        .string()
        .nonempty('Application Numbers is required')
        .max(2000, 'Application Numbers is too long'),
    collectedBy: z.enum(['MY_SELF', 'OTHER_PERSON'], {
        required_error: 'Collected By is required',
    }),
});

export default function AddEditModal({
    showModal,
    closeModal,
    onRefreshCounterDelivery,
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            applicationNumbers: '',
            collectedBy: 'MY_SELF',
        },
    });

    const { postData, patchData, isLoading } = useCounterDeliveryReducer(
        (state) => state
    );

    // Prefill when editing
    useEffect(() => {
        if (showModal?.id) {
            setValue('applicationNumbers', showModal?.applicationNumbers || '');
            setValue('collectedBy', showModal?.collectedBy || 'MY_SELF');
        } else {
            reset();
        }
    }, [showModal?.id, reset, setValue]);

    const onSubmit = (data) => {
        if (showModal?.id) {
            patchData({ id: showModal.id, ...data }, () => {
                onRefreshCounterDelivery();
            });
        } else {
            postData(data, () => {
                onRefreshCounterDelivery();
            });
        }
        closeModal();
    };

    const renderHeader = () => (
        <>
            <h4 className="modal-title">
                {showModal?.id ? 'Edit Counter Delivery' : 'Add Counter Delivery'}
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
                {/* Application Numbers */}
                <div className="col-12">
                    <div className="form-group">
                        <label htmlFor="applicationNumbers" className="form-label">
                            Application Numbers <span className="text-danger">*</span>
                        </label>
                        <textarea
                            id="applicationNumbers"
                            className="form-control"
                            rows={4}
                            placeholder={'Enter application numbers (one per line)\nEg:\nAPP-1001\nAPP-1002'}
                            autoComplete="off"
                            maxLength={2000}
                            {...register('applicationNumbers')}
                        />
                        {errors.applicationNumbers && (
                            <span className="error">{errors.applicationNumbers.message}</span>
                        )}
                        <small className="text-muted d-block mt-1">
                            Tip: Enter one application number per line.
                        </small>
                    </div>
                </div>

                {/* Collected By */}
                <div className="col-12 mt-2">
                    <div className="form-group">
                        <label htmlFor="collectedBy" className="form-label">
                            Collected By <span className="text-danger">*</span>
                        </label>
                        <select
                            id="collectedBy"
                            className="form-control"
                            {...register('collectedBy')}
                        >
                            {collectedByOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        {errors.collectedBy && (
                            <span className="error">{errors.collectedBy.message}</span>
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
                {isLoading ? 'Loading...' : 'Save'}
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
