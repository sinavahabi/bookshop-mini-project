import './AboutUs.scss';
import Carousel from '../../components/Carousel/Carousel';
import sassImg from '../../assets/images/sass.jpg';
import webImg from '../../assets/images/web.png';
import reactImg from '../../assets/images/react.png';
import tailwindImg from '../../assets/images/tailwind.png';
import jsonServerImg from '../../assets/images/json-server.png';
import axiosImg from '../../assets/images/axios.png';
import javaScriptIcon from '../../assets/icons/javascript-icon.png';
import typeScriptIcon from '../../assets/icons/typescript-icon.png';
import reactIcon from '../../assets/icons/react-icon.png';
import pythonIcon from '../../assets/icons/python-icon.png';
import AIIcon from '../../assets/icons/ai-icon.png';
import htmlIcon from '../../assets/icons/html-icon.png';
import cssIcon from '../../assets/icons/css-icon.png';
import tailwindIcon from '../../assets/icons/tailwind-icon.png';
import sassIcon from '../../assets/icons/sass-icon.png';
import jsonServerIcon from '../../assets/icons/json-server-icon.png';
import axiosIcon from '../../assets/icons/axios-icon.png';
import mongoDBIcon from '../../assets/icons/mongodb-icon.png';
import mariaDBIcon from '../../assets/icons/mariadb-icon.png';

function AboutUs({ isBlur }) {
  const carouselSlides = [
    webImg,
    reactImg,
    tailwindImg,
    sassImg,
    jsonServerImg,
    axiosImg
  ];

  return (
    <main className={`${isBlur ? 'blur-sm' : 'blur-none'} main about-us-container larger grid grid-cols-6 grid-rows-3 gap-4 w-4/5 mx-auto`}>
      <section className='introduction col-span-2 row-span-2'>
        <div className="border-2 rounded-md">
          <div className="flex justify-between items-center p-2 border-b-2">
            <h3 className='large'>سینا وهبی ذاتی</h3>
            <div className='profile-img rounded-full w-24 h-24'></div>
          </div>
          <ul dir='ltr' className="flex flex-col justify-center items-center">
            <li className="large font-semibold py-2 border-b-2 text-center w-full">لیست پروژه‌ها</li>
            <li className="dropdown-item border-b-2 cursor-pointer smaller text-left w-full text-white bg-blue-600">
              <a className='w-full flex justify-normal items-center' rel='noreferrer' href='https://github.com/sinavahabi/bookshop-mini-project' target='_blank'>
                Bookshop Web App
                <img className='ml-2 w-4 h-4 md:w-6 md:h-6 rounded-md' alt='icon' src={javaScriptIcon} />
                <img className='ml-2 w-4 h-4 md:w-6 md:h-6 rounded-md' alt='icon' src={reactIcon} />
              </a>
            </li>
            <li className="dropdown-item border-b-2 cursor-pointer smaller text-left w-full">
              <a className='w-full flex justify-normal items-center' rel='noreferrer' href='https://github.com/sinavahabi/ashpazsho-mini-project' target='_blank'>
                Ashpazsho Web App
                <img className='ml-2 w-4 h-4 md:w-6 md:h-6 rounded-md' alt='icon' src={typeScriptIcon} />
                <img className='ml-2 w-4 h-4 md:w-6 md:h-6 rounded-md' alt='icon' src={reactIcon} />
              </a>
            </li>
            <li className="dropdown-item border-b-2 cursor-pointer smaller text-left w-full">
              <a className='w-full flex justify-normal items-center' rel='noreferrer' href='https://github.com/sinavahabi/average-mini-project' target='_blank'>
                GPA Web App
                <img className='ml-2 w-4 h-4 md:w-6 md:h-6 rounded-md' alt='icon' src={javaScriptIcon} />
              </a>
            </li>
            <li className="dropdown-item border-b-2 cursor-pointer smaller text-left w-full">
              <a className='w-full flex justify-normal items-center' rel='noreferrer' href='https://github.com/sinavahabi/staff-info-mini-project' target='_blank'>
                Staff Info Management Web App
                <img className='ml-2 w-4 h-4 md:w-6 md:h-6 rounded-md' alt='icon' src={javaScriptIcon} />
              </a>
            </li>
            <li className="dropdown-item border-b-2 cursor-pointer smaller text-left w-full">
              <a className='w-full flex justify-normal items-center' rel='noreferrer' href='https://github.com/sinavahabi/calculator-mini-project' target='_blank'>
                Calculator Web App
                <img className='ml-2 w-4 h-4 md:w-6 md:h-6 rounded-md' alt='icon' src={javaScriptIcon} />
              </a>
            </li>
            <li className="dropdown-item border-b-2 cursor-pointer smaller text-left w-full">
              <a className='w-full flex justify-normal items-center' rel='noreferrer' href='https://github.com/sinavahabi/MachineVisionMiniProject' target='_blank'>
                Image Classification (AI)
                <img className='ml-2 w-4 h-4 md:w-6 md:h-6 rounded-md' alt='icon' src={pythonIcon} />
                <img className='ml-2 w-4 h-4 md:w-6 md:h-6 rounded-md' alt='icon' src={AIIcon} />
              </a>
            </li>
            <li className="dropdown-item border-b-2 cursor-pointer smaller text-left w-full">
              <a className='w-full flex justify-normal items-center' rel='noreferrer' href='https://github.com/sinavahabi/AdvanceMarketsMiniProject' target='_blank'>
                Advance Market Status App
                <img className='ml-2 w-4 h-4 md:w-6 md:h-6 rounded-md' alt='icon' src={pythonIcon} />
                <img className='ml-2 w-4 h-4 md:w-6 md:h-6 rounded-md' alt='icon' src={mariaDBIcon} />
              </a>
            </li>
            <li className="dropdown-item border-b-2 cursor-pointer smaller text-left w-full">
              <a className='w-full flex justify-normal items-center' rel='noreferrer' href='https://github.com/sinavahabi/MarketsMiniProject' target='_blank'>
                Market Status App
                <img className='ml-2 w-4 h-4 md:w-6 md:h-6 rounded-md' alt='icon' src={pythonIcon} />
                <img className='ml-2 w-4 h-4 md:w-6 md:h-6 rounded-md' alt='icon' src={mongoDBIcon} />
              </a>
            </li>
            <li className="dropdown-item border-b-2 cursor-pointer smaller text-left w-full">
              <a className='w-full flex justify-normal items-center' rel='noreferrer' href='https://github.com/sinavahabi/RPGMiniProject' target='_blank'>
                RPG App
                <img className='ml-2 w-4 h-4 md:w-6 md:h-6 rounded-md' alt='icon' src={pythonIcon} />
              </a>
            </li>
            <li className="dropdown-item border-b-2 cursor-pointer smaller text-left w-full">
              <a className='w-full flex justify-normal items-center' rel='noreferrer' href='https://github.com/sinavahabi/AverageMiniProject' target='_blank'>
                GPA App
                <img className='ml-2 w-4 h-4 md:w-6 md:h-6 rounded-md' alt='icon' src={pythonIcon} />
              </a>
            </li>
            <li className="dropdown-item flex justify-normal items-center cursor-pointer smaller text-left w-full">
              <a className='w-full flex justify-normal items-center' rel='noreferrer' href='https://github.com/sinavahabi/CalculatorMiniProject' target='_blank'>
                Calculator App
                <img className='ml-2 w-4 h-4 md:w-6 md:h-6 rounded-md' alt='icon' src={pythonIcon} />
              </a>
            </li>
          </ul>
        </div>
      </section>
      <section className='carousel col-span-4 row-span-1'>
        <Carousel slides={carouselSlides} />
      </section>
      <section className='technologies-logo col-span-4 row-span-1'>
        <h4 className='text-center medium py-2 px-4 bg-violet-600 text-white rounded-md rounded-b-none'>تکنولوژی و ابزارها</h4>
        <ul className="logo-list grid gap-2 grid-cols-8 border-2 p-2 rounded-md rounded-t-none">
          <li className="p-2 mx-3">
            <img className='logo-list-img w-12 h-12 rounded-md' src={axiosIcon} alt="axios-icon" />
            <span className='logo-list-title medium hidden text-center my-3'>Axios</span>
          </li>
          <li className="p-2 mx-3">
            <img className='logo-list-img w-12 h-12 rounded-md' src={jsonServerIcon} alt="json-server-icon" />
            <span className='logo-list-title medium hidden text-center my-3'>JSON-server</span>
          </li>
          <li className="p-2 mx-3">
            <img className='logo-list-img w-12 h-12 rounded-md' src={sassIcon} alt="sass-icon" />
            <span className='logo-list-title medium hidden text-center my-3'>Sass</span>
          </li>
          <li className="p-2 mx-3">
            <img className='logo-list-img w-12 h-12 rounded-md' src={tailwindIcon} alt="tailwind-icon" />
            <span className='logo-list-title medium hidden text-center my-3'>Tailwind</span>
          </li>
          <li className="p-2 mx-3">
            <img className='logo-list-img w-12 h-12 rounded-md' src={reactIcon} alt="react-icon" />
            <span className='logo-list-title medium hidden text-center my-3'>React JS</span>
          </li>
          <li className="p-2 mx-3">
            <img className='logo-list-img w-12 h-12 rounded-md' src={javaScriptIcon} alt="js-icon" />
            <span className='logo-list-title medium hidden text-center my-3'>JavaScript</span>
          </li>
          <li className="p-2 mx-3">
            <img className='logo-list-img w-12 h-12 rounded-md' src={cssIcon} alt="css-icon" />
            <span className='logo-list-title medium hidden text-center my-3'>CSS</span>
          </li>
          <li className="p-2 mx-3">
            <img className='logo-list-img w-12 h-12 rounded-md' src={htmlIcon} alt="html-icon" />
            <span className='logo-list-title medium hidden text-center my-3'>HTML</span>
          </li>
        </ul>
      </section>
      <section className='project-desc col-span-6 row-span-1'>
        <div className="border-2 rounded-md">
          <div className="flex flex-col justify-between items-center">
            <div className="flex justify-center items-center w-full border-b-2 py-2">
              <h2 className='ml-1'>فروشگاه کتاب</h2>
              <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -1028.4)"><path d="m3 1035.4v2 1 3 1 5 1c0 1.1.8954 2 2 2h14c1.105 0 2-.9 2-2v-1-5-4-3z" fill="#16a085" /><path d="m3 1034.4v2 1 3 1 5 1c0 1.1.8954 2 2 2h14c1.105 0 2-.9 2-2v-1-5-4-3z" fill="#ecf0f1" /><path d="m3 1033.4v2 1 3 1 5 1c0 1.1.8954 2 2 2h14c1.105 0 2-.9 2-2v-1-5-4-3z" fill="#bdc3c7" /><path d="m3 1032.4v2 1 3 1 5 1c0 1.1.8954 2 2 2h14c1.105 0 2-.9 2-2v-1-5-4-3z" fill="#ecf0f1" /><path d="m5 1028.4c-1.1046 0-2 .9-2 2v1 4 2 1 3 1 5 1c0 1.1.8954 2 2 2h2v-1h-1.5c-.8284 0-1.5-.7-1.5-1.5 0-.9.6716-1.5 1.5-1.5h12.5 1c1.105 0 2-.9 2-2v-1-5-4-3-1c0-1.1-.895-2-2-2h-4z" fill="#16a085" /><path d="m8 1028.4v18h1 9 1c1.105 0 2-.9 2-2v-1-5-4-3-1c0-1.1-.895-2-2-2h-4-6z" fill="#1abc9c" /><path d="m7 1048.4v2 2l2.5-2 2.5 2v-2-2z" fill="#e74c3c" /><path d="m7 1047.4h5v1h-5z" fill="#c0392b" /></g></svg>
            </div>
            <p className='small p-2 text-justify'>
              وبسایت فروشگاه کتاب، برای کاربران علاقه‌مند به مطالعه کتاب‌های دیجیتالی طراحی شده تا با استفاده از امکانات این سایت بتوانند در سریع‌ترین زمان ممکن کتاب‌هایی با موضوعات مورد علاقه خود پیدا کنند و در صورت نیاز به راحتی آن‌ها را تهیه نمایند.<br />
              هنگام استفاده از برخی امکانات سایت مانند جستجو کردن کتاب‌های دیجیتال، فیلتر کردن کتاب‌های مرتبط با موضوعات مختلف و همچنین نمایش برخی جزئیات و ویژگی‌های  کتاب‌ها، نیاز به ثبت نام و ورود به حساب کاربری وجود ندارد. زمانی که شخص نیاز به خرید و تهیه کتاب‌های دیجیتالی مورد نیاز خود را دارد باید ابتدا در سایت ثبت نام کرده و سپس وارد پروفایل کاربری خود شود. با انجام این فرایند شخص به تمامی امکانات سایت دسترسی پیدا کرده و می‌تواند اطلاعات شخصی ثبت شده خود را مدیریت کند. در این مرحله شخص می‌تواند سبد خرید خود را پر کرده و پس از خرید، آن‌ها را در قفسه کتاب خود با استفاده از لینک دانلود که پس از خرید به او تعلق می‌گیرد، دانلود کرده و آن‌ها را به شکل الکترونیکی (فرمت pdf) مطالعه کند.<br />
              سایت کاملا واکنش‌گرا بوده و کاربر می‌تواند با تمامی اندازه‌های مختلف صفحه نمایشگرها، رابط کاربری فوق‌العاده‌ای را تجربه کند. هم‌چنین قابلیت تغییر از تم روشنایی به تم شب نیز وجود دارد.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutUs;
