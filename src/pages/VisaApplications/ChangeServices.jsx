import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import CustomModal from '../../components/common/CustomModal';

// ✅ Schema (numbers from inputs come as string -> use preprocess)
const changeServicesSchema = z
    .object({
        referenceNo: z.string().nonempty('Reference No is required'),
        applicantName: z.string().nonempty('Applicant Name is required'),

        visaServiceId: z.string().nonempty('Visa Service is required'),
        visaDuration: z.string().nonempty('Visa Duration is required'),
        visaEntry: z.string().nonempty('Visa Entry is required'),
        nationality: z.string().nonempty('Nationality is required'),

        govtFee: z.preprocess(
            (v) => (v === '' || v === null || v === undefined ? undefined : Number(v)),
            z
                .number({ invalid_type_error: 'Govt Fee is required' })
                .min(0, 'Govt Fee must be 0 or more')
        ),

        icwfFee: z.preprocess(
            (v) => (v === '' || v === null || v === undefined ? undefined : Number(v)),
            z
                .number({ invalid_type_error: 'ICWF Fee is required' })
                .min(0, 'ICWF Fee must be 0 or more')
        ),

        sgivsServiceFee: z.preprocess(
            (v) => (v === '' || v === null || v === undefined ? undefined : Number(v)),
            z
                .number({ invalid_type_error: 'SGIVS Service Fee is required' })
                .min(0, 'SGIVS Service Fee must be 0 or more')
        ),

        urgentFee: z.boolean().optional(),

        cancelApplication: z.boolean().optional(),
        cancelReason: z.string().optional(),
        remark: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        // ✅ If cancel is checked, reason is required
        if (data.cancelApplication) {
            if (!data.cancelReason || !data.cancelReason.trim()) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['cancelReason'],
                    message: 'Cancel reason is required',
                });
            }
        }
    });

export default function ChangeServicesModal({
    showModal,
    closeModal,
    onRefreshPassportApplications,
}) {
    // ✅ Replace these with API data if needed
    const visaServiceOptions = [
        { value: 'normal', label: 'Normal' },
        { value: 'premium', label: 'Premium' },
        { value: 'express', label: 'Express' },
    ];

    const visaDurationOptions = [
        { value: '14_days', label: '14 Days' },
        { value: '30_days', label: '30 Days' },
        { value: '60_days', label: '60 Days' },
        { value: '90_days', label: '90 Days' },
    ];

    const visaEntryOptions = [
        { value: 'single', label: 'Single Entry' },
        { value: 'multiple', label: 'Multiple Entry' },
    ];

    const nationalityOptions = [
        { value: 'india', label: 'India' },
        { value: 'uae', label: 'UAE' },
        { value: 'pakistan', label: 'Pakistan' },
        { value: 'bangladesh', label: 'Bangladesh' },
        { value: 'sri_lanka', label: 'Sri Lanka' },
        { value: 'nepal', label: 'Nepal' },
        { value: 'other', label: 'Other' },
    ];

    const cancelReasonOptions = [
        { value: 'wrong_details', label: 'Entered wrong details' },
        { value: 'duplicate', label: 'Duplicate application' },
        { value: 'not_required', label: 'Not required now' },
        { value: 'other', label: 'Other' },
    ];

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(changeServicesSchema),
        defaultValues: {
            referenceNo: '',
            applicantName: '',

            visaServiceId: '',
            visaDuration: '',
            visaEntry: '',
            nationality: '',

            govtFee: '',
            icwfFee: '',
            sgivsServiceFee: '',

            urgentFee: false,

            cancelApplication: false,
            cancelReason: '',
            remark: '',
        },
        mode: 'onSubmit',
    });

    const cancelApplication = watch('cancelApplication');

    // ✅ Prefill when opening (from row)
    useEffect(() => {
        if (showModal) {
            reset({
                referenceNo: showModal?.referenceNo ?? '',
                applicantName: showModal?.applicantName ?? '',

                visaServiceId: showModal?.visaServiceId ?? '',
                visaDuration: showModal?.visaDuration ?? '',
                visaEntry: showModal?.visaEntry ?? '',
                nationality: showModal?.nationality ?? '',

                govtFee: showModal?.govtFee ?? '',
                icwfFee: showModal?.icwfFee ?? '',
                sgivsServiceFee: showModal?.sgivsServiceFee ?? '',

                urgentFee: !!showModal?.urgentFee,

                cancelApplication: !!showModal?.cancelApplication,
                cancelReason: showModal?.cancelReason ?? '',
                remark: showModal?.remark ?? '',
            });
        }
    }, [showModal, reset]);

    const onSubmit = (data) => {
        console.log('Change Service/Fee Payload:', data);

        // ✅ call API here (post/patch)
        // patchData(showModal.id, data, () => onRefreshPassportApplications?.());

        onRefreshPassportApplications?.();
        closeModal?.();
    };

    const renderHeader = () => (
        <>
            <h4 className="modal-title">Change Visa Service / Fee</h4>
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

                {/* Visa Service dropdown */}
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-label">Visa Service</label>
                        <select className="form-select" {...register('visaServiceId')}>
                            <option value="">Select Visa Service</option>
                            {visaServiceOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        {errors?.visaServiceId && (
                            <p className="text-danger mt-1">{errors.visaServiceId.message}</p>
                        )}
                    </div>
                </div>

                {/* Visa Duration dropdown */}
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-label">Visa Duration</label>
                        <select className="form-select" {...register('visaDuration')}>
                            <option value="">Select Visa Duration</option>
                            {visaDurationOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        {errors?.visaDuration && (
                            <p className="text-danger mt-1">{errors.visaDuration.message}</p>
                        )}
                    </div>
                </div>

                {/* Visa Entry dropdown */}
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-label">Visa Entry</label>
                        <select className="form-select" {...register('visaEntry')}>
                            <option value="">Select Visa Entry</option>
                            {visaEntryOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        {errors?.visaEntry && (
                            <p className="text-danger mt-1">{errors.visaEntry.message}</p>
                        )}
                    </div>
                </div>

                {/* Nationality dropdown */}
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-label">Nationality</label>
                        <select className="form-select" {...register('nationality')}>
                            <option value="">Select Nationality</option>
                            {nationalityOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        {errors?.nationality && (
                            <p className="text-danger mt-1">{errors.nationality.message}</p>
                        )}
                    </div>
                </div>

                {/* Govt Fee */}
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-label">Govt Fee</label>
                        <input type="number" className="form-control" placeholder="0" {...register('govtFee')} />
                        {errors?.govtFee && <p className="text-danger mt-1">{errors.govtFee.message}</p>}
                    </div>
                </div>

                {/* ICWF Fee */}
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-label">ICWF Fee</label>
                        <input type="number" className="form-control" placeholder="0" {...register('icwfFee')} />
                        {errors?.icwfFee && <p className="text-danger mt-1">{errors.icwfFee.message}</p>}
                    </div>
                </div>

                {/* SGIVS Service Fee */}
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-label">SGIVS Service Fee</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="0"
                            {...register('sgivsServiceFee')}
                        />
                        {errors?.sgivsServiceFee && (
                            <p className="text-danger mt-1">{errors.sgivsServiceFee.message}</p>
                        )}
                    </div>
                </div>

                {/* Urgent fee checkbox */}
                <div className="col-md-6">
                    <div className="form-group mt-2">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="urgentFee" {...register('urgentFee')} />
                            <label className="form-check-label" htmlFor="urgentFee">
                                Urgent Fee
                            </label>
                        </div>
                    </div>
                </div>

                {/* Cancel application checkbox */}
                <div className="col-md-12">
                    <div className="form-group mt-2">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="cancelApplication"
                                {...register('cancelApplication')}
                                onChange={(e) => {
                                    setValue('cancelApplication', e.target.checked);
                                    if (!e.target.checked) {
                                        setValue('cancelReason', '');
                                    }
                                }}
                            />
                            <label className="form-check-label" htmlFor="cancelApplication">
                                Do you want to cancel your application?
                            </label>
                        </div>
                    </div>
                </div>

                {/* Cancel reason dropdown (show only if cancel checked) */}
                {cancelApplication && (
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">Select reason</label>
                            <select className="form-select" {...register('cancelReason')}>
                                <option value="">Select Reason</option>
                                {cancelReasonOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                            {errors?.cancelReason && (
                                <p className="text-danger mt-1">{errors.cancelReason.message}</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Remark textarea */}
                <div className="col-12">
                    <div className="form-group">
                        <label className="form-label">Remark</label>
                        <textarea rows={4} className="form-control" placeholder="Enter remark" {...register('remark')} />
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
            className="modal fade change-services-modal show"
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
