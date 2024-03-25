import './SignUp.scss';
import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { faEye, faEyeSlash, faLock, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Message from '../../components/Message/Message';
import { useForm } from '../../hooks/useForm';
import { useFetch } from '../../hooks/useFetch';

function SignUp() {
  const navigate = useNavigate();
  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const phoneInput = useRef(null);
  const passwordInput = useRef(null);
  const [passwordView, setPasswordView] = useState(false);

  const [submitMessage, setSubmitMessage] = useState({
    successMessage: false,
    errorMessage: false
  });

  const [isFocused, setIsFocused] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    password: false
  });

  const { form, formValidation } = useForm();
  const { loading, error, saveInfo } = useFetch('http://localhost:5001/users', 'POST');

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

  // Create a function to handle password view by clicking on eye-icon in password input element
  const changeView = () => {
    setPasswordView(prevPasswordView => !prevPasswordView);
  };

  // Create a function to automatically focus on empty input elements when the "sign-up" page is rendered
  const inputAutoFocus = (firstNameInput, lastNameInput, phoneInput, passwordInput) => {
    if (!passwordInput.current.value) {
      passwordInput.current.focus();
    }

    if (!phoneInput.current.value) {
      phoneInput.current.focus();
    }

    if (!lastNameInput.current.value) {
      lastNameInput.current.focus();
    }

    if (!firstNameInput.current.value) {
      firstNameInput.current.focus();
    }
  };

  useEffect(() => {
    inputAutoFocus(firstNameInput, lastNameInput, phoneInput, passwordInput);
  }, [firstNameInput, lastNameInput, phoneInput, passwordInput]);

  // Create a function to handle form submit process
  const handleSubmit = (event, firstNameInput, lastNameInput, phoneInput, passwordInput) => {
    event.preventDefault();
    inputAutoFocus(firstNameInput, lastNameInput, phoneInput, passwordInput);

    if (form.every(item => item.isDone === true)) {
      setSubmitMessage(prevState => ({
        ...prevState,
        successMessage: true
      }));
      const userId = Date.now().toString();

      saveInfo({
        id: userId,
        name: firstNameInput.current.value,
        lastName: lastNameInput.current.value,
        phone: phoneInput.current.value,
        password: passwordInput.current.value,
        loggedIn: false,
        cartItems: [{}]
      });

      // Redirect to sign-in page after one second delay in successful submission
      !loading && !error && setTimeout(() => navigate("/sign-in"), 2000)
    } else {
      setSubmitMessage(prevState => ({
        ...prevState,
        errorMessage: true
      }));
    }
  }

  return (
    <>
      <div className={`submit-success ${submitMessage.successMessage ? 'show' : ''}`}>
        {submitMessage.successMessage && <Message type={'success'} text={'ثبت نام موفقیت آمیز بود!'} size={'small'} />}
      </div>
      <div className={`submit-err ${submitMessage.errorMessage ? 'show' : ''}`}>
        {submitMessage.errorMessage ? <Message type={'error'} text={'فرم را به شکل صحیح پر نمایید!'} size={'small'} /> : error ? <Message type={'error'} text={'در ثبت نام شما خطایی رخ داده است!'} size={'small'} /> : null}
      </div>
      <section className='h-screen lg:w-96 md:w-80 sm:w-72 w-64 mx-auto flex flex-col justify-center items-center flex-wrap'>
        <div className='sign-up w-full'>
          <form onSubmit={(event) => handleSubmit(event, firstNameInput, lastNameInput, phoneInput, passwordInput)}>
            <div className='form-container space-y-5 p-3 border-2 border-gray-400 rounded-md'>
              <div className='larger text-center font-extrabold'>ساخت حساب کاربری جدید</div>
              <div className='first-name-container'>
                <div className='relative'>
                  <label htmlFor='first-name' className={`labels text-slate-600 absolute smaller bg-white lg:p-1 p-0 ${isFocused.firstName ? 'focused' : ''}`}>نام</label>
                </div>
                <input
                  className={`input block m-auto lg:p-3 md:p-2 sm:p-2 p-1 w-5/6 smaller ${form[0].errStatus ? 'border-red-400 focus:border-red-400' : ''}`}
                  type='text'
                  name='fName'
                  id='first-name'
                  ref={firstNameInput}
                  onFocus={() => inputFocusIn('firstName')} onBlur={() => inputFocusOut(firstNameInput, 'firstName')}
                  onChange={() => formValidation(firstNameInput)}
                />
                {form[0].errStatus ? <div className='text-red-400 mt-3 text-center smaller flex justify-center items-center flex-wrap'>{form[0].errorMessage}</div> : null}
              </div>
              <div className='last-name-container'>
                <div className='relative'>
                  <label htmlFor='last-name' className={`labels text-slate-600 absolute smaller bg-white lg:p-1 p-0 ${isFocused.lastName ? 'focused' : ''}`}>نام خانوادگی</label>
                </div>
                <input
                  className={`input block m-auto lg:p-3 md:p-2 sm:p-2 p-1 w-5/6 smaller ${form[1].errStatus ? 'border-red-400 focus:border-red-400' : ''}`}
                  type='text'
                  name='lName'
                  id='last-name'
                  ref={lastNameInput}
                  onFocus={() => inputFocusIn('lastName')} onBlur={() => inputFocusOut(lastNameInput, 'lastName')}
                  onChange={() => formValidation(lastNameInput)}
                />
                {form[1].errStatus ? <div className='text-red-400 mt-3 text-center smaller flex justify-center items-center flex-wrap'>{form[1].errorMessage}</div> : null}
              </div>
              <div className='phone-container'>
                <div className='relative'>
                  <label htmlFor='phone' className={`labels text-slate-600 absolute smaller bg-white lg:p-1 p-0 ${isFocused.phone ? 'focused' : ''}`}>شماره تماس</label>
                  <FontAwesomeIcon className={`phone-icon text-slate-600 absolute small bg-white p-1 ${isFocused.phone ? 'focused' : ''}`} icon={faPhoneAlt} />
                  <span className='absolute text-slate-400 lg:py-3 md:py-2 sm:py-2 pr-1 border-r-gray-400 border-r-2 pre-number small phone-elem'>98+</span>
                </div>
                <input
                  className={`input phone-elem block m-auto lg:py-3 lg:pr-3 lg:pl-10 md:py-2 md:pr-2 md:pl-9 sm:py-2 sm:pr-2 sm:pl-9 py-1 pr-1 pl-9 w-5/6 smaller ${form[2].errStatus ? 'border-red-400 focus:border-red-400' : ''}`}
                  dir='ltr'
                  type='text'
                  name='phone'
                  id='phone'
                  ref={phoneInput}
                  onFocus={() => inputFocusIn('phone')} onBlur={() => inputFocusOut(phoneInput, 'phone')}
                  onChange={() => formValidation(phoneInput)}
                />
                {form[2].errStatus ? <div className='text-red-400 mt-3 text-center smaller flex justify-center items-center flex-wrap'>{form[2].errorMessage}</div> : null}
              </div>
              <div className='password-container'>
                <div className='relative'>
                  <label htmlFor='password' className={`labels text-slate-600 absolute smaller bg-white lg:p-1 p-0 ${isFocused.password ? 'focused' : ''}`}>رمز عبور</label>
                  <FontAwesomeIcon className={`lock-icon text-slate-600 absolute small bg-white p-1 ${isFocused.password ? 'focused' : ''}`} icon={faLock} />
                </div>
                <input
                  className={`input block m-auto lg:py-3 lg:pr:3 lg:pl-8 md:py-2 md:pr-2 md:pl-7 sm:py-2 sm:pr-2 sm:pl-6 py-1 pr-1 pl-6 w-5/6 smaller ${form[3].errStatus ? 'border-red-400 focus:border-red-400' : ''}`}
                  dir='ltr' 
                  type={passwordView ? 'text' : 'password'}
                  name='pass'
                  id='password' ref={passwordInput}
                  onFocus={() => inputFocusIn('password')} onBlur={() => inputFocusOut(passwordInput, 'password')}
                  onChange={() => formValidation(passwordInput)}
                />
                <div className='relative cursor-pointer' onClick={changeView}>
                  <FontAwesomeIcon className='eye-icon text-slate-600 absolute small' icon={passwordView ? faEyeSlash : faEye} />
                </div>
                {form[3].errStatus ? <div className='text-red-400 mt-3 text-center smaller flex justify-center items-center flex-wrap'>{form[3].errorMessage}</div> : null}
              </div>
              <div className='sign-up-btn-container flex justify-center items-center flex-wrap'>
                <button type='submit' className='btn btn-success w-2/5 flex justify-center items-center'>
                  {loading ?
                    <svg className="spinner" viewBox="0 0 50 50">
                      <circle className="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                    </svg> :
                    'ثبت نام'}
                </button>
              </div>
              <div className="redirection-btn-container flex flex-wrap justify-around items-center min-w-240">
                <p className='smaller'>قبلا ثبت نام کردید؟</p>
                <NavLink to='/sign-in' className='smaller btn text-blue-700 hover:text-blue-400 focus:ring-0  focus:ring-offset-0'>ورود</NavLink>
              </div>
              <div className="redirection-btn-container flex flex-wrap justify-around items-center min-w-240">
                <p className='smaller'>رمز عبور خود را فراموش کردم!</p>
                <NavLink to='/change-password' className='smaller btn text-blue-700 hover:text-blue-400 focus:ring-0  focus:ring-offset-0'>بازیابی رمز عبور</NavLink>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default SignUp;
