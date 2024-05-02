import './Bookshelf.scss';
import { useSelector } from 'react-redux';
import { useFetch } from '../../hooks/useFetch';

function Bookshelf() {
  const currentUserId = useSelector(state => state.currentUser.id);
  const { data } = useFetch(currentUserId ? `http://localhost:5001/users/${currentUserId}` : '', 'GET');
  const { cartItems: boughtProducts } = data;

  return (
    <main className='main larger'>
      <ul>
        {boughtProducts?.map((rows, index) => (
          <li className='flex min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-normal max-[480px]:flex-col max-[480px]:items-center max-[480px]:justify-center flex-wrap border-b-2 py-3' key={index}>
            {rows?.map((row, i) => (
              <div className='flex flex-col justify-between items-center rounded-md shadow-2xl shadow-zinc-400 p-2 mx-2 my-3 w-52 h-60' key={i}>
                <h2 className='small font-medium text-center text-gray-700'>{row.title}</h2>
                <img src={row.image} className='h-32 mx-auto mt-2' alt='book-cover' />
                <div className="w-full flex justify-between items-center flex-wrap mt-2">
                  <h4 className='smaller font-medium text-gray-500'>{row.author}</h4>
                  <p className='smaller text-gray-500'>{`${row.quantity} عدد`}</p>
                </div>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Bookshelf;
