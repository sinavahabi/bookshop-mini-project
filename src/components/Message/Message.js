import './Message.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faWarning, faExclamationCircle, faCheck, faBullhorn } from '@fortawesome/free-solid-svg-icons';

function Message({ type, text, size }) {
  return (
    <section className={`message m-auto ${size === 'large' ? 'relative -top-6 w-full' : size === 'medium' ? 'md:w-1/2 w-5/6' : 'w-1/5 min-w-260'}`}>
      <div
        className={`flex justify-between items-center text-white p-3 ${size === 'large' ? 'rounded-none' : size === 'medium' ? 'rounded-xl' : 'rounded-2xl'}`}
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
        <p className={`text-center ${size === 'large' ? 'medium' : size === 'medium' ? 'small' : 'smaller'}`}>{text}</p>
        <FontAwesomeIcon
          icon={
            type === 'success'
              ? faCheckCircle
              : type === 'warning'
                ? faWarning
                : type === 'error'
                  ? faExclamationCircle
                  : type === 'primary'
                    ? faCheck
                    : faBullhorn
          }
          className={`${size === 'large'
            ? 'larger'
            : size === 'medium'
              ? 'large'
              : 'medium'
            }`} />
      </div>
    </section>
  );
}

export default Message;
