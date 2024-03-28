import './Modal.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

function Modal({ inset, closeBtn, children }) {
  const [showModal, setShowModal] = useState(true);
  return (
    <section>
      {showModal ? <div className='relative'>
        <div className='absolute z-20 min-w-250 min-h-100 w-1/4 h-max bg-white shadow-2xl shadow-zinc-500 rounded-md' style={{ inset }}>
          {closeBtn && <button type='button' className='btn focus:ring-0 focus:ring-offset-0 medium' onClick={() => setShowModal(false)}>
            <FontAwesomeIcon className='medium' icon={faClose} />
          </button>}
          <div className="content">{children}</div>
        </div>
      </div> : <></>}
    </section>
  );
}

export default Modal;
