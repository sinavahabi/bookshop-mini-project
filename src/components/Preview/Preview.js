import { useEffect, useState } from 'react';
import './Preview.scss';

// The component for loading preview on UI
function Preview({ isProduct, isBookshelf }) {
  const [isSingleProduct, setIsSingleProduct] = useState(false);
  const [isBookshelfItem, setIsBookshelfItem] = useState(false);

  useEffect(() => {
    setIsSingleProduct(isProduct);
    setIsBookshelfItem(isBookshelf);
  }, [isProduct, isBookshelf]);

  // Conditional rendering 
  if (isBookshelfItem) {
    return (
      // When rendering happens for bookshelf list
      <div className="bookshelf animate-pulse border-b-2 py-3 rounded-md flex items-center flex-wrap" >
        <div className=' h-9/12 w-40 m-3'>
          <div className='h-8 bg-slate-700 py-2 rounded-t-md'></div>
          <div className='bg-slate-700 h-32 my-1'></div>
          <div className='h-7 bg-slate-700 py-2 rounded-b-md'></div>
        </div>
        <div className=' h-9/12 w-40 m-3'>
          <div className='h-8 bg-slate-700 py-2 rounded-t-md'></div>
          <div className='bg-slate-700 h-32 my-1'></div>
          <div className='h-7 bg-slate-700 py-2 rounded-b-md'></div>
        </div>
      </div>
    );
  } else if (isSingleProduct) {
    return (
      // When rendering happens for a single product
      <div className="product animate-pulse shadow-2xl shadow-zinc-400 rounded-lg min-h-max sm:min-h-400 md:min-h-500 lg:min-h-600 min-w-250 w-3/5 mx-auto" >
        <div className='h-10 bg-slate-700 py-2 rounded-t-lg'></div>
        <div className='bg-slate-700 h-40 my-1'></div>
        <div className="details p-2 flex flex-col space-y-3 ">
          <div className='rounded bg-slate-700 w-1/2 h-8'></div>
          <div className='rounded bg-slate-700 w-1/2 h-8'></div>
          <div className='rounded bg-slate-700 w-1/2 h-8'></div>
          <div className='rounded bg-slate-700 w-1/2 h-8'></div>
          <div className="flex justify-between items-center">
            <div className='rounded bg-slate-700 w-2/5 h-8'></div>
            <div className='rounded bg-slate-700 w-2/5 h-8'></div>
          </div>
        </div>
        <div className='h-20 mt-24 bg-slate-700 py-2 rounded-b-lg'></div>
      </div>
    );
  } else {
    // When rendering happens for products list
    return (
      <div className="products animate-pulse hover:rotate-3 transition shadow-2xl shadow-zinc-400 rounded-lg h-9/12 min-w-250 w-3/5 mx-auto sm:w-full" >
        <div className='h-10 bg-slate-700 py-2 rounded-t-lg'></div>
        <div className='bg-slate-700 h-48 md:h-56 lg:h-68 mx-auto mt-2'></div>
        <div className="details p-2 flex flex-col space-y-3">
          <div className='rounded bg-slate-700 w-2/5 h-8'></div>
          <div className='rounded bg-slate-700 w-2/5 h-8'></div>
          <div className='rounded bg-slate-700 w-2/5 h-8'></div>
        </div>
        <div className="flex items-center justify-between m-2">
          <div className='rounded bg-slate-700 w-2/5 h-8'></div>
          <div className='rounded bg-slate-700 w-2/5 h-8'></div>
        </div>
        <div className="flex items-center justify-between m-2">
          <div className='rounded bg-slate-700 w-2/5 h-8'></div>
          <div className='rounded bg-slate-700 w-2/5 h-8'></div>
        </div>
      </div>
    );
  }
}

export default Preview;
