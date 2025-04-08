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
  const hasData = data.length > 0;

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
        {isLoading ? (
          <table className="table table-striped">
            <tbody>
              {Array.from({ length: 10 }).map((_, inx) => (
                <tr key={inx}>
                  {columns.map(({ colClassName = '' }, colIndex) => (
                    <td key={colIndex} className={colClassName}>
                      <CommonSkeleton height={30} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : hasData ? (
          <table className="table table-striped">
            <thead>
              <tr>
                {columns.map((col, idx) => (
                  <th key={idx} className={col.titleClasses}>
                    {col.isSortable ? (
                      <div className="sort-wrap">{col.name}</div>
                    ) : (
                      col.name || '-'
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className={col.colClassName || ''}>
                      {col.cell ? (
                        <div className={` ${col.contentClass}`}>
                          {col.cell(row) || '-'}
                        </div>
                      ) : (
                        row[col.selector] || '-'
                      )}
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
