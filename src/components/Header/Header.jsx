import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi'; // Import icons for menu and close buttons

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // State to manage the dropdown menu

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Blogs',
      slug: '/all-blogs',
      active: authStatus,
    },
    {
      name: 'Add Blog',
      slug: '/add-blog',
      active: authStatus,
    },
  ];

  return (
    <header className='p-3 shadow bg-gray-900 fixed top-0 z-50 w-full'>
      <Container>
        <nav className='flex justify-between items-center'>
          {/* Logo Section */}
          <div className='mr-4 flex items-center'>
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          {/* Hamburger Menu Icon for Mobile */}
          <div className='block lg:hidden'>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className='text-yellow-500 hover:text-yellow-300 focus:outline-none'
            >
              {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
            </button>
          </div>

          {/* Navigation Items - Hidden on Mobile, Visible on Larger Screens */}
          <ul className='hidden lg:flex flex-wrap'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='mx-2 p-2 duration-200 rounded-xl text-lg font-semibold text-yellow-500 hover:text-yellow-300'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>

        {/* Dropdown Menu for Mobile */}
        {menuOpen && (
          <ul className='lg:hidden mt-4 bg-gray-800 rounded-lg shadow-lg'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      navigate(item.slug);
                      setMenuOpen(false); // Close menu after navigating
                    }}
                    className='block w-full px-4 py-2 text-left text-lg font-semibold text-yellow-500 hover:text-yellow-400'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        )}
      </Container>
    </header>
  );
}

export default Header;
