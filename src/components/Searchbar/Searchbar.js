import './Searchbar.scss';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
// import closeIcon from '../../assets/icons/close-icon.svg';

function Searchbar() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [term, setTerm] = useState('');
  const [emptyValue, setEmptyValue] = useState(false);

  // Create a function to handle the search process
  const handleSearch = (event) => {
    event.preventDefault();

    if (term) {
      navigate(`/search?q=${term}`);
      // Hide error message if exists on UI
      setEmptyValue(false);
      setTerm('');
    } else {
      // Show error message on UI
      setEmptyValue(true);

      // Clear the message from UI after 2 seconds
      setTimeout(() => {
        setEmptyValue(false);
      }, 2000);
    }
  };

  return (
    <form className='relative' onSubmit={handleSearch}>
      {emptyValue && <section className='absolute z-20 left-3 top-14 flex flex-wrap'>
        <span className='p-2 smaller bg-white rounded-b-none rounded-l-none rounded-md'>ابتدا عنوان سرچ خود را وارد کنید!</span>
        <button type='button' onClick={() => setEmptyValue(false)} className='btn btn-circle bg-white focus:ring-0 focus:ring-offset-0 rounded-r-none rounded-md'>
          <FontAwesomeIcon icon={faClose} />
        </button>
        <ProgressBar duration={2000} />
      </section>}
      <div className='search-form flex justify-around items-center'>
        <input
          type='search'
          name='search'
          id='search'
          autoComplete='true'
          ref={inputRef}
          value={term}
          onChange={() => setTerm(inputRef.current?.value)}
          placeholder='جستجوی کتاب'
          className='small py-1 px-1 ml-1 input'
        />
        <button type='submit' className='btn btn-dark py-1 ml-1 border-2 border-slate-700 hover:bg-slate-500 hover:border-slate-500 focus:ring-0 focus:ring-offset-0'>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </form>
  );
}

export default Searchbar;
