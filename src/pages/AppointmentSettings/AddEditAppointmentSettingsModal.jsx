import React, { useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomModal from '../../components/common/CustomModal';
import CustomSelect from '../../components/common/CustomSelect';

const USE_MOCK = true;

/** ✅ MOCK OPTIONS */
const mockCountries = [
    { id: '1', name: 'UAE' },
    { id: '2', name: 'India' },
    { id: '3', name: 'USA' },
];

const mockMissions = [
    { id: '1', name: 'Abu Dhabi Mission' },
    { id: '2', name: 'Dubai Mission' },
];

const mockCenters = [
    { id: '1', name: 'Dubai Center' },
    { id: '2', name: 'Abu Dhabi Center' },
    { id: '3', name: 'Sharjah Center' },
    { id: '4', name: 'Ajman Center' },
];

const mockApplicationTypes = [
    { id: '1', name: 'New' },
    { id: '2', name: 'Renewal' },
];

const mockAppointmentTypes = [
    { id: '1', name: 'Normal' },
    { id: '2', name: 'Urgent' },
];

const mockOffDays = [
    { id: 'SAT', name: 'Saturday' },
    { id: 'SUN', name: 'Sunday' },
    { id: 'MON', name: 'Monday' },
    { id: 'TUE', name: 'Tuesday' },
    { id: 'WED', name: 'Wednesday' },
    { id: 'THU', name: 'Thursday' },
    { id: 'FRI', name: 'Friday' },
];

const mockSlotPeriods = [
    { id: '10', name: '10 Minutes' },
    { id: '15', name: '15 Minutes' },
    { id: '20', name: '20 Minutes' },
    { id: '30', name: '30 Minutes' },
];

const mockSlotCapacity = [
    { id: '1', name: '1' },
    { id: '2', name: '2' },
    { id: '3', name: '3' },
    { id: '5', name: '5' },
    { id: '10', name: '10' },
];

const mockMaxSlots = [
    { id: '10', name: '10' },
    { id: '20', name: '20' },
    { id: '30', name: '30' },
    { id: '50', name: '50' },
    { id: '100', name: '100' },
];

/** ✅ YYYYMMDD CSV validator */
const yyyymmddCsv = z
    .string()
    .optional()
    .refine(
        (val) => {
            if (!val || !val.trim()) return true;
            const parts = val
                .split(',')
                .map((x) => x.trim())
                .filter(Boolean);
            return parts.every((p) => /^\d{8}$/.test(p));
        },
        { message: 'Enter dates as YYYYMMDD separated by comma' }
    );

const formSchema = z
    .object({
        countryId: z.string().nonempty('Country is required'),
        missionId: z.string().nonempty('Mission is required'),
        centerId: z.string().nonempty('Center is required'),
        applicationTypeId: z.string().nonempty('Application Type is required'),
        appointmentTypeId: z.string().nonempty('Appointment Type is required'),

        offDays: z.array(z.string()).optional(),

        startTime: z.string().nonempty('Start time is required'), // HH:MM
        endTime: z.string().nonempty('End time is required'), // HH:MM

        lunchStartTime: z.string().optional(),
        lunchEndTime: z.string().optional(),

        slotPeriod: z.string().nonempty('Slot period is required'),
        slotCapacity: z.string().nonempty('Slot capacity is required'),
        maxSlots: z.string().nonempty('Max slots is required'),

        bookingAllowFrom: z.string().nonempty('Booking allow from is required'), // YYYY-MM-DD
        bookingAllowTill: z.string().nonempty('Booking allow till is required'), // YYYY-MM-DD

        blockedDates: yyyymmddCsv,
        releaseDates: yyyymmddCsv,
        slotFullDates: yyyymmddCsv,
    })
    .refine(
        (data) => {
            if (!data.lunchStartTime && !data.lunchEndTime) return true;
            if (data.lunchStartTime && data.lunchEndTime) return true;
            return false;
        },
        {
            message: 'Both lunch start and lunch end are required',
            path: ['lunchEndTime'],
        }
    );

export default function AddEditAppointmentSettingsModal({
    showModal,
    closeModal,
    onRefreshAppointmentSettings,
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        watch,
        control,
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            countryId: '',
            missionId: '',
            centerId: '',
            applicationTypeId: '',
            appointmentTypeId: '',
            offDays: [],

            startTime: '',
            endTime: '',
            lunchStartTime: '',
            lunchEndTime: '',

            slotPeriod: '',
            slotCapacity: '',
            maxSlots: '',

            bookingAllowFrom: '',
            bookingAllowTill: '',

            blockedDates: '',
            releaseDates: '',
            slotFullDates: '',
        },
    });

    const selectedCountryId = watch('countryId');
    const selectedMissionId = watch('missionId');
    const selectedCenterId = watch('centerId');
    const selectedApplicationTypeId = watch('applicationTypeId');
    const selectedAppointmentTypeId = watch('appointmentTypeId');
    const selectedOffDays = watch('offDays') || [];

    // ✅ Fill form for edit / clear for add (MOCK)
    useEffect(() => {
        if (showModal?.id) {
            // If you have edit values, map them here.
            // Example:
            // setValue('countryId', String(showModal.countryId || ''));
            // setValue('offDays', showModal.offDays || []);
        } else if (!showModal?.id) {
            reset();
        }
    }, [showModal?.id, reset, setValue, showModal]);

    /** ✅ OPTIONS MAPPING */
    const countryOptions = useMemo(
        () => (USE_MOCK ? mockCountries : []).map((x) => ({ label: x.name, value: String(x.id) })),
        []
    );

    const missionOptions = useMemo(
        () => (USE_MOCK ? mockMissions : []).map((x) => ({ label: x.name, value: String(x.id) })),
        []
    );

    const centerOptions = useMemo(
        () => (USE_MOCK ? mockCenters : []).map((x) => ({ label: x.name, value: String(x.id) })),
        []
    );

    const applicationTypeOptions = useMemo(
        () => (USE_MOCK ? mockApplicationTypes : []).map((x) => ({ label: x.name, value: String(x.id) })),
        []
    );

    const appointmentTypeOptions = useMemo(
        () => (USE_MOCK ? mockAppointmentTypes : []).map((x) => ({ label: x.name, value: String(x.id) })),
        []
    );

    const offDaysOptions = useMemo(
        () => (USE_MOCK ? mockOffDays : []).map((x) => ({ label: x.name, value: String(x.id) })),
        []
    );

    const slotPeriodOptions = useMemo(
        () => (USE_MOCK ? mockSlotPeriods : []).map((x) => ({ label: x.name, value: String(x.id) })),
        []
    );

    const slotCapacityOptions = useMemo(
        () => (USE_MOCK ? mockSlotCapacity : []).map((x) => ({ label: x.name, value: String(x.id) })),
        []
    );

    const maxSlotsOptions = useMemo(
        () => (USE_MOCK ? mockMaxSlots : []).map((x) => ({ label: x.name, value: String(x.id) })),
        []
    );

    // ✅ Submit (MOCK)
    const onSubmit = (data) => {
        if (USE_MOCK) {
            // You can console.log(data) to see payload
            // console.log('Appointment Settings Payload:', data);

            onRefreshAppointmentSettings?.();
            closeModal?.();
            return;
        }

        // API mode: call post/patch here
        closeModal?.();
    };

    const renderHeader = () => (
        <>
            <h4 className="modal-title">
                {showModal?.id ? 'Edit Appointment Settings' : 'Add Appointment Settings'}
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
                {/* Country */}
                <div className="col-sm-6">
                    <div className="form-group forms-custom">
                        <label className="label">
                            Country<span className="text-danger">*</span>
                        </label>
                        <CustomSelect
                            options={countryOptions}
                            value={countryOptions.find((o) => o.value === String(selectedCountryId || '')) || null}
                            onChange={(selected) => setValue('countryId', selected?.value || '', { shouldValidate: true })}
                            placeholder="Select Country"
                            showIndicator={false}
                            className="form-control"
                        />
                        {errors.countryId && <span className="error">{errors.countryId.message}</span>}
                    </div>
                </div>

                {/* Mission */}
                <div className="col-sm-6">
                    <div className="form-group forms-custom">
                        <label className="label">
                            Mission<span className="text-danger">*</span>
                        </label>
                        <CustomSelect
                            options={missionOptions}
                            value={missionOptions.find((o) => o.value === String(selectedMissionId || '')) || null}
                            onChange={(selected) => setValue('missionId', selected?.value || '', { shouldValidate: true })}
                            placeholder="Select Mission"
                            showIndicator={false}
                            className="form-control"
                        />
                        {errors.missionId && <span className="error">{errors.missionId.message}</span>}
                    </div>
                </div>

                {/* Center */}
                <div className="col-sm-6">
                    <div className="form-group forms-custom">
                        <label className="label">
                            Center<span className="text-danger">*</span>
                        </label>
                        <CustomSelect
                            options={centerOptions}
                            value={centerOptions.find((o) => o.value === String(selectedCenterId || '')) || null}
                            onChange={(selected) => setValue('centerId', selected?.value || '', { shouldValidate: true })}
                            placeholder="Select Center"
                            showIndicator={false}
                            className="form-control"
                        />
                        {errors.centerId && <span className="error">{errors.centerId.message}</span>}
                    </div>
                </div>

                {/* Application Type */}
                <div className="col-sm-6">
                    <div className="form-group forms-custom">
                        <label className="label">
                            Application Type<span className="text-danger">*</span>
                        </label>
                        <CustomSelect
                            options={applicationTypeOptions}
                            value={
                                applicationTypeOptions.find((o) => o.value === String(selectedApplicationTypeId || '')) || null
                            }
                            onChange={(selected) =>
                                setValue('applicationTypeId', selected?.value || '', { shouldValidate: true })
                            }
                            placeholder="Select Application Type"
                            showIndicator={false}
                            className="form-control"
                        />
                        {errors.applicationTypeId && <span className="error">{errors.applicationTypeId.message}</span>}
                    </div>
                </div>

                {/* Appointment Type */}
                <div className="col-sm-6">
                    <div className="form-group forms-custom">
                        <label className="label">
                            Appointment Type<span className="text-danger">*</span>
                        </label>
                        <CustomSelect
                            options={appointmentTypeOptions}
                            value={
                                appointmentTypeOptions.find((o) => o.value === String(selectedAppointmentTypeId || '')) || null
                            }
                            onChange={(selected) =>
                                setValue('appointmentTypeId', selected?.value || '', { shouldValidate: true })
                            }
                            placeholder="Select Appointment Type"
                            showIndicator={false}
                            className="form-control"
                        />
                        {errors.appointmentTypeId && <span className="error">{errors.appointmentTypeId.message}</span>}
                    </div>
                </div>

                {/* Off days - multi select */}
                <div className="col-sm-6">
                    <div className="form-group forms-custom">
                        <label className="label">Off days</label>

                        <Controller
                            control={control}
                            name="offDays"
                            render={({ field }) => (
                                <CustomSelect
                                    options={offDaysOptions}
                                    isMulti
                                    value={offDaysOptions.filter((o) => (field.value || []).includes(o.value))}
                                    onChange={(selected) => {
                                        const values = (selected || []).map((s) => s.value);
                                        field.onChange(values);
                                    }}
                                    placeholder="Select Off days"
                                    showIndicator={false}
                                    className="form-control"
                                />
                            )}
                        />

                        {errors.offDays && <span className="error">{errors.offDays.message}</span>}
                    </div>
                </div>

                {/* Start time */}
                <div className="col-sm-6">
                    <div className="form-group forms-custom">
                        <label className="label">
                            Start time<span className="text-danger">*</span>
                        </label>
                        <input type="time" className="form-control" {...register('startTime')} />
                        {errors.startTime && <span className="error">{errors.startTime.message}</span>}
                    </div>
                </div>

                {/* End time */}
                <div className="col-sm-6">
                    <div className="form-group forms-custom">
                        <label className="label">
                            End time<span className="text-danger">*</span>
                        </label>
                        <input type="time" className="form-control" {...register('endTime')} />
                        {errors.endTime && <span className="error">{errors.endTime.message}</span>}
                    </div>
                </div>

                {/* Lunch break time range */}
                <div className="col-sm-6">
                    <div className="form-group forms-custom">
                        <label className="label">Lunch break (Start)</label>
                        <input type="time" className="form-control" {...register('lunchStartTime')} />
                        {errors.lunchStartTime && <span className="error">{errors.lunchStartTime.message}</span>}
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="form-group forms-custom">
                        <label className="label">Lunch break (End)</label>
                        <input type="time" className="form-control" {...register('lunchEndTime')} />
                        {errors.lunchEndTime && <span className="error">{errors.lunchEndTime.message}</span>}
                    </div>
                </div>

                {/* Slot period */}
                <div className="col-sm-6">
                    <div className="form-group forms-custom">
                        <label className="label">
                            Slot period<span className="text-danger">*</span>
                        </label>
                        <CustomSelect
                            options={slotPeriodOptions}
                            value={slotPeriodOptions.find((o) => o.value === watch('slotPeriod')) || null}
                            onChange={(selected) => setValue('slotPeriod', selected?.value || '', { shouldValidate: true })}
                            placeholder="Select Slot period"
                            showIndicator={false}
                            className="form-control"
                        />
                        {errors.slotPeriod && <span className="error">{errors.slotPeriod.message}</span>}
                    </div>
                </div>

                {/* Slot capacity */}
                <div className="col-sm-6">
                    <div className="form-group forms-custom">
                        <label className="label">
                            Slot capacity<span className="text-danger">*</span>
                        </label>
                        <CustomSelect
                            options={slotCapacityOptions}
                            value={slotCapacityOptions.find((o) => o.value === watch('slotCapacity')) || null}
                            onChange={(selected) => setValue('slotCapacity', selected?.value || '', { shouldValidate: true })}
                            placeholder="Select Slot capacity"
                            showIndicator={false}
                            className="form-control"
                        />
                        {errors.slotCapacity && <span className="error">{errors.slotCapacity.message}</span>}
                    </div>
                </div>

                {/* Max slots */}
                <div className="col-sm-6">
                    <div className="form-group forms-custom">
                        <label className="label">
                            Max slots<span className="text-danger">*</span>
                        </label>
                        <CustomSelect
                            options={maxSlotsOptions}
                            value={maxSlotsOptions.find((o) => o.value === watch('maxSlots')) || null}
                            onChange={(selected) => setValue('maxSlots', selected?.value || '', { shouldValidate: true })}
                            placeholder="Select Max slots"
                            showIndicator={false}
                            className="form-control"
                        />
                        {errors.maxSlots && <span className="error">{errors.maxSlots.message}</span>}
                    </div>
                </div>

                {/* Booking allow from */}
                <div className="col-sm-6">
                    <div className="form-group forms-custom">
                        <label className="label">
                            Booking allow from<span className="text-danger">*</span>
                        </label>
                        <input type="date" className="form-control" {...register('bookingAllowFrom')} />
                        {errors.bookingAllowFrom && <span className="error">{errors.bookingAllowFrom.message}</span>}
                    </div>
                </div>

                {/* Booking allow till */}
                <div className="col-sm-6">
                    <div className="form-group forms-custom">
                        <label className="label">
                            Booking allow till<span className="text-danger">*</span>
                        </label>
                        <input type="date" className="form-control" {...register('bookingAllowTill')} />
                        {errors.bookingAllowTill && <span className="error">{errors.bookingAllowTill.message}</span>}
                    </div>
                </div>

                {/* Blocked dates */}
                <div className="col-sm-12">
                    <div className="form-group forms-custom">
                        <label className="label">Blocked dates</label>
                        <textarea
                            className="form-control"
                            rows={2}
                            placeholder="YYYYMMDD, YYYYMMDD, ..."
                            {...register('blockedDates')}
                        />
                        {errors.blockedDates && <span className="error">{errors.blockedDates.message}</span>}
                    </div>
                </div>

                {/* Release dates */}
                <div className="col-sm-12">
                    <div className="form-group forms-custom">
                        <label className="label">Release dates</label>
                        <textarea
                            className="form-control"
                            rows={2}
                            placeholder="YYYYMMDD, YYYYMMDD, ..."
                            {...register('releaseDates')}
                        />
                        {errors.releaseDates && <span className="error">{errors.releaseDates.message}</span>}
                    </div>
                </div>

                {/* Slot full dates */}
                <div className="col-sm-12">
                    <div className="form-group forms-custom">
                        <label className="label">Slot full dates</label>
                        <textarea
                            className="form-control"
                            rows={2}
                            placeholder="YYYYMMDD, YYYYMMDD, ..."
                            {...register('slotFullDates')}
                        />
                        {errors.slotFullDates && <span className="error">{errors.slotFullDates.message}</span>}
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
