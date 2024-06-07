import './Dashboard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useFetch } from '../../hooks/useFetch';
import profilePicture from '../../assets/images/user-profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import Message from '../../components/Message/Message';
import { encryption } from '../../token/token';
import { userActions } from '../../store/user-slice';
import { cartActions } from '../../store/cart-slice';

function Dashboard() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const profileImageRef = useRef(null);
  const submitBtn = useRef(null);
  const [readOnly, setReadOnly] = useState(true);
  const [successMessage, setSuccessMessage] = useState(false);
  const [successLogout, setSuccessLogout] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const currentUserId = useSelector(state => state.currentUser.id);
  const { data, loading: profileLoading, error: profileErr } = useFetch(currentUserId ? `http://localhost:5001/users/${currentUserId}` : '', 'GET');
  const { loading, error, saveInfo } = useFetch(currentUserId ? `http://localhost:5001/users/${currentUserId}` : '', 'PUT');
  const { form, formValidation } = useForm();

  // Create a function to handle user phone number submit
  const submitHandler = (event) => {
    event.preventDefault();
    setReadOnly(prevState => !prevState);

    // When phone number is not previous one!
    if (!readOnly) {
      saveInfo({
        ...data,
        phone: Number(inputRef?.current?.value)
      });

      setSuccessMessage(true);
      submitBtn.current.disabled = true;

      setTimeout(() => {
        setSuccessMessage(false);
        submitBtn.current.disabled = false;
      }, 3000);
    }
  };

  // Create a function to handle user image profile submit
  const uploadHandler = (event) => {
    event.preventDefault();

    // Send static image URL which is already set in images folder
    saveInfo({
      ...data,
      imageURL: 'images/uploaded-profile.png'
    });

    setSuccessMessage(true);

    setTimeout(() => {
      setSuccessMessage(false);
      window.location.reload();
    }, 2000);
  };

  // Create a function to handle user logout
  const logOut = async () => {
    if (!profileErr) {
      setSuccessLogout(true);

      setTimeout(() => {
        dispatch(userActions.loggedOut());
        encryption('D4B7EF6F8553C18E', 'uid', '');
        encryption('B7BE2BFB64C56BD3', 'umn', '');
        dispatch(cartActions.removeAll());
        navigate('/');
      }, 2000);
    }
  };

  return (
    <main className='main larger'>
      <div className="relative flex justify-center items-center flex-wrap">
        <div className={`submit-success z-10 ${successMessage && !error && !loading && !profileErr && !profileLoading ? 'show' : ''}`}>
          {(successMessage && !error && !loading && !profileErr && !profileLoading) && <Message type={'success'} text={'عملیات با موفقیت انجام شد!'} size={'small'} />}
        </div>
      </div>
      <div className="relative flex justify-center items-center flex-wrap">
        <div className={`submit-success z-10 ${successLogout && !profileErr ? 'show' : ''}`}>
          {(successLogout && !profileErr) && <Message type={'success'} text={'خروج با موفقیت انجام شد!'} size={'small'} />}
        </div>
      </div>
      <div className="relative flex justify-center items-center flex-wrap">
        <div className={`submit-success z-10 ${successMessage ? 'show' : ''}`}>
          {(error && !loading) && <Message type={'error'} text={'عملیات با موفقیت انجام نشد!'} size={'small'} />}
        </div>
      </div>
      <section className='profile-card grid w-4/5 mx-auto justify-items-center gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        {profileLoading
          ? (
            // When request is depending...
            <div className='animate-pulse grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-1 col-span-1 md:col-span-2 xl:col-span-1 justify-items-start p-3 border-4 rounded-md w-full xl:min-w-80 xl:w-full min-h-500 md:min-h-400 xl:min-h-600'>
              <div className='justify-self-center row-span-1 col-span-1 md:col-start-2 md:col-end-2 xl:col-span-1 md:row-span-6 xl:row-span-1 self-center xl:self-auto md:w-72 md:h-72 w-52 h-52 rounded-full bg-slate-700'></div>
              <div className='flex justify-center items-center'>
                <div className='medium font-semibold md:h-6 md:w-16 h-4 w-12 bg-slate-700 mx-1 rounded-md'></div>
                <div className='small md:h-6 md:w-32 h-4 w-24 bg-slate-700 mx-1 rounded-md'></div>
              </div>
              <div className='flex justify-center items-center'>
                <div className='medium font-semibold md:h-6 md:w-16 h-4 w-12 bg-slate-700 mx-1 rounded-md'></div>
                <div className='small md:h-6 md:w-32 h-4 w-24 bg-slate-700 mx-1 rounded-md'></div>
              </div>
              <div className='flex justify-center items-center'>
                <div className='medium md:h-6 md:w-12 h-4 w-8 bg-slate-700 mx-1 rounded-md'></div>
                <div className='small px-2 md:w-36 md:h-6 h-4 w-24 bg-slate-700 mx-1 rounded-md'></div>
                <div className='small md:h-6 md:w-8 h-4 w-6 bg-slate-700 mx-1 rounded-md'></div>
                <div className='md:h-6 md:w-8 h-4 w-6 bg-slate-700 mx-1 rounded-md'></div>
              </div>
              <div className="flex justify-center items-center mr-1">
                <div className='md:w-40 w-32 md:h-6 h-4 bg-slate-700 rounded-md'></div>
              </div>
              <div className="flex justify-center items-center mr-1">
                <div className='md:w-28 w-24 md:h-6 h-4 bg-slate-700 rounded-md'></div>
              </div>
            </div>
          )
          : profileErr
            ? (
              // When response is returned unsuccessfully!
              <div className='grid gap-2 col-span-1 md:col-span-2 xl:col-span-1 justify-items-start p-3 border-4 rounded-md w-full xl:min-w-80 xl:w-full min-h-500 md:min-h-400 xl:min-h-600'>
                <div className='flex justify-center items-center text-red-500 medium w-full text-center'>
                  اطلاعاتی جهت نمایش وجود ندارد!
                </div>
              </div>
            )
            : (
              // When response is returned successfully
              <div className='grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-1 col-span-1 md:col-span-2 xl:col-span-1 justify-items-start p-3 border-4 rounded-md w-full xl:min-w-80 xl:w-full min-h-500 md:min-h-400 xl:min-h-600'>
                <div className='justify-self-center row-span-1 col-span-1 md:col-start-2 md:col-end-2 xl:col-span-1 md:row-span-6 xl:row-span-1 self-center xl:self-auto md:w-72 md:h-72 w-52 h-52 rounded-full'>
                  <form onSubmit={uploadHandler}>
                    <label htmlFor="profileImageURL" className='hover:cursor-pointer'>
                      <img
                        className='md:w-72 md:h-72 w-52 h-52 rounded-full'
                        src={data?.imageURL || profilePicture}
                        alt="profile-pic"
                      />
                    </label>
                    <input
                      hidden
                      ref={profileImageRef}
                      type="file"
                      name="profileImageURL"
                      id="profileImageURL"
                      onChange={(e) => setSelectedFile(e.target.value)}
                    />
                    <div className="relative w-full flex justify-center items-center">
                      <button className={`btn btn-primary absolute bottom-28 small z-50 w-1/2 ${selectedFile ? 'block' : 'hidden'}`} type="submit">آپلود</button>
                    </div>
                  </form>
                </div>
                <div className='flex justify-center items-center'>
                  <span className='medium font-semibold ml-1'>نام: </span>
                  <div className='small'>{data?.name}</div>
                </div>
                <div className='flex justify-center items-center'>
                  <span className='medium font-semibold ml-1'>نام خانوادگی: </span>
                  <div className='small'>{data?.lastName}</div>
                </div>
                <form className='flex justify-center items-center'>
                  <span className='medium font-semibold ml-1'>موبایل: </span>
                  <input
                    dir='ltr'
                    name='phone'
                    id='phone'
                    readOnly={readOnly}
                    type='text'
                    ref={inputRef}
                    className='small mt-1 px-2 md:w-32 w-24 text-center outline-none read-only:border-none border-b-2 border-blue-400'
                    defaultValue={data?.phone}
                    onChange={() => formValidation(inputRef)}
                  />
                  <span className={`small font-semibold ml-1 text-sky-500 ${readOnly ? 'mt-1' : 'mt-0'}`}>98+</span>
                  <button
                    type="submit"
                    ref={submitBtn}
                    className={`medium rounded-md hover:text-green-400 ${form[2].errStatus || error ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'} ${loading ? 'bg-gray-700 opacity-50 cursor-not-allowed p-1' : ''}`}
                    disabled={form[2].errStatus || loading || error}
                    onClick={submitHandler}
                  >
                    {loading
                      ? (<svg className="spinner" viewBox="0 0 50 50">
                        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                      </svg>)
                      : readOnly
                        ? (<FontAwesomeIcon className='medium' icon={faEdit} />)
                        : (<FontAwesomeIcon className='medium' icon={faCheckCircle} />)}
                  </button>
                </form>
                {form[2].errStatus ? <div className='text-red-400 mt-3 text-center smaller flex justify-center items-center flex-wrap'>{form[2].errorMessage}</div> : null}
                <div className="flex justify-center items-center hover:text-blue-400 cursor-pointer">
                  <Link to='/change-password' state={{ previousPath: location.pathname }} className="small">ویرایش رمز عبور</Link>
                  <FontAwesomeIcon className='small mr-1' icon={faEdit} />
                </div>
                <div className="flex justify-center items-center hover:text-blue-400 cursor-pointer">
                  <button onClick={logOut} className="small">خروج</button>
                  <FontAwesomeIcon className='small mr-1' icon={faSignOut} />
                </div>
              </div>
            )}
        <Link to='/bookshelf' className='dashboard-menu-images library-menu flex justify-center items-center border-4 rounded-md w-full xl:min-w-80 xl:w-full min-h-500 lg:min-h-600'>
          <div className='library-text opacity-0 relative z-10 bg-white p-3 medium rounded-md'>کتابخانه</div>
        </Link>
        <Link to='/cart' className='dashboard-menu-images cart-menu flex justify-center items-center border-4 rounded-md w-full xl:min-w-80 xl:w-full min-h-500 lg:min-h-600'>
          <div className='cart-text opacity-0 relative z-10 bg-white p-3 medium rounded-md'>سبد خرید</div>
        </Link>
      </section>
    </main>
  );
}

export default Dashboard;
