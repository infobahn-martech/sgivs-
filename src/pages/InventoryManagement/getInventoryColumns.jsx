import moment from 'moment';
import ImageCell from './ImageCell';
import { Tooltip } from 'react-tooltip';
import { Spinner } from 'react-bootstrap';

export const getInventoryColumns = ({
  showAction = true,
  setModal,
  getItemById,
  navigate,
  setModalConfig,
  downloadContent,
  viewIcon,
  editIcon,
  showHideIcon,
  deleteIcon,
  downloadIcon,
  downloadingRowId,
  setDownloadingRowId,
}) => {
  const baseColumns = [
    {
      name: 'Image',
      selector: 'image',
      titleClasses: 'tw1',
      contentClass: '',
      cell: (row) => <ImageCell src={row.images?.[0]} />,
    },
    {
      name: 'Item ID',
      selector: 'itemId',
      titleClasses: 'tw1',
    },
    {
      name: 'Item Name',
      selector: 'itemName',
      titleClasses: 'tw1',
      contentClass: 'user-pic',
    },
    {
      name: 'EZ Pass Number',
      selector: 'eZPassNumber',
      titleClasses: 'tw1',
      contentClass: 'user-pic',
      cell: (row) =>
        row?.eZPassNumber && row.eZPassNumber !== 'null'
          ? row.eZPassNumber
          : '-',
    },
    {
      name: 'Item Created date',
      selector: 'createdAt',
      titleClasses: 'tw1',
      contentClass: 'user-pic',
      cell: (row) => moment(row.createdAt).format('DD MMM, YYYY'),
    },
    {
      name: 'Have Parts',
      selector: 'haveParts',
      titleClasses: 'tw1',
      contentClass: 'user-pic',
      cell: (row) => <span>{row.hasParts ? 'Yes' : 'No'}</span>,
    },
  ];

  const actionColumn = {
    name: 'Action',
    selector: 'action',
    titleClasses: 'tw7',
    contentClass: 'action-wrap',
    cell: (row, rowIndex) => (
      <>
        <Tooltip
          id={`tooltip-${row.id || rowIndex}`}
          place="bottom"
          style={{ backgroundColor: '#2ca0da' }}
        />
        <span
          data-tooltip-id={`tooltip-${row.id || rowIndex}`}
          data-tooltip-content={'View'}
          onClick={() => {
            setModal({ id: row.id, mode: 'VIEW' });
            getItemById(row.id);
          }}
        >
          <img src={viewIcon} alt="view" />
        </span>
        <span
          data-tooltip-id={`tooltip-${row.id || rowIndex}`}
          data-tooltip-content={'Edit'}
          onClick={() => navigate(`/inventory-management/edit/${row.id}`)}
        >
          <img src={editIcon} alt="Edit" />
        </span>
        <span
          data-tooltip-id={`tooltip-${row.id || rowIndex}`}
          data-tooltip-content={row.isVisible ? 'Show' : 'Hide'}
          onClick={() =>
            setModalConfig({
              id: row.id,
              type: row.isVisible ? 'show' : 'hide',
              name: row?.itemName,
            })
          }
        >
          <img
            src={row.isVisible ? viewIcon : showHideIcon}
            alt={row.isVisible ? 'Hide' : 'Show'}
          />
        </span>
        <span
          data-tooltip-id={`tooltip-${row.id || rowIndex}`}
          data-tooltip-content={'Delete'}
          onClick={() =>
            setModalConfig({
              id: row.id,
              type: 'delete',
              name: row?.itemName,
            })
          }
        >
          <img src={deleteIcon} alt="Delete" />
        </span>
        <span
          className={
            downloadingRowId === (row?.id || rowIndex) ? 'loader-wrp' : ''
          }
          data-tooltip-id={`tooltip-${row.id || rowIndex}`}
          data-tooltip-content={'Download Barcode'}
          onClick={async () => {
            const rowId = row.id || rowIndex;
            setDownloadingRowId(rowId);
            try {
              await downloadContent(row.barcode, `${row.itemId}.png`);
            } catch (err) {
              console.error('Download failed', err);
            } finally {
              setDownloadingRowId(null);
            }
          }}
        >
          {downloadingRowId === (row?.id || rowIndex) ? (
            <Spinner size="sm" animation="border" variant="primary" />
          ) : (
            <img src={downloadIcon} alt="Download" />
          )}
        </span>
      </>
    ),
  };

  return showAction ? [...baseColumns, actionColumn] : baseColumns;
};
