import './Message.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function Message({ type, text }) {
  return (
    <div className='message relative -top-6'>
      <div
        className='flex justify-between items-center text-white p-3'
        style={
          type === 'success'
            ? { backgroundColor: '#22c55e' }
            : type === 'warning'
              ? { backgroundColor: '#f97316' }
              : type === 'error'
                ? { backgroundColor: '#ef4444' }
                : type === 'primary'
                  ? { backgroundColor: '#2563eb' }
                  : { backgroundColor: '#334155' }
        }
      >
        <p className='large'>{text}</p>
        <FontAwesomeIcon icon={faCheckCircle} className='larger' />
      </div>
    </div>
  );
}

export default Message;
