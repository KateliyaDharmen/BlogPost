import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        authService.logout()
        .then(() => {
            dispatch(logout())
            navigate('/login')
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <button onClick={handleLogout} className='inline-block px-3 py-2 duration-200 text-lg text-yellow-400 hover:text-indigo-400 font-semibold rounded-lg'>Logout</button>
    )
}

export default LogoutBtn