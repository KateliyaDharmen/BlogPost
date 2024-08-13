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
        <button onClick={handleLogout} className='mx-2 p-2 duration-200 text-lg font-semibold text-yellow-500 hover:text-yellow-300 '>Logout</button>
    )
}

export default LogoutBtn