import './SignIn.scss';
import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { faEye, faEyeSlash, faLock, faPhoneAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Message from '../../components/Message/Message';
import { useForm } from '../../hooks/useForm';
import { useFetch } from '../../hooks/useFetch';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user-slice';

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const phoneInput = useRef(null);
  const passwordInput = useRef(null);
  const submitBtn = useRef(null);
  const [passwordView, setPasswordView] = useState(false);
  const [formStage, setFormStage] = useState(localStorage.getItem('userPhone')?.length > 0 ? true : false);
  const [userId, setUserId] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const [isFocused, setIsFocused] = useState({
    phone: false,
    password: false
  });

  const [submitMessage, setSubmitMessage] = useState({
    successMessage: false,
    errorMessage: false,
    UserNotFoundMessage: false
  });

  const { form, formValidation } = useForm();
  const { data: usersData, error: userError } = useFetch('http://localhost:5001/users', 'GET');
  const { loading, error, saveInfo } = useFetch(userId ? `http://localhost:5001/users/${userId}` : '', 'PUT');

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

  // Create a function to automatically focus on empty phone input element when the "sign-in" page is rendered
  const phoneInputFocus = phoneInput => {
    if (!phoneInput?.current?.value) {
      phoneInput?.current?.focus();
    }
  };

  // Create a function to automatically focus on empty password input element when the "sign-in" page is rendered
  const passwordInputFocus = passwordInput => {
    if (!passwordInput?.current?.value) {
      passwordInput?.current?.focus();
    }
  };

  useEffect(() => {
    phoneInputFocus(phoneInput);
    passwordInputFocus(passwordInput);
    if (!formStage) {
      submitBtn.current.disabled = form[2].isDone ? false : true;
    }

  }, [phoneInput, passwordInput, form, formStage]);

  // Create a function to handle form first stage submit process
  const handleStageOne = (event, phoneInput) => {
    event.preventDefault();
    phoneInputFocus(phoneInput);

    // Find current user data if the number existed in current stage (first stage)!
    const currentUser = usersData?.find(item => item?.phone === Number(phoneInput?.current?.value));

    if (form[2].isDone && currentUser) {
      // When a user is found based on inserted phone number
      localStorage.setItem('userPhone', phoneInput?.current?.value);
      setFormStage(true);

      setSubmitMessage(prevState => ({
        ...prevState,
        UserNotFoundMessage: false
      }));
    } else {
      // When user is not found based on inserted phone number
      setSubmitMessage(prevState => ({
        ...prevState,
        UserNotFoundMessage: true
      }));
    }
  };

  // Create a function to handle form second stage submit process
  const handleStageTwo = (event, passwordInput) => {
    event.preventDefault();
    passwordInputFocus(passwordInput);

    // Find current user data if the number existed (saved number in the local storage after stage one is completed)!
    const currentUser = usersData?.find(item => item?.phone === parseInt(localStorage.getItem('userPhone'), 10));

    if (form[3].isDone && currentUser?.password === passwordInput?.current?.value) {
      // When password matches with the inserted phone number
      saveInfo({
        ...currentUser,
        loggedIn: true
      });

      setUserId(currentUser?.id);
      submitBtn.current.disabled = true;
      // Redirect to home page after two second delay in successful submission
      !loading && !userError && setTimeout(() => navigate("/"), 2000);

      setSubmitMessage(prevState => ({
        ...prevState,
        successMessage: true,
        UserNotFoundMessage: false
      }));

      setTimeout(() => {
        if (!userError) {
          localStorage.setItem('userLoggedIn', JSON.stringify(true));
          localStorage.setItem('userId', JSON.stringify(currentUser?.id));

          const { id, name, lastName, phone, password } = currentUser;
          dispatch(userActions.loggedIn({ id, name, lastName, phone, password, loggedIn: true }));
        }
      }, 2000);
    } else {
      // When password doesn't match with the inserted phone number
      setSubmitMessage(prevState => ({
        ...prevState,
        errorMessage: true,
        UserNotFoundMessage: false
      }));

      submitBtn.current.disabled = true;

      setTimeout(() => {
        setSubmitMessage(prevState => ({
          ...prevState,
          errorMessage: false,
          UserNotFoundMessage: false
        }));

        submitBtn.current.disabled = false;
      }, 3000);
    }
  };

  // Create a function to go back to phone number stage
  const backBtn = () => {
    setFormStage(false);
    localStorage.setItem('userPhone', '');
  };

  return (
    <>
      <div className="relative flex justify-center items-center flex-wrap">
        <div className={`submit-success ${submitMessage.successMessage ? 'show' : ''}`}>
          {(submitMessage.successMessage && !error && !userError) && <Message type={'success'} text={'ورود موفقیت آمیز بود!'} size={'small'} />}
        </div>
      </div>
      <div className="relative flex justify-center items-center flex-wrap">
        <div className={`submit-err w-full ${submitMessage.errorMessage ? 'show' : submitMessage.UserNotFoundMessage ? 'show-alert' : error}`}>
          {submitMessage.errorMessage ?
            <Message type={'error'} text={'رمز عبور شما صحیح نمی‌باشد!'} size={'small'} /> :
            submitMessage.UserNotFoundMessage ?
              <Message type={'error'} text={'این شماره تماس ثبت نشده است!'} size={'medium'} /> :
              null}
        </div>
        {(error || userError) && <p className='text-red-400 medium absolute top-28 text-center'>خطایی رخ داده است! درحال حاضر امکان ورود به حساب کاربری خود را ندارید!</p>}
      </div>
      <section className='h-screen lg:w-96 md:w-80 sm:w-72 w-64 mx-auto flex flex-col justify-center items-center flex-wrap'>
        <div className='sign-up w-full'>
          <form onSubmit={(event) => !formStage ? handleStageOne(event, phoneInput) : handleStageTwo(event, passwordInput)}>
            <div className='form-container space-y-5 p-3 border-2 border-gray-400 rounded-md'>
              <div className='larger text-center font-extrabold'>ورود به حساب کاربری</div>
              {!formStage && <div className='phone-container'>
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
              </div>}
              {formStage && <div className='password-container'>
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
              </div>}
              <div className='sign-up-btn-container flex justify-center items-center flex-wrap'>
                <button type='submit' disabled={userError ? true : false} ref={submitBtn} className={`${form[2].isDone || localStorage.getItem('userPhone')?.length > 0 ? 'opacity-100' : 'opacity-60'} btn btn-primary smaller w-2/5 flex justify-center items-center`}>
                  {loading ?
                    <svg className="spinner" viewBox="0 0 50 50">
                      <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                    </svg> :
                    formStage ?
                      'ورود' :
                      'بعدی'}
                </button>
              </div>
              {formStage && <div className="back-btn-container flex flex-wrap justify-around items-center min-w-240">
                <p className='smaller'>شماره تماس را اشتباه وارد کرده‌اید؟</p>
                <div className={`${isHovered ? 'hovered' : ''}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                  <button type="button" className='back-btn text-red-600 focus:ring-0 focus:ring-offset-0 smaller' onClick={backBtn}>بازگشت</button>
                  <FontAwesomeIcon className='back-icon mr-1 opacity-0 transition-opacity small text-red-400' icon={faArrowLeft} />
                </div>
              </div>}
              <div className="redirection-btn-container flex flex-wrap justify-around items-center min-w-240">
                <p className='smaller'>هنوز ثبت نام نکرده‌اید؟</p>
                <NavLink to='/sign-up' className='smaller btn text-blue-700 hover:text-blue-400 focus:ring-0 focus:ring-offset-0'>ثبت نام</NavLink>
              </div>
              <div className="redirection-btn-container flex flex-wrap justify-around items-center min-w-240">
                <p className='smaller'>رمز عبور خود را فراموش کردم!</p>
                <NavLink to='/change-password' className='smaller btn text-blue-700 hover:text-blue-400 focus:ring-0 focus:ring-offset-0'>بازیابی رمز عبور</NavLink>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default SignIn;
