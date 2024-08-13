import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { Loading } from '../pages'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [serverError, setServerError] = useState("")
    const [loading, setLoading] = useState(false)

    const login = async (data) => {
        setServerError("")
        setLoading(true)
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                // console.log(userData)
                if (userData) {
                    dispatch(authLogin(userData))
                }
                navigate("/")
            }
        } catch (error) {
            setServerError(error.message)
        } finally {
            setLoading(false)
        }
    }
    return loading ? <Loading message="Logging in..." /> : 
    (
        <div className='flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500'>
            <div className='w-full max-w-lg bg-gray-900 rounded-xl p-10 border border-purple-700 shadow-xl'>
                <div className="mb-4 flex justify-center">
                    <span>
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight text-gray-200">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-gray-400">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-semibold text-lg text-yellow-500 hover:text-yellow-400 transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {serverError && <p className="mt-8 text-center text-red-500">{serverError}</p>}

                <form onSubmit={handleSubmit(login)} className='mt-6'>
                    <div className='space-y-8'>
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            className="bg-gray-800 text-gray-200"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Invalid email address",
                                }
                            })}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            className="bg-gray-800 text-gray-200"
                            {...register("password", {
                                required: true,
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                }
                            })}
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                        <Button
                            type="submit"
                            className="mt-4 w-full bg-yellow-500 text-gray-900 hover:bg-yellow-400"
                        >
                            Sign In
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login