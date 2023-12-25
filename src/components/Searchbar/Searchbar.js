import './Searchbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Searchbar() {
  return (
    <form>
      <div className='search-form flex justify-around items-center'>
        <input type='text' name='search' id='search' placeholder='جستجوی کتاب' className='small py-1 px-1 ml-1 input' />
        <button type='submit' className='btn btn-dark py-1 ml-1 border-2 border-slate-700 hover:bg-slate-500 hover:border-slate-500'>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </form>
  );
}

export default Searchbar;
