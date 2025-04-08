const CountBlock = ({ icon, label, count, className = '' }) => {
  return (
    <div className={`count-blk ${className}`}>
      <div className="icon-blk">
        <img src={icon} alt="" />
      </div>
      <div className="dtl-blk">
        <div className="info">{label || '-'}</div>
        <span className="count">{count || '-'}</span>
      </div>
    </div>
  );
};

export default CountBlock;
