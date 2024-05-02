import './Modal.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

function Modal({closeBtn, children }) {
  const [showModal, setShowModal] = useState(true);
  return (
    <section className='main flex flex-col justify-center items-center'>
      {showModal ? <div className='relative z-30 w-3/5 min-h-400 rounded-md shadow-2xl shadow-zinc-500 p-2'>
        <div className='w-full'>
          {closeBtn && <button type='button' className='btn focus:ring-0 focus:ring-offset-0 medium float-left' onClick={() => setShowModal(false)}>
            <FontAwesomeIcon className='medium' icon={faClose} />
          </button>}
          <br/><br/>
          <div className="content">{children}</div>
        </div>
      </div> : <></>}
    </section>
  );
}

export default Modal;
