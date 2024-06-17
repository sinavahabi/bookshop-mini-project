import './ChangePassword.scss';
import { useState, useRef, useEffect } from 'react';
import { faPhoneAlt, faLock, faEdit, faUserPlus, faUser, faArrowLeft, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Message from '../../components/Message/Message';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useFetch } from '../../hooks/useFetch';
import { decryption, encryption } from '../../token/token';

function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const previousPath = location.state?.previousPath;
  const phoneInput = useRef(null);
  const passwordInput = useRef(null);
  const confirmPassInput = useRef(null);
  const submitBtn = useRef(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [foundUser, setFoundUser] = useState(decryption('62316183CE913CFA', 'chpmb')?.length > 0 ? true : false);
  const [isFocused, setIsFocused] = useState({
    phone: false,
    password: false,
    confirmPassword: false
  });

  const [submitMessage, setSubmitMessage] = useState({
    successMessage: false,
    errorMessage: false,
    UserNotFoundMessage: false
  });

  const { form, formValidation, handleChangePassForm } = useForm();
  const { data: usersData, error: userError } = useFetch('http://localhost:5001/users', 'GET');
  const { loading, error, saveInfo } = useFetch(currentUserId ? `http://localhost:5001/users/${currentUserId}` : '', 'PUT');

  // Create a function to move each label related to its relevant input smoothly when the input element is focused in
  const inputFocusIn = (inputName) => {
    setIsFocused(prevState => ({
      ...prevState,
      [inputName]: true
    }));
  };

  // Create a function to move each label related to its relevant input smoothly when the input element is focused out
  const inputFocusOut = (inputRef, inputName) => {
    if (inputRef.current.value.length === 0) {
      setIsFocused(prevState => ({
        ...prevState,
        [inputName]: false
      }));
    }
  };

  // Create a function to automatically focus on empty phone input element when the "change-password" page is rendered
  const phoneInputFocus = phoneInput => {
    if (!phoneInput?.current?.value) {
      phoneInput?.current?.focus();
    }
  };

  // Create a function to automatically focus on empty password input element when the "change-password" page is rendered
  const passwordInputFocus = passwordInput => {
    if (!passwordInput?.current?.value) {
      passwordInput?.current?.focus();
    }
  };

  useEffect(() => {
    foundUser ? passwordInputFocus(passwordInput) : phoneInputFocus(phoneInput)
  }, [foundUser]);

  // Create a function to handle states after user clicks on edit button in order to change inserted phone number
  const handleEdit = () => {
    encryption('62316183CE913CFA', 'chpmb', '');
    setFoundUser(false);

    setIsFocused({
      phone: true,
      password: false,
      confirmPassword: false
    });

    handleChangePassForm();
    phoneInput.current.value = '';
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Find current user data if the number existed in current stage!
    const currentUser = usersData?.find(item => item?.phone === Number(phoneInput?.current?.value));

    if ((form[2].isDone && currentUser) || decryption('62316183CE913CFA', 'chpmb')?.length > 0) {
      // When a user is found based on inserted phone number   
      setCurrentUserId(currentUser.id);
      encryption('62316183CE913CFA', 'chpmb', phoneInput?.current?.value);
      setSubmitMessage(prevState => ({
        ...prevState,
        UserNotFoundMessage: false
      }));

      if (foundUser) {
        if (passwordInput?.current?.value === confirmPassInput?.current?.value) {
          // When passwords (first password and second one) and are equal with valid patterns
          setSubmitMessage(prevState => ({
            ...prevState,
            errorMessage: false,
            successMessage: true
          }));

          // Updating the user password
          saveInfo({
            ...currentUser,
            password: confirmPassInput?.current?.value
          });

          submitBtn.current.disabled = true;
          // Redirect to sign-in page after one second delay in successful submission
          if (!loading && !userError && !error) {
            setTimeout(() => {
              previousPath === '/dashboard' ? navigate("/dashboard") : navigate("/sign-in");
              submitBtn.current.disabled = false;
              encryption('62316183CE913CFA', 'chpmb', '');
            }, 2000);
          }
        } else {
          // When passwords (first password and second one) are not qual
          setSubmitMessage(prevState => ({
            ...prevState,
            successMessage: false,
            errorMessage: true
          }));

          submitBtn.current.disabled = true;

          setTimeout(() => {
            setSubmitMessage(prevState => ({
              ...prevState,
              errorMessage: false
            }));

            submitBtn.current.disabled = false;
          }, 3000);
        }
      }

      setFoundUser(true);
    } else {
      // When user is not found based on inserted phone number
      setSubmitMessage(prevState => ({
        ...prevState,
        UserNotFoundMessage: true
      }));
    }
  };

  return (
    <main className='main larger'>
      <div className="relative flex justify-center items-center flex-wrap">
        <div className={`submit-success submit-success-chp ${submitMessage.successMessage ? 'show' : ''}`}>
          {(submitMessage.successMessage && !userError && !loading && !error) && <Message type={'success'} text={'رمز عبور با موفقیت تغییر پیدا کرد!'} size={'small'} />}
        </div>
      </div>
      <div className="relative flex justify-center items-center flex-wrap">
        <div className={`submit-err submit-err-chp w-full ${submitMessage.errorMessage ? 'show' : submitMessage.UserNotFoundMessage ? 'show-alert' : ''}`}>
          {submitMessage.errorMessage ?
            <Message type={'error'} text={'تکرار رمز عبور صحیح نیست!'} size={'small'} /> :
            submitMessage.UserNotFoundMessage ?
              <Message type={'error'} text={'این شماره تماس ثبت نشده است!'} size={'medium'} /> :
              null}
        </div>
        {(userError || error) && <p className='text-red-400 medium absolute top-28 text-center'>خطایی رخ داده است! درحال حاضر امکان تغییر رمز عبور خود را ندارید!</p>}
      </div>
      <section className='h-screen lg:w-96 md:w-80 sm:w-72 w-64 mx-auto flex flex-col justify-center items-center flex-wrap'>
        <div className='change-password w-full'>
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className='form-container flex justify-center flex-col space-y-5 p-3 border-2 border-gray-400 rounded-md h-auto min-h-150'>
              <div className='larger text-center font-extrabold'>بازیابی رمز عبور</div>
              <div className={`phone-container ${foundUser ? 'opacity-50 cursor-default' : 'opacity-100 cursor-text'}`}>
                <div className='relative z-10'>
                  <label htmlFor='phone' className={`labels text-slate-600 absolute smaller bg-white dark:bg-zinc-800 dark:text-white lg:p-1 p-0 ${isFocused.phone ? 'focused' : ''}`}>شماره تماس</label>
                  <FontAwesomeIcon className={`phone-icon text-slate-600 absolute small bg-white dark:bg-zinc-800 dark:text-white p-1 ${isFocused.phone ? 'focused' : ''}`} icon={faPhoneAlt} />
                  <span className='absolute dark:text-white text-slate-400 lg:py-3 md:py-2 sm:py-2 pr-1 border-r-gray-400 border-r-2 pre-number small phone-elem'>98+</span>
                </div>
                <input
                  className={`input phone-elem block m-auto lg:py-3 lg:pr-3 lg:pl-10 md:py-2 md:pr-2 md:pl-9 sm:py-2 sm:pr-2 sm:pl-9 py-1 pr-1 pl-9 w-5/6 smaller ${foundUser ? 'dark:opacity-80 opacity-60 cursor-default' : 'opacity-100 cursor-text'} ${form[2].errStatus ? 'border-red-400 focus:border-red-400' : ''}`}
                  dir='ltr'
                  type='text'
                  name='phone'
                  id='phone'
                  ref={phoneInput}
                  defaultValue={decryption('62316183CE913CFA', 'chpmb')}
                  readOnly={foundUser}
                  onFocus={() => inputFocusIn('phone')}
                  onBlur={() => inputFocusOut(phoneInput, 'phone')}
                  onChange={() => formValidation(phoneInput)}
                />
                {form[2].errStatus ? <div className='text-red-400 mt-3 text-center smaller flex justify-center items-center flex-wrap'>{form[2].errorMessage}</div> : null}
              </div>
              {foundUser && <>
                <div className='password-container'>
                  <div className='relative z-10'>
                    <label htmlFor='password' className={`labels text-slate-600 absolute smaller bg-white dark:bg-zinc-800 dark:text-white lg:p-1 p-0 ${isFocused.password ? 'focused' : ''}`}>رمز عبور</label>
                    <FontAwesomeIcon className={`lock-icon text-slate-600 absolute small bg-white dark:bg-zinc-800 dark:text-white p-1 ${isFocused.password ? 'focused' : ''}`} icon={faLock} />
                  </div>
                  <input
                    className={`input block m-auto lg:py-3 lg:pr-20 md:py-2 md:pr-16 sm:py-2 sm:pr-16 py-1 pr-16 pl-1 w-5/6 smaller ${form[3].errStatus ? 'border-red-400 focus:border-red-400' : ''}`}
                    dir='ltr'
                    type='password'
                    name='pass'
                    id='password'
                    ref={passwordInput}
                    onFocus={() => inputFocusIn('password')}
                    onBlur={() => inputFocusOut(passwordInput, 'password')}
                    onChange={() => formValidation(passwordInput)}
                  />
                  {form[3].errStatus ? <div className='text-red-400 mt-3 text-center smaller flex justify-center items-center flex-wrap'>{form[3].errorMessage}</div> : null}
                </div>
                <div className='password-container'>
                  <div className='relative z-10'>
                    <label htmlFor='password' className={`labels text-slate-600 absolute smaller bg-white dark:bg-zinc-800 dark:text-white lg:p-1 p-0 ${isFocused.confirmPassword ? 'focused' : ''}`}>تکرار رمز عبور</label>
                    <FontAwesomeIcon className={`key-icon text-slate-600 absolute small bg-white dark:bg-zinc-800 dark:text-white p-1 ${isFocused.confirmPassword ? 'focused' : ''}`} icon={faKey} />
                  </div>
                  <input
                    className={`input block m-auto lg:py-3 lg:pr-28 md:py-2 md:pr-24 sm:py-2 sm:pr-24 py-1 pr-24 pl-1 w-5/6 smaller ${form[4].errStatus ? 'border-red-400 focus:border-red-400' : ''}`}
                    dir='ltr'
                    type='password'
                    name='confirmPass'
                    id='confirmPassword'
                    ref={confirmPassInput}
                    onFocus={() => inputFocusIn('confirmPassword')}
                    onBlur={() => inputFocusOut(confirmPassInput, 'confirmPassword')}
                    onChange={() => formValidation(confirmPassInput)}
                  />
                  {form[4].errStatus ? <div className='text-red-400 mt-3 text-center smaller flex justify-center items-center flex-wrap'>{form[4].errorMessage}</div> : null}
                </div>
              </>}
              <div className='change-password-btn-container flex flex-col space-y-3 justify-between'>
                <button
                  type='submit'
                  ref={submitBtn}
                  disabled={(foundUser && (!form[3].isDone || !form[4].isDone)) || (!foundUser && !form[2].isDone) || (loading || userError || error)}
                  className={`${(foundUser && form[3].isDone && form[4].isDone) || (!foundUser && form[2].isDone) || (loading || userError || error) ? 'opacity-100 cursor-pointer' : 'opacity-60 cursor-not-allowed'} btn btn-success w-10/12 smaller mx-auto flex justify-center items-center min-w-72 md:min-w-90`}
                >
                  {loading ?
                    <svg className="spinner" viewBox="0 0 50 50">
                      <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                    </svg> :
                    foundUser ? 'بازیابی رمز' : 'ثبت'}
                </button>
                {foundUser &&
                  (<div className={`flex flex-wrap justify-center items-center ${isHovered ? 'edit-icon-hovered' : ''}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <button type="button" className='edit-btn text-orange-400 focus:ring-0 focus:ring-offset-0 smaller' onClick={handleEdit}>ویرایش شماره</button>
                    <FontAwesomeIcon className='edit-icon mr-1 opacity-0 transition-opacity small text-orange-300' icon={faEdit} />
                  </div>)}
              </div>
              <div className={`navigation-buttons flex items-center ${!foundUser ? 'justify-between' : 'justify-evenly'} flex-wrap`}>
                {previousPath !== '/dashboard' && <div className={`flex flex-wrap justify-center items-center ${isHovered ? 'login-icon-hovered' : ''}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                  <NavLink to='/sign-in' className='smaller flex-grow text-center text-blue-700 focus:ring-0 focus:ring-offset-0'>ورود</NavLink>
                  <FontAwesomeIcon className='login-icon mr-1 opacity-0 transition-opacity small text-blue-400' icon={faUser} />
                </div>}
                {!foundUser && (<div className={`flex flex-wrap justify-center items-center ${previousPath === '/dashboard' ? 'w-full' : ''} ${isHovered ? 'hovered' : ''}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                  <FontAwesomeIcon className='back-icon ml-1 opacity-0 transition-opacity small text-red-400' icon={faArrowLeft} />
                  <button type='button' onClick={() => navigate(-1)} className='smaller back-btn flex-grow text-center text-red-600 focus:ring-0 focus:ring-offset-0'>بازگشت</button>
                </div>)}
                {previousPath !== '/dashboard' && <div className={`flex flex-wrap justify-center items-center ${isHovered ? 'register-icon-hovered' : ''}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                  <FontAwesomeIcon className='register-icon ml-1 opacity-0 transition-opacity small text-blue-400' icon={faUserPlus} />
                  <NavLink to='/sign-up' className='smaller flex-grow text-center text-blue-700 focus:ring-0 focus:ring-offset-0'>ثبت نام</NavLink>
                </div>}
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default ChangePassword;
