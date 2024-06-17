import { useState, useEffect } from 'react';
import './ProgressBar.scss';

function ProgressBar({ duration }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress < 200) {
          return prevProgress + 1;
        } else {
          clearInterval(interval);
          return 200;
        }
      });
    }, duration / 200);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div className='w-full h-2 dark:bg-zinc-700 bg-white overflow-hidden rounded-none rounded-b-md'>
      <div className='h-full bg-red-400 transition-width duration-200 linear' style={{ width: `${progress}%` }}></div>
    </div>
  );
}

export default ProgressBar;
