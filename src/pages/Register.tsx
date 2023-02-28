import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useForm, SubmitHandler } from 'react-hook-form'

import { UserAPI } from '../apis/userAPI'
import { useLoader } from '../context/LoaderContext'

import { IRegisterFormInput } from '../@types/register'

export default function Register() {
    const { setLoading } = useLoader()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IRegisterFormInput>()

    const onSubmit: SubmitHandler<IRegisterFormInput> = (data) => {
        setLoading(true)
        UserAPI.register(data)
            .then((res) => {
                console.log('response => ', res)
                toast('Registered Successfully!', {
                    type: 'success',
                })
                window.location.href = '/'
            })
            .catch((err) => {
                console.log('Error => ', err?.response?.data?.message)
                toast(err?.response?.data?.message, {
                    type: 'error',
                })
                if (err?.response?.data?.errors) {
                    console.log(err?.response?.data?.errors)
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <div className='relative flex flex-col justify-center min-h-screen overflow-hidden'>
            <div className='w-full p-6 m-auto bg-neutral rounded-box shadow-md lg:max-w-xl'>
                <h1 className='text-3xl font-semibold text-center text-blue-700'>Register</h1>
                <form className='mt-6' onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className='mb-2'>
                        <label htmlFor='name' className='block text-sm font-semibold'>
                            Name
                        </label>
                        <input
                            id='name'
                            type='text'
                            {...register('name', {
                                required: true,
                            })}
                            className={
                                'block w-full px-4 py-2 mt-2 rounded-md focus:outline-none focus:ring focus:ring-opacity-40 border ' +
                                (errors.name
                                    ? 'border-red-500 focus:border-red-400 focus:ring-red-300'
                                    : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300')
                            }
                        />
                        {errors.name && (
                            <p className='text-red-500 text-xs italic'>Please enter your name</p>
                        )}
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='email' className='block text-sm font-semibold'>
                            Email
                        </label>
                        <input
                            id='email'
                            type='email'
                            {...register('email', {
                                required: true,
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'Entered value does not match email format',
                                },
                            })}
                            className={
                                'block w-full px-4 py-2 mt-2 rounded-md focus:outline-none focus:ring focus:ring-opacity-40 border ' +
                                (errors.email
                                    ? 'border-red-500 focus:border-red-400 focus:ring-red-300'
                                    : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300')
                            }
                        />
                        {errors.email && (
                            <p className='text-red-500 text-xs italic'>
                                Please enter a valid email address
                            </p>
                        )}
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='password' className='block text-sm font-semibold'>
                            Password
                        </label>
                        <input
                            id='password'
                            type='password'
                            {...register('password', { required: true })}
                            className={
                                'block w-full px-4 py-2 mt-2 rounded-md focus:outline-none focus:ring focus:ring-opacity-40 border ' +
                                (errors.password
                                    ? 'border-red-500 focus:border-red-400 focus:ring-red-300'
                                    : 'border-gray-500 focus:border-blue-400 focus:ring-blue-300')
                            }
                        />
                        {errors.password && (
                            <p className='text-red-500 text-xs italic'>
                                Please enter a valid password
                            </p>
                        )}
                    </div>

                    <div className='mt-6'>
                        <button
                            type='submit'
                            className='w-full px-4 py-2 tracking-wide transition-colors duration-200 transform bg-blue-800 rounded-md hover:bg-blue-900 focus:outline-none focus:bg-blue-600'
                        >
                            Register
                        </button>
                    </div>
                </form>

                <p className='mt-8 text-xs font-light text-center'>
                    {' '}
                    Already have an account?{' '}
                    <Link to='/login'>
                        <span className='font-medium text-blue-600 hover:underline'>Login</span>
                    </Link>
                </p>
            </div>
        </div>
    )
}
