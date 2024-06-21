import './Searchbar.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faSearch, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { decryption, encryption } from '../../token/token';

function Searchbar() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [darkMode, setDarkMode] = useState(undefined);
  const [term, setTerm] = useState('');
  const [emptyValue, setEmptyValue] = useState(false);

  const toggleThemeMode = () => {
    setDarkMode(prevState => !prevState);
  };

  useEffect(() => {
    const bookshopApp = document.querySelector('.bookshop-app');

    if (darkMode) {
      bookshopApp.classList.add('dark');
      encryption('D8DC79B5A6C63C89', 'dm', 'true');
    } else if (darkMode === false) {
      bookshopApp.classList.remove('dark');
      encryption('D8DC79B5A6C63C89', 'dm', 'false');
    } else {
      setDarkMode(decryption('D8DC79B5A6C63C89', 'dm') === 'true');
    }
  }, [darkMode]);

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
    <main className='flex justify-center items-center'>
      <button type="button" className='flex ml-3' onClick={toggleThemeMode}>
        <FontAwesomeIcon className='dark:text-white' icon={darkMode ? faMoon : faSun} />
      </button>
      <form className='relative' onSubmit={handleSearch}>
        {emptyValue && <section className='absolute z-20 left-3 top-14 flex flex-wrap'>
          <span className='p-2 smaller bg-white dark:bg-zinc-700 rounded-b-none rounded-l-none rounded-md'>ابتدا عنوان سرچ خود را وارد کنید!</span>
          <button type='button' onClick={() => setEmptyValue(false)} className='btn btn-circle dark:bg-zinc-700 bg-white focus:ring-0 focus:ring-offset-0 rounded-bl-none rounded-r-none rounded-md'>
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
    </main>

  );
}

export default Searchbar;
