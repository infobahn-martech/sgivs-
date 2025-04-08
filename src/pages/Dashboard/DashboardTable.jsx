// components/common/DashboardSectionTable.js
import React from 'react';
import NoTableData from '../../components/common/NoTableData';
import CommonSkeleton from '../../components/common/CommonSkeleton';

const DashboardSectionTable = ({
  title,
  icon,
  data = [],
  columns = [],
  onViewAll,
  isLoading,
}) => {
  return (
    <div className="table-wrp">
      <div className="top-blk">
        <div className="left-wrap">
          <div className="icon-title">
            <img src={icon} alt="" className="img" />
            <span>{title}</span>
          </div>
        </div>
        <button className="btn btn-view" onClick={onViewAll}>
          View All
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <tbody>
            <tr>
              {columns?.map((col, idx) => (
                <th key={idx} className={col.titleClasses}>
                  {col.isSortable ? (
                    <div className="sort-wrap">{col.name}</div>
                  ) : (
                    col.name
                  )}
                </th>
              ))}
            </tr>

            {isLoading ? (
              Array.from({ length: 10 })?.map((index, inx) => (
                <tr key={`${index}${inx}`}>
                  {columns?.map(({ colClassName = '', selector }) => (
                    <td
                      className={colClassName}
                      key={`cell${selector + (index + inx)}`}
                    >
                      <CommonSkeleton height={30} />
                    </td>
                  ))}
                </tr>
              ))
            ) : !data?.length ? (
              <NoTableData columns={columns} />
            ) : (
              data?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns?.map((col, colIndex) => (
                    <td key={colIndex} className={col.colClassName || ''}>
                      {col.cell ? (
                        <div className={` ${col.contentClass}`}>
                          {col.cell(row)}
                        </div>
                      ) : (
                        row[col.selector]
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardSectionTable;
