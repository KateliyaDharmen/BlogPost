import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import { Loading } from '../pages'

function SignUp() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [serverError, setServerError] = useState("")
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()


    const signup = async (data) => {
        setServerError("")
        setLoading(true)
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const user = await authService.getCurrentUser()
                if (user) {
                    dispatch(login(user))
                }
                navigate("/")
            }
        } catch (error) {
            setServerError(error.message)
        } finally {
            setLoading(false)
        }
    }
    return loading ? <Loading message={"Creating account..."} /> :
        (
            <div className='flex justify-center bg-gradient-to-r from-indigo-500 to-purple-500'>
                <div className='w-full max-w-lg bg-gray-900 rounded-xl p-10 border border-purple-700 shadow-xl'>
                    <div className="mb-4 flex justify-center">
                        <span >
                            <Logo width="100%" />
                        </span>
                    </div>

                    <h2 className="text-center text-2xl font-bold leading-tight text-gray-200">Sign up to create account</h2>
                    <p className="mt-2 text-center text-base text-gray-400">
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-lg text-yellow-500 hover:text-yellow-400 transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>

                    {serverError && <p className="mt-2 text-center text-base text-red-500">{serverError}</p>}

                    <form onSubmit={handleSubmit(signup)} className='mt-6'>
                        <div className='space-y-6'>
                            <Input
                                label="Name"
                                placeholder="Enter your full name"
                                className="bg-gray-800 text-gray-200"
                                {...register("name", {
                                    required: "Name is required",
                                })}
                            />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                            <Input
                                label="Email"
                                placeholder="Enter your email"
                                type="email"
                                className="bg-gray-800 text-gray-200"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Invalid email address"
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


                            <Button type='submit' className='w-full bg-yellow-500 text-gray-900 hover:bg-yellow-400' disabled={loading}>
                                {loading ? "Creating account..." : "Create Account"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
}

export default SignUp