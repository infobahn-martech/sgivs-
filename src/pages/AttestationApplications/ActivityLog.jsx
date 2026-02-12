import React from 'react';
import CustomModal from '../../components/common/CustomModal';

export function ActivityLog({ showModal, closeModal }) {

    // ✅ Dummy Activity Data (Replace with API later)
    const activityData = [
        {
            id: 1,
            user: 'Admin',
            action: 'Created Passport Application',
            date: '11 Feb 2026',
            time: '10:30 AM',
            status: 'Success',
        },
        {
            id: 2,
            user: 'Dany',
            action: 'Updated Applicant Details',
            date: '10 Feb 2026',
            time: '02:15 PM',
            status: 'Success',
        },
        {
            id: 3,
            user: 'Supervisor',
            action: 'Deleted Duplicate Entry',
            date: '09 Feb 2026',
            time: '12:05 PM',
            status: 'Warning',
        },
    ];

    const renderHeader = () => (
        <>
            <h4 className="modal-title">Activity Log</h4>
            <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeModal}
            />
        </>
    );

    const renderBody = () => (
        <div className="modal-body custom-scroll">
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Action</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {activityData.length > 0 ? (
                            activityData.map((log, index) => (
                                <tr key={log.id}>
                                    <td>{index + 1}</td>
                                    <td>{log.user}</td>
                                    <td>{log.action}</td>
                                    <td>{log.date}</td>
                                    <td>{log.time}</td>
                                    <td>
                                        <span
                                            className={`badge ${log.status === 'Success'
                                                ? 'bg-success'
                                                : 'bg-warning text-dark'
                                                }`}
                                        >
                                            {log.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    No Activity Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <CustomModal
            className="modal fade passport-application-modal show"
            dialgName="modal-dialog-scrollable modal-lg" // ✅ makes modal wider
            show={!!showModal}
            closeModal={closeModal}
            body={renderBody()}
            header={renderHeader()}
            footer={null}
            isLoading={false}
        />
    );
}

export default ActivityLog;
