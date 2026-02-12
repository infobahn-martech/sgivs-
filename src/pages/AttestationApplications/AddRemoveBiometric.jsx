import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import CustomModal from '../../components/common/CustomModal';

// ✅ Schema
// Required: referenceNo, applicantName, biometric (boolean), remark (optional)
// If biometric = true => biometricDate & biometricTime required
const addRemoveBiometricSchema = z
    .object({
        referenceNo: z.string().nonempty('Reference No is required'),
        applicantName: z.string().nonempty('Applicant Name is required'),

        biometric: z.boolean().default(false),

        biometricDate: z.string().optional(),
        biometricTime: z.string().optional(),

        remark: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        if (data.biometric) {
            if (!data.biometricDate) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['biometricDate'],
                    message: 'Biometric date is required',
                });
            }
            if (!data.biometricTime) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['biometricTime'],
                    message: 'Biometric time is required',
                });
            }
        }
    });

export default function AddRemoveBiometric({
    showModal,
    closeModal,
    onRefreshPassportApplications,
}) {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(addRemoveBiometricSchema),
        defaultValues: {
            referenceNo: '',
            applicantName: '',
            biometric: false,
            biometricDate: '',
            biometricTime: '',
            remark: '',
        },
        mode: 'onSubmit',
    });

    const biometric = watch('biometric');

    // ✅ Prefill when opening (from row)
    useEffect(() => {
        if (showModal) {
            reset({
                referenceNo: showModal?.referenceNo ?? '',
                applicantName: showModal?.applicantName ?? '',
                biometric: !!showModal?.biometric,
                biometricDate: showModal?.biometricDate ?? '',
                biometricTime: showModal?.biometricTime ?? '',
                remark: showModal?.remark ?? '',
            });
        }
    }, [showModal, reset]);

    const onSubmit = (data) => {
        console.log('Add/Remove Biometric Payload:', data);

        // ✅ call API here (post/patch)
        // patchData(showModal.id, data, () => onRefreshPassportApplications?.());

        onRefreshPassportApplications?.();
        closeModal?.();
    };

    const renderHeader = () => (
        <>
            <h4 className="modal-title">Add/Remove Biometric</h4>
            <button type="button" className="btn-close" aria-label="Close" onClick={closeModal} />
        </>
    );

    const renderBody = () => (
        <div className="modal-body custom-scroll">
            <div className="row g-3">
                {/* Reference No */}
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-label">Reference No</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="REF-0001"
                            {...register('referenceNo')}
                        />
                        {errors?.referenceNo && (
                            <p className="text-danger mt-1">{errors.referenceNo.message}</p>
                        )}
                    </div>
                </div>

                {/* Applicant Name */}
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-label">Applicant Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter applicant name"
                            {...register('applicantName')}
                        />
                        {errors?.applicantName && (
                            <p className="text-danger mt-1">{errors.applicantName.message}</p>
                        )}
                    </div>
                </div>

                {/* Biometric checkbox */}
                <div className="col-md-6">
                    <div className="form-group mt-2">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="biometric"
                                {...register('biometric')}
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    setValue('biometric', checked);

                                    // ✅ Clear date/time if unchecked
                                    if (!checked) {
                                        setValue('biometricDate', '');
                                        setValue('biometricTime', '');
                                    }
                                }}
                            />
                            <label className="form-check-label" htmlFor="biometric">
                                Biometric
                            </label>
                        </div>
                        {errors?.biometric && <p className="text-danger mt-1">{errors.biometric.message}</p>}
                    </div>
                </div>

                {/* ✅ Show Calendar + Time only if biometric is true */}
                {/* ✅ Show Calendar + Time only if biometric is true */}
                {biometric && (
                    <div className="row">
                        {/* Biometric Date */}
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-label">Biometric Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    {...register('biometricDate')}
                                />
                                {errors?.biometricDate && (
                                    <p className="text-danger mt-1">{errors.biometricDate.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Biometric Time */}
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-label">Biometric Time</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    {...register('biometricTime')}
                                />
                                {errors?.biometricTime && (
                                    <p className="text-danger mt-1">{errors.biometricTime.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}


                {/* Remark textarea */}
                <div className="col-12">
                    <div className="form-group">
                        <label className="form-label">Remark</label>
                        <textarea
                            rows={4}
                            className="form-control"
                            placeholder="Enter remark"
                            {...register('remark')}
                        />
                        {errors?.remark && <p className="text-danger mt-1">{errors.remark.message}</p>}
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
            <button type="button" className="btn btn-submit" onClick={handleSubmit(onSubmit)}>
                Save
            </button>
        </div>
    );

    return (
        <CustomModal
            className="modal fade  change-services-modal show"
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
