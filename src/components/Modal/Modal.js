import './Modal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { blurActions } from '../../store/blur-slice';
import { useEffect } from 'react';

function Modal({ modalTitle, showModal, setShowModal, children }) {
  const dispatch = useDispatch();

  // Blur outside the modal content when Modal component is mounted
  useEffect(() => {
    dispatch(blurActions.blurOn());

    return () => {
      dispatch(blurActions.blurOut());
    }
  }, [])

  const closeModal = () => {
    setShowModal(false);
    dispatch(blurActions.blurOut());
  };

  return (
    <section style={{ left: '11%' }} className={`fixed top-0 w-4/5 h-full z-50 flex justify-center items-center ${showModal ? 'flex' : 'hidden'}`} >
      <div className="dark:shadow-lg dark:shadow-zinc-700 dark:bg-zinc-900 shadow-2xl shadow-zinc-500 bg-white rounded-lg">
        <div className="flex justify-between items-center p-4 border-b-2">
          <h2 className="text-lg font-semibold">{modalTitle}</h2>
          <button onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} className="btn btn-circle dark:text-slate-100 text-slate-600 hover:btn-dark medium px-2 py-1" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </section>
  );
}

export default Modal;
