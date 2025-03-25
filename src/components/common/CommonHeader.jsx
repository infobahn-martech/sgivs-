import { useLocation } from 'react-router-dom';
import { headerConfig } from '../../config/config';
import filterImg from '../../assets/images/sort.svg';

const CommonHeader = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const headerInfo = headerConfig?.find((item) =>
    currentPath?.startsWith(item.path)
  ) || {
    title: 'Page Not Found',
    icon: 'img/default.svg',
  };

  return (
    <div className="table-header-wrap">
      <div className="left-wrap">
        <div className="icon-title">
          <img src={headerInfo?.icon} alt="" className="img" />
          <span>{headerInfo?.title}</span>
        </div>
      </div>
      <div className="right-wrap">
        <div className="search-wrap">
          <input type="text" className="txt" placeholder="Search Controls" />
        </div>
        <div className="filter-wrap">
          <span>Filter</span>
          <img src={filterImg} alt="" className="img" />
        </div>
      </div>
    </div>
  );
};

export default CommonHeader;
