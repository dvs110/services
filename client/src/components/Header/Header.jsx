import React from 'react'
import logo from '../../assets/logo-dark-1.png'
import { GiHamburgerMenu } from 'react-icons/gi'
import HeaderToggle from '../HeaderToggle/HeaderToggle'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [storedData, setstoredData] = useState('');
  const toggle = () => {
    if (toggleMenu)
      setToggleMenu(false)
    else
      setToggleMenu(true)

  }
  useEffect(() => {
    const s = localStorage.getItem('myData');
    const stored = JSON.parse(s);
    setstoredData(stored);
  }, []);
  return (
    <>
      <div className="max-w-auto sticky px-12  top-0 py-5 font-textFont bg-white drop-shadow-xl z-50">
        <div className='flex justify-between items-center w-auto'>
          {/* logo section  */}
          <div>
            <img src={logo} alt="" />
            <h1></h1>
          </div>
          {/* navbar section  */}
          <div >
            <GiHamburgerMenu className='block md:hidden  text-black w-[30px] h-[50px] ' onClick={toggle} />



            {/* desktop navbar  */}
            <nav className='hidden md:block'>
              <ul className='flex text-black font-bold text-sm uppercase space-x-10 mr-10'>
                <Link to="/"> <li><a className='hover:text-btnColor' href="home">Home</a></li></Link>
                <li><a className='hover:text-btnColor' href="">Categories</a></li>
                <li><a className='hover:text-btnColor' href="">About</a></li>
                <Link to="/feedback"><li><a className='hover:text-btnColor' href="">Feedback</a></li></Link>
                <Link to="/careers"><li><a className='hover:text-btnColor' href="">Careers</a></li></Link>
                <li><a className='hover:text-btnColor' href="contact">Contact </a></li>
              </ul>
            </nav>
          </div>

          {/* login and signup button section  */}
          <div className='hidden md:block'>
            {!storedData ? <Link to='/login'>  <button className='bg-btnColor px-6 py-1 text-black font-textFont rounded-2xl border-none mx-4' >
              Login</button> </Link> : ""}
            {/* <button className=' bg-btnColor border-none text-black px-6 py-1 font-textFont  mx-5 rounded-2xl'>Sign Up</button> */}
          </div>

        </div>
      </div>
      {/* mobile navbar  */}
      {toggleMenu ? <HeaderToggle /> : <></>}

    </>
  )
}

export default Header