import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useInventoryStore from '../../stores/InventoryReducer';
import CommonHeader from '../../components/common/CommonHeader';

const InventoryView = () => {
  const { getItemById, inventoryItem } = useInventoryStore((state) => state);
  console.log(' inventoryItem', inventoryItem);
  const params = useParams();

  useEffect(() => {
    if (params.id) getItemById(params.id);
  }, [params?.id]);
  return (
    <>
      <CommonHeader hideRightSide />
      <div>{JSON.stringify(inventoryItem)}</div>
    </>
  );
};

export default InventoryView;
