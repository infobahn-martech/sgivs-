import React, { useEffect, useRef, useState } from 'react';

const ActionsMenu = ({
  row,
  onNewSlotRelease,
  onSettings,
  onBlockDates,
  onEditSlots,
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const toggle = (e) => {
    e.stopPropagation();
    setOpen((s) => !s);
  };

  const handleItem = (e, cb) => {
    e.stopPropagation();
    setOpen(false);
    cb?.(row);
  };

  return (
    <div className="action-menu" ref={menuRef} onClick={(e) => e.stopPropagation()}>
      <button type="button" className="action-menu__btn" onClick={toggle} aria-label="More actions">
        ⋮
      </button>

      {open && (
        <div className="action-menu__dropdown">
          <button type="button" onClick={(e) => handleItem(e, onNewSlotRelease)}>
            New Slot Release
          </button>
          <button type="button" onClick={(e) => handleItem(e, onSettings)}>
            Settings
          </button>
          <button type="button" onClick={(e) => handleItem(e, onBlockDates)}>
            Block Dates
          </button>
          <button type="button" onClick={(e) => handleItem(e, onEditSlots)}>
            Edit Slots
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionsMenu;
