import React from 'react';
import NoTableData from '../../components/common/NoTableData';

// ✅ Put any local icon here if you want
// import SampleIcon from "../../assets/images/sample-icon.svg";

const DashboardSectionTable = () => {
  // ✅ STATIC values
  const title = 'Recent Activities';
  const icon = ''; // SampleIcon or keep empty
  const isLoading = false;

  // ✅ STATIC columns
  const columns = [
    { name: 'User', selector: 'user', titleClasses: '', colClassName: '' },
    {
      name: 'Activity',
      selector: 'activity',
      titleClasses: '',
      colClassName: '',
    },
    { name: 'Status', selector: 'status', titleClasses: '', colClassName: '' },
    { name: 'Date', selector: 'date', titleClasses: '', colClassName: '' },
  ];

  // ✅ STATIC table data
  const data = [
    {
      user: 'John Mathew',
      activity: 'Created new application',
      status: 'Pending',
      date: '05 Feb 2026',
    },
    {
      user: 'Anju',
      activity: 'Updated document details',
      status: 'Approved',
      date: '04 Feb 2026',
    },
    {
      user: 'Dennis',
      activity: 'Assigned case to agent',
      status: 'In Progress',
      date: '03 Feb 2026',
    },
    {
      user: 'Admin',
      activity: 'Changed user permissions',
      status: 'Completed',
      date: '02 Feb 2026',
    },
  ];

  const hasData = data.length > 0;

  const onViewAll = () => {
    // ✅ Static action
    console.log('View All clicked');
    // You can navigate here if needed
    // navigate("/activities");
  };

  return (
    <div className="table-wrp">
      <div className="top-blk">
        <div className="left-wrap">
          <div className="icon-title">
            {icon ? <img src={icon} alt="" className="img" /> : null}
            <span>{title}</span>
          </div>
        </div>

        <button className="btn btn-view" onClick={onViewAll}>
          View All
        </button>
      </div>

      <div className="table-responsive">
        {isLoading ? (
          <div style={{ padding: 20 }}>Loading...</div>
        ) : hasData ? (
          <table className="table table-striped">
            <thead>
              <tr>
                {columns.map((col, idx) => (
                  <th key={idx} className={col.titleClasses}>
                    {col.name || '-'}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className={col.colClassName || ''}>
                      {row[col.selector] || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoTableData columns={columns} noColspan noBody />
        )}
      </div>
    </div>
  );
};

export default DashboardSectionTable;
