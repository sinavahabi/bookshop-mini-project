import './SignUp.scss';
import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { faEye, faEyeSlash, faLock, faPhoneAlt, faExclamationCircle, faSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Message from '../../components/Message/Message';
import { useForm } from '../../hooks/useForm';
import { useFetch } from '../../hooks/useFetch';
import Modal from '../../components/Modal/Modal';

function SignUp({ isBlur }) {
  const navigate = useNavigate();
  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const phoneInput = useRef(null);
  const passwordInput = useRef(null);
  const submitBtn = useRef(null);
  const [passwordView, setPasswordView] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [submitMessage, setSubmitMessage] = useState({
    successMessage: false,
    errorMessage: false,
    alreadyRegisteredMessage: false
  });

  const [isFocused, setIsFocused] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    password: false
  });

  const { form, formValidation } = useForm();
  const { loading, error, saveInfo } = useFetch('http://localhost:5001/users', 'POST');
  const { data: usersData, error: userError } = useFetch('http://localhost:5001/users', 'GET');

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

    // Change form validation behavior for sign-up page
    const signUpForm = form.filter(item => item.name !== 'confirmPass');

    if (signUpForm.every(item => item.isDone === true)) {
      // When all form inputs values are valid! 
      if (usersData && usersData.length > 0 && usersData.some(item => item.phone === Number(phoneInput.current.value))) {
        // When phone number is already registered!
        setSubmitMessage(prevState => ({
          ...prevState,
          alreadyRegisteredMessage: true
        }));
      } else {
        // All good here!
        setSubmitMessage(prevState => ({
          ...prevState,
          alreadyRegisteredMessage: false,
          successMessage: true
        }));

        const userId = Date.now().toString();

        saveInfo({
          id: Number(userId),
          name: firstNameInput.current.value,
          lastName: lastNameInput.current.value,
          phone: Number(phoneInput.current.value),
          password: passwordInput.current.value,
          cartItems: []
        });

        submitBtn.current.disabled = true;
        // Redirect to sign-in page after one second delay in successful submission
        !loading && !userError && setTimeout(() => navigate("/sign-in"), 2000);
      }
    } else {
      // When all form inputs values are not valid
      setSubmitMessage(prevState => ({
        ...prevState,
        alreadyRegisteredMessage: false,
        errorMessage: true
      }));

      submitBtn.current.disabled = true;

      setTimeout(() => {
        setSubmitMessage(prevState => ({
          ...prevState,
          alreadyRegisteredMessage: false,
          errorMessage: false
        }));

        submitBtn.current.disabled = false;
      }, 3000);
    }
  }

  const modalChildren = (
    <main className='smaller'>
      <ul className='flex flex-col justify-between items-start space-y-4'>
        <li className='flex items-center'>
          <span className='inline-block bg-emerald-400 text-white rounded-full py-2 px-4 ml-2'>1</span>
          <p>نام خود را به شکل صحیح و بدون استفاده از علائم و اعداد وارد کنید. توجه داشته باشید تعداد حروف نام شما باید بین 3 تا 15 حرف فارسی باشد!</p>
        </li>
        <li className='flex items-center'>
          <span className='inline-block bg-emerald-400 text-white rounded-full py-2 px-4 ml-2'>2</span>
          <p>نام خانوادگی خود را به شکل صحیح و بدون استفاده از علائم، کاراکترهای خاص و اعداد وارد کنید. توجه داشته باشید تعداد حروف نام خانوادگی شما باید بین 3 تا 25 حرف فارسی باشد!</p>
        </li>
        <li className='flex items-center'>
          <span className='inline-block bg-emerald-400 text-white rounded-full py-2 px-4 ml-2'>3</span>
          <p>شماره تماس خود را بدون استفاده از 0 و به شکل صحیح 10 رقمی تنها با استفاده از اعدادا وارد کنید!</p>
        </li>
        <li className='flex items-center'>
          <span className='inline-block bg-emerald-400 text-white rounded-full py-2 px-4 ml-2'>4</span>
          <p>رمز عبور شما باید بین 8 تا 16 حرف انگلیسی شامل حداقل یک عدد، یک حرف بزرگ و یک حرف کوچک باشد. توجه داشته باشید رمز عبور شما نباید شامل علائم و کاراکترهای خاص باشد!</p>
        </li>
        <li className='flex items-center'>
          <span className='inline-block bg-emerald-400 text-white rounded-full py-2 px-4 ml-2'>5</span>
          <p>در صورتی که قبلا با شماره تماس خود ثبت نام کرده‌اید روی گزینه "ورود" کلیک کرده و وارد اکانت کاربری خود شوید.</p>
        </li>
        <li className='flex items-center'>
          <span className='inline-block bg-emerald-400 text-white rounded-full py-2 px-4 ml-2'>6</span>
          <p>در صورت فراموشی رمز عبور می‌توانید با کلیک روی گزینه "بازیابی رمز عبور" وارد صفحه جدیدی شده و با وارد کردن شماره تماس خود اقدام به تغییر رمز عبور اکانت خود نمایید!</p>
        </li>
        <li className='flex items-center'>
          <span className='inline-block bg-emerald-400 text-white rounded-full py-2 px-3 ml-2'>
            <FontAwesomeIcon icon={faSmile} />
          </span>
          <p>در صورت نیاز به راهنمایی بیشتر می‌توانید با پشتیبانی سایت در ارتباط باشید.</p>
        </li>
      </ul>
    </main>
  );

  return (
    <main>
      {showModal && <Modal modalTitle={'راهنمای ثبت نام!'} showModal={showModal} setShowModal={setShowModal} children={<div>{modalChildren}</div>} />}
      <div className="relative flex justify-center items-center flex-wrap">
        <div className={`submit-success ${submitMessage.successMessage ? 'show' : ''}`}>
          {(submitMessage.successMessage && !error && !userError) && <Message type={'success'} text={'ثبت نام موفقیت آمیز بود!'} size={'small'} />}
        </div>
      </div>
      <div className="relative flex justify-center items-center flex-wrap">
        <div className={`submit-err w-full ${submitMessage.errorMessage ? 'show' : submitMessage.alreadyRegisteredMessage ? 'show-alert' : error ? 'show-api-err' : ''}`}>
          {submitMessage.errorMessage ?
            <Message type={'error'} text={'فرم را به شکل صحیح پر نمایید!'} size={'small'} /> :
            submitMessage.alreadyRegisteredMessage ?
              <Message type={'error'} text={'این شماره تماس قبلا ثبت شده است!'} size={'medium'} /> :
              error ?
                <Message type={'error'} text={'در ثبت نام شما خطایی رخ داده است!'} size={'small'} /> :
                null}
        </div>
      </div>
      <section className={`h-screen lg:w-96 md:w-80 sm:w-72 w-64 mx-auto flex flex-col justify-center items-center flex-wrap ${isBlur ? 'blur-sm' : 'blur-none'}`}>
        <div className='sign-up w-full'>
          <form onSubmit={(event) => handleSubmit(event, firstNameInput, lastNameInput, phoneInput, passwordInput)}>
            <div className='form-container space-y-5 p-3 border-2 border-gray-400 rounded-md'>
              <div className='larger text-center font-extrabold'>ساخت حساب کاربری جدید</div>
              <div className='first-name-container'>
                <div className='relative z-10'>
                  <label htmlFor='first-name' className={`labels text-slate-600 absolute smaller bg-white dark:bg-zinc-800 dark:text-white lg:p-1 p-0 ${isFocused.firstName ? 'focused' : ''}`}>نام</label>
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
                <div className='relative z-10'>
                  <label htmlFor='last-name' className={`labels text-slate-600 absolute smaller bg-white dark:bg-zinc-800 dark:text-white lg:p-1 p-0 ${isFocused.lastName ? 'focused' : ''}`}>نام خانوادگی</label>
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
                <div className='relative z-10'>
                  <label htmlFor='phone' className={`labels text-slate-600 absolute smaller bg-white dark:bg-zinc-800 dark:text-white lg:p-1 p-0 ${isFocused.phone ? 'focused' : ''}`}>شماره تماس</label>
                  <FontAwesomeIcon className={`phone-icon text-slate-600 absolute small bg-white dark:bg-zinc-800 dark:text-white p-1 ${isFocused.phone ? 'focused' : ''}`} icon={faPhoneAlt} />
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
                <div className='relative z-10'>
                  <label htmlFor='password' className={`labels text-slate-600 absolute smaller bg-white dark:bg-zinc-800 dark:text-white lg:p-1 p-0 ${isFocused.password ? 'focused' : ''}`}>رمز عبور</label>
                  <FontAwesomeIcon className={`lock-icon text-slate-600 absolute small bg-white dark:bg-zinc-800 dark:text-white p-1 ${isFocused.password ? 'focused' : ''}`} icon={faLock} />
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
                <button type='submit' ref={submitBtn} className='btn btn-success smaller w-2/5 flex justify-center items-center'>
                  {loading ?
                    <svg className="spinner" viewBox="0 0 50 50">
                      <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                    </svg> :
                    'ثبت نام'}
                </button>
              </div>
              <div className="redirection-btn-container flex flex-wrap justify-around items-center min-w-240">
                <p className='smaller'>نیاز به راهنمایی دارید؟</p>
                <button type='button' className='smaller btn text-orange-300 hover:text-orange-500 focus:ring-0 focus:ring-offset-0' onClick={() => setShowModal(prevState => !prevState)}>
                  مشاهده راهنما <FontAwesomeIcon icon={faExclamationCircle} />
                </button>
              </div>
              <div className="redirection-btn-container flex flex-wrap justify-around items-center min-w-240">
                <p className='smaller'>قبلا ثبت نام کردید؟</p>
                <NavLink to='/sign-in' className='smaller btn text-blue-700 hover:text-blue-400 focus:ring-0 focus:ring-offset-0'>ورود</NavLink>
              </div>
              <div className="redirection-btn-container flex flex-wrap justify-around items-center min-w-240">
                <p className='smaller'>رمز عبور خود را فراموش کردم!</p>
                <NavLink to='/change-password' className='smaller btn text-blue-700 hover:text-blue-400 focus:ring-0 focus:ring-offset-0'>بازیابی رمز عبور</NavLink>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default SignUp;
