import { useEffect, useState } from 'react';
import './Preview.scss';

// The component for loading preview on UI
function Preview({ isProduct }) {
  const [isSingleProduct, setIsSingleProduct] = useState(false);

  useEffect(() => {
    setIsSingleProduct(isProduct);
  }, [isProduct]);

  // Conditional rendering 
  if (isSingleProduct) {
    return (
      <div className="product animate-pulse shadow-2xl shadow-zinc-400 rounded-lg min-h-max md:h-600 lg:h-700 min-w-250 w-3/5 mx-auto" >
        <div className='h-10 bg-slate-700 py-2 rounded-t-lg'></div>
        <div className='bg-slate-700 h-48 md:h-64 lg:h-80 mx-auto mt-2'></div>
        <div className="details p-2 flex flex-col space-y-3 ">
          <div className='rounded bg-slate-700 w-2/5 h-10'></div>
          <div className='rounded bg-slate-700 w-2/5 h-10'></div>
          <div className='rounded bg-slate-700 w-2/5 h-10'></div>
          <div className='rounded bg-slate-700 w-2/5 h-10'></div>
          <div className='rounded bg-slate-700 w-2/5 h-10'></div>
          <div className='rounded bg-slate-700 w-full h-12'></div>
        </div>
      </div>
    );
  }

  return (
    <div className="product animate-pulse shadow-2xl shadow-zinc-400 rounded-lg h-9/12 min-w-250 w-3/5 mx-auto sm:w-full" >
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
    </div>
  );
}

export default Preview;
