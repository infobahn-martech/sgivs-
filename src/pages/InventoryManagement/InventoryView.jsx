import CommonHeader from '../../components/common/CommonHeader';
import CustomModal from '../../components/common/CustomModal';
import barcodeImg from '../../assets/images/barcode-img.png';
import download from '../../assets/images/download-circle-btn.svg';
import { downloadContent } from '../../helpers/utils';

const InventoryView = ({ showModal, closeModal, inventoryItem }) => {
  // const { getItemById, inventoryItem } = useInventoryStore((state) => state);
  // const params = useParams();

  // useEffect(() => {
  //   if (params.id) getItemById(params.id);
  // }, [params?.id]);

  const renderHeader = () => (
    <>
      <h5 className="modal-title" id="uploadModalLabel">
        Inventory Details
      </h5>
      <button
        type="button"
        className="btn-close"
        onClick={closeModal}
        aria-label="Close"
      ></button>
    </>
  );

  const renderBody = () => (
    <div className="modal-body">
      <div className="detail-view-wrp">
        <div className="dtl-top">
          <div className="profile-pic">
            <img src={inventoryItem?.images[0]?.url} alt="Item" />
          </div>
          <div className="dtl-rt">
            <div className="blks">
              <div className="title">Item Name</div>
              <span className="value">{inventoryItem?.itemName || 'N/A'}</span>
            </div>
            <div className="blks">
              <div className="title">Item ID</div>
              <span className="value">#{inventoryItem?.itemId || 'N/A'}</span>
            </div>
            {/* <div className="blks">
              <div className="title">Quantity</div>
              <span className="value">{inventoryItem?.quantity || 'N/A'}</span>
            </div> */}
          </div>
        </div>
        <div className="middle-blk">
          <div className="title">Part Name</div>
          <div className="tag-wrp">
            {inventoryItem?.inventory_parts?.map((part, index) => (
              <span key={index} className="tags">
                {part.partName}
              </span>
            ))}
          </div>
        </div>
        <div className="barcode-wrp">
          <div className="title">Download Barcode</div>
          <div className="barcode-box-wrp">
            <div className="bracode">
              <img src={barcodeImg} alt="Barcode" />
            </div>
            <button className="btn btn-dwnload">
              <img
                src={download}
                alt="Download"
                onClick={() =>
                  downloadContent(
                    inventoryItem.barcode,
                    `${inventoryItem.itemId}.png`
                  )
                }
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <CommonHeader hideRightSide />
      <CustomModal
        className="detail-view-modal"
        dialgName="modal-dialog-scrollable"
        show={showModal}
        closeModal={closeModal}
        header={renderHeader()}
        body={renderBody()}
      />
    </>
  );
};

export default InventoryView;
