import './SignUp.scss';
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { faEye, faEyeSlash, faLock, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SignUp() {
  const firstNameLabel = useRef(null);
  const lastNameLabel = useRef(null);
  const phoneLabel = useRef(null);
  const passwordLabel = useRef(null);
  const phoneIcon = useRef(null);
  const lockIcon = useRef(null);
  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const phoneInput = useRef(null);
  const passwordInput = useRef(null);
  const [passwordView, setPasswordView] = useState(false);

  // Create a function to handle and modify input styles when the element is focused in
  const inputFocusIn = (labelRef, iconRef) => {
    labelRef.current.style.top = '-20px';
    if (iconRef) {
      iconRef.current.style.top = '-16px';
    }
  };

  // Create a function to handle and modify input styles when the element is focused out
  const inputFocusOut = (labelRef, inputRef, iconRef) => {
    if (inputRef.current.value.length === 0) {
      labelRef.current.style.top = '8px';
      if (iconRef) {
        iconRef.current.style.top = '12px';
      }
    }
  };

  const changeView = () => {
    setPasswordView(prevPasswordView => !prevPasswordView);
  };

  return (
    <section className='h-screen w-1/4 mx-auto flex flex-col justify-center items-center flex-wrap'>
      <div className='sign-up w-full'>
        <form>
          <div className='form-container space-y-8 p-3 border-2 border-gray-400 rounded-md'>
            <div className='larger text-center font-extrabold'>ساخت حساب کاربری جدید</div>
            <div className='first-name-container'>
              <div className='relative'>
                <label htmlFor='first-name' className='text-slate-600 absolute right-12 top-2 smaller bg-white p-1' ref={firstNameLabel}>نام</label>
              </div>
              <input className='input block m-auto px-2 py-3 w-5/6' type='text' id='first-name' ref={firstNameInput} onFocus={() => inputFocusIn(firstNameLabel)} onBlur={() => inputFocusOut(firstNameLabel, firstNameInput)} />
            </div>
            <div className='last-name-container'>
              <div className='relative'>
                <label htmlFor='last-name' className='text-slate-600 absolute right-12 top-2 smaller bg-white p-1' ref={lastNameLabel}>نام خانوادگی</label>
              </div>
              <input className='input block m-auto px-2 py-3 w-5/6' type='text' id='last-name' ref={lastNameInput} onFocus={() => inputFocusIn(lastNameLabel)} onBlur={() => inputFocusOut(lastNameLabel, lastNameInput)} />
            </div>
            <div className='phone-container'>
              <div className='relative'>
                <label htmlFor='phone' className='text-slate-600 absolute right-12 top-2 smaller bg-white p-1' ref={phoneLabel}>شماره تماس</label>
                <FontAwesomeIcon style={{ right: 132 }} className='text-slate-600 absolute top-3 small bg-white p-1' ref={phoneIcon} icon={faPhoneAlt} />
              </div>
              <input className='input block m-auto px-2 py-3 w-5/6' type='text' id='phone' ref={phoneInput} onFocus={() => inputFocusIn(phoneLabel, phoneIcon)} onBlur={() => inputFocusOut(phoneLabel, phoneInput, phoneIcon)} />
            </div>
            <div className='password-container'>
              <div className='relative'>
                <label htmlFor='password' className='text-slate-600 absolute right-12 top-2 smaller bg-white p-1' ref={passwordLabel}>رمز عبور</label>
                <FontAwesomeIcon style={{ right: 105 }} className='text-slate-600 absolute top-3 small bg-white p-1' ref={lockIcon} icon={faLock} />
              </div>
              <input className='input block m-auto pr-2 pl-8 py-3 w-5/6' type={passwordView ? 'text' : 'password'} id='password' ref={passwordInput} onFocus={() => inputFocusIn(passwordLabel, lockIcon)} onBlur={() => inputFocusOut(passwordLabel, passwordInput, lockIcon)} />
              <div className='relative cursor-pointer' onClick={changeView}>
                <FontAwesomeIcon style={{ bottom: 17 }} className='text-slate-600 absolute left-11 small' icon={passwordView ? faEyeSlash : faEye} />
              </div>
            </div>
            <div className='sign-up-btn-container flex justify-center items-center flex-wrap'>
              <button type='submit' className='btn btn-success w-2/5'>ثبت نام</button>
            </div>
            <div className="redirection-btn-container flex flex-wrap justify-around items-center">
              <p className='smaller'>قبلا ثبت نام کردید؟</p>
              <NavLink to='/sign-in' className='smaller btn text-blue-700 hover:text-blue-400 focus:ring-0  focus:ring-offset-0'>ورود</NavLink>
            </div>
            <div className="redirection-btn-container flex flex-wrap justify-around items-center">
              <p className='smaller'>رمز عبور خود را فراموش کردم!</p>
              <NavLink to='/change-password' className='smaller btn text-blue-700 hover:text-blue-400 focus:ring-0  focus:ring-offset-0'>بازیابی رمز عبور</NavLink>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
