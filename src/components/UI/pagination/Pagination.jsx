import { getPagesArray } from "../../../utils/pages";

const Pagination = ({totalPages, page, changePage}) => {
  let pagesArray = getPagesArray(totalPages);
  return (
    <div className='page__wrapper'>
      {pagesArray.map(item => 
        <span 
          onClick={() => changePage(item)}
          className={page === item ? 'page page__current' : 'page' } 
          key={item}
        >
          {item}
        </span>
      )}
    </div>
  );
}

export default Pagination;