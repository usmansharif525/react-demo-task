import BounceLoader from 'react-spinners/BounceLoader'
import { useLoader } from '../context/LoaderContext'

export function Loader() {
    const { loading, setLoading } = useLoader()

    return (
        <>
            {loading && (
                <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-base-100 opacity-75 flex flex-col items-center justify-center'>
                    <BounceLoader
                        // color={color}
                        loading={loading}
                        cssOverride={{
                            color: 'red',
                        }}
                        size={50}
                        aria-label='Loading Spinner'
                        data-testid='loader'
                    />
                </div>
            )}
        </>
    )
}
