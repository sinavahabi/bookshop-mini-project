import './Pagination.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown, faAngleDoubleLeft, faAngleDoubleRight, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';

function Pagination({ totalCount, limit, pageNum, setPageNum }) {

  // Calculate total number of pages
  const totalPages = Math.ceil(totalCount / limit);

  // Determine the range of page numbers to display
  const displayPages = () => {
    const maxPagesToShow = 6;
    const halfMaxPages = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      // If total pages are less than or equal to the maximum, display all pages
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      // Calculate the start and end of the page range based on current pageNum
      let startPage, endPage;

      if (pageNum <= halfMaxPages) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (pageNum + halfMaxPages >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = pageNum - halfMaxPages;
        endPage = pageNum + halfMaxPages;
      }

      return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    }
  };

  return (
    <footer>
      <div className="flex justify-center items-start sm:items-center shadow-2xl shadow-zinc-500 bg-white rounded-lg w-36 min-w-fit sm:min-w-400 mx-auto mt-8 sm:w-1/3">
        <button
          type="button"
          disabled={pageNum === 1}
          className={`btn rounded-none focus:ring-offset-0 focus:ring-0 hover:bg-inherit hover:text-inherit sm:hover:bg-sky-300 sm:hover:text-white transition-all duration-300 ${pageNum === 1 ? 'opacity-60 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
          onClick={() => setPageNum(pageNum - 1)}
        >
          <FontAwesomeIcon className='hidden sm:inline-block' icon={faAngleDoubleRight} />
          <FontAwesomeIcon className='visible sm:hidden' icon={faAngleDoubleUp} />
        </button>
        <ul className="flex justify-center items-center  flex-col sm:flex-row">
          {displayPages().map((page) => (
            <li className='mx-1' key={page}>
              <button
                type="button"
                className={`btn rounded-none focus:ring-offset-0 focus:ring-0 hover:bg-sky-300 hover:text-white transition-all duration-300 ${pageNum === page ? 'bg-sky-500 text-white sm:border-t-2 sm:border-t-sky-600 sm:bg-inherit sm:text-inherit' : ''}`}
                onClick={() => setPageNum(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          disabled={pageNum === totalPages}
          className={`btn rounded-none focus:ring-offset-0 focus:ring-0 hover:bg-inherit hover:text-inherit sm:hover:bg-sky-300 sm:hover:text-white transition-all duration-300 ${pageNum === totalPages ? 'opacity-60 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
          onClick={() => setPageNum(pageNum + 1)}
        >
          <FontAwesomeIcon className='hidden sm:inline-block' icon={faAngleDoubleLeft} />
          <FontAwesomeIcon className='visible sm:hidden' icon={faAngleDoubleDown} />
        </button>
      </div>
    </footer>
  );
}

export default Pagination;
