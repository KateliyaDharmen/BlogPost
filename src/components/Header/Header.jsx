import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus
    },
    {
      name: 'All Blogs',
      slug: '/all-blogs',
      active: authStatus
    },
    {
      name: 'Add Blog',
      slug: '/add-blog',
      active: authStatus
    },
  ];

  return (
  <header className='p-3 shadow bg-gray-900 fixed top-0 z-50 w-full min-w-96'>
      <Container>
        <nav className='flex justify-between items-center'>
          <div className='mr-4 flex items-center text-yellow-400'>
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className='flex'>
            {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className=' mx-3 p-2 duration-200 rounded-xl text-lg font-semibold text-yellow-400 hover:text-indigo-400'
                >{item.name}</button>
              </li>
            ) : null  
            )}
            {
              authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )
            }
          </ul>
        </nav>
      </Container>
    </header>

  )
}

export default Header