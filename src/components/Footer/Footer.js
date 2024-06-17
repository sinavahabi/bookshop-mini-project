import './Footer.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagram, faGithub, faGitlab, faTelegram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import copyrightImg from '../../assets/images/copyright.png';
import { useState } from 'react';

function Footer({ isBlur }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <footer className={`footer min-h-300 min-w-250 flex flex-wrap justify-around items-center mt-6 py-3 px-2 dark:bg-gray-950 bg-gray-800 text-white ${isBlur ? 'blur-sm' : 'blur-none'}`}>
      <section className='footer-social-media order-3 w-full md:w-auto md:order-1 lg:order-1'>
        <ul className='medium flex flex-col space-y-2 justify-center items-center md:items-start' >
          <li className='border-b-2 border-slate-600 w-full text-center md:border-0 md:w-auto'>
            <NavLink className='hover:text-blue-600' target='_blank' to='https://github.com/sinavahabi'>
              GitHub<FontAwesomeIcon className='mr-2' icon={faGithub} />
            </NavLink>
          </li>
          <li className='border-b-2 border-slate-600 w-full text-center md:border-0 md:w-auto'>
            <NavLink className='hover:text-blue-600' target='_blank' to='https://gitlab.com/sinavahabi'>
              GitLab<FontAwesomeIcon className='mr-2' icon={faGitlab} />
            </NavLink>
          </li>
          <li className='border-b-2 border-slate-600 w-full text-center md:border-0 md:w-auto'>
            <NavLink className='hover:text-blue-600' target='_blank' to='https://www.linkedin.com/in/sinavahabi'>
              LinkedIn<FontAwesomeIcon className='mr-2' icon={faLinkedin} />
            </NavLink>
          </li>
          <li className='border-b-2 border-slate-600 w-full text-center md:border-0 md:w-auto'>
            <NavLink className='hover:text-blue-600' target='_blank' to='https://twitter.com/sinavahabii'>
              Twitter<FontAwesomeIcon className='mr-2' icon={faTwitter} />
            </NavLink>
          </li>
          <li className='border-b-2 border-slate-600 w-full text-center md:border-0 md:w-auto'>
            <NavLink className='hover:text-blue-600' target='_blank' to='https://www.facebook.com/'>
              Facebook<FontAwesomeIcon className='mr-2' icon={faFacebookSquare} />
            </NavLink>
          </li>
          <li className='border-b-2 border-slate-600 w-full text-center md:border-0 md:w-auto'>
            <NavLink className='hover:text-blue-600' target='_blank' to='https://instagram.com/sina.vahabii'>
              Instagram<FontAwesomeIcon className='mr-2' icon={faInstagram} />
            </NavLink>
          </li>
          <li className='border-b-2 border-slate-600 w-full text-center md:border-0 md:w-auto'>
            <NavLink className='hover:text-blue-600' target='_blank' to='https://t.me/sinavahabi'>
              Telegram<FontAwesomeIcon className='mr-2' icon={faTelegram} />
            </NavLink>
          </li>
        </ul>
      </section>
      <section className='footer-copyright order-3 mt-6 lg:mt-0 md:w-full lg:w-auto md:order-3 lg:order-2'>
        <div className='flex justify-center items-center'>
          <img src={copyrightImg} alt='copyright logo' className='h-16 sm:h-20 md:h-24 lg:h-28' />
          <p className='medium mr-2 '>تمامی حقوق این وبسایت متعلق به اپلیکیشن دیجی کتاب می‌باشد!</p>
        </div>
      </section>
      <section className='footer-menu order-1 w-full mb-8 md:w-auto lg:mt-0 md:order-2 lg:order-3'>
        <ul className='large flex flex-row justify-evenly items-center md:flex-col md:space-y-8 md:justify-center md:items-start'>
          <li className={`${isHovered ? 'hovered' : ''} underline hover:no-underline`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <FontAwesomeIcon className='ml-2 footer-icon opacity-0 transition-opacity' icon={faChevronLeft} />
            <NavLink className='footer-about-us-link' to='/about-us'>درباره ما</NavLink>
          </li>
          <li className={`${isHovered ? 'hovered' : ''} underline hover:no-underline`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <FontAwesomeIcon className='ml-2 footer-icon opacity-0 transition-opacity' icon={faChevronLeft} />
            <NavLink className='footer-products-link' to='/'>کتاب‌ها</NavLink>
          </li>
          <li className={`${isHovered ? 'hovered' : ''} underline hover:no-underline`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <FontAwesomeIcon className='ml-2 footer-icon opacity-0 transition-opacity' icon={faChevronLeft} />
            <NavLink className='footer-home-link' to='/'>خانه</NavLink>
          </li>
        </ul>
      </section>
    </footer>
  );
}

export default Footer;
