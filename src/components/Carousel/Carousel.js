import './Carousel.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);

  const previousSlide = () => {
    if (current === 0) {
      setCurrent(slides.length - 1);
    } else {
      setCurrent(current - 1);
    };
  };

  const nextSlide = () => {
    if (current === slides.length - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    };
  };

  useEffect(() => {
    const slidesInterval = setInterval(() => {
      if (current === slides.length - 1) {
        setCurrent(0);
      } else {
        setCurrent(prevState => prevState + 1);
      };
    }, 3000);

    return () => clearInterval(slidesInterval);
  }, [current, slides?.length]);

  return (
    <main dir='ltr' className="relative overflow-hidden rounded-md">
      {/* Slides */}
      <div className='flex transition h-auto md:h-600 lg:h-auto max-h-480 ease-out duration-500' style={{ transform: `translateX(-${current * 100}%)` }}>
        {
          slides.map((cs, i) => (
            <img key={i} src={cs} alt="pic" />
          ))
        }
      </div>
      {/* Navigation buttons */}
      <div className="absolute flex items-center px-2 justify-between top-0 w-full h-full text-white">
        <button className='flex justify-center items-center btn btn-circle px-2 py-1 transition-all duration-500 hover:bg-gray-400' type="button" onClick={previousSlide}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button className='flex justify-center items-center btn btn-circle px-2 py-1 transition-all duration-500 hover:bg-gray-400' type="button" onClick={nextSlide}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
      {/* Pagination buttons */}
      <div className="absolute bottom-0 py-4 flex justify-center items-center gap-3 w-full">
        {slides.map((s, i) => (
          <div onClick={() => setCurrent(i)} key={"circle" + i} className={`rounded-full w-3 h-3 md:w-5 md:h-5 cursor-pointer ${i === current ? "bg-white" : "bg-gray-500"}`}></div>
        ))}
      </div>
    </main>
  );
}

export default Carousel;