import './Modal.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { blurActions } from '../../store/blur-slice';

function Modal({ modalTitle, closeBtn, children }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
    dispatch(blurActions.blurOut());
  };

  return (
    <section className={`fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center ${showModal ? 'block' : 'hidden'}`} >
      <div className="shadow-2xl shadow-zinc-500 bg-white rounded-lg">
        <div className="flex justify-between items-center p-4 border-b-2">
          <h2 className="text-lg font-semibold">{modalTitle}</h2>
          {closeBtn && (
            <button onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} className="btn btn-circle text-slate-600 hover:btn-dark medium px-2 py-1" />
            </button>
          )}
        </div>
        <div className="p-4">{children}</div>
      </div>
    </section>
  );
}

export default Modal;
