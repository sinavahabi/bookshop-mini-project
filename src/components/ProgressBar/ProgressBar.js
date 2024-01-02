import { useState, useEffect } from 'react';
import './ProgressBar.scss';

function ProgressBar({ duration }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress < 100) {
          return prevProgress + 1;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, duration / 100);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div className='w-full h-2 bg-red-200 overflow-hidden'>
      <div className='h-full bg-red-500 transition-width duration-100 linear' style={{ width: `${progress}%` }}></div>
    </div>
  );
}

export default ProgressBar;
