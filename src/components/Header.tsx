import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { UserAPI } from '../apis/userAPI'
import { useLoader } from '../context/LoaderContext'
import { toast } from 'react-toastify'

export function Header() {
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const { setLoading } = useLoader()
    useEffect(() => {
        // console.log(Cookies.get('XSRF-TOKEN'), !!Cookies.get('XSRF-TOKEN'))
        const xsrfCookie = !!Cookies.get('XSRF-TOKEN')
        if (xsrfCookie) {
            setLoading(false)
            UserAPI.getUser()
                .then((res) => {
                    setIsLogin(true)
                })
                .catch((err) => {
                    setIsLogin(false)
                    toast('Please login!', { type: 'warning'})
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            setIsLogin(false)
            toast('Please login!', { type: 'warning'})
        }
    }, [])

    return (
        <div className='mb-2 shadow-lg navbar bg-neutral text-neutral-content rounded-box'>
            <div className='flex-1 px-2 mx-2'>
                <h1 className='flex text-xl'>NewApp</h1>
            </div>

            {!isLogin ? (
                <div className='flex-2 px-2 mx-2'>
                    <Link to='/login'>
                        <h1 className='btn btn-ghost btn-sm rounded-btn bg-blue-800 hover:bg-blue-900 font-semibold'>
                            Login
                        </h1>
                    </Link>
                    &nbsp;&nbsp;
                    <Link to='/register'>
                        <h1 className='btn btn-ghost btn-sm rounded-btn bg-blue-800 hover:bg-blue-900 font-semibold'>
                            Register
                        </h1>
                    </Link>
                </div>
            ) : (
                <div className='flex-2 px-2 mx-2'>
                    <Link to='/'>
                        <h1 className='btn btn-ghost btn-sm rounded-btn bg-blue-800 hover:bg-blue-900 font-semibold'>
                            Home
                        </h1>
                    </Link>
                    &nbsp;&nbsp;
                    <Link to='/search'>
                        <h1 className='btn btn-ghost btn-sm rounded-btn bg-blue-800 hover:bg-blue-900 font-semibold'>
                            Search
                        </h1>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Header
