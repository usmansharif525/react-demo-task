import { createContext, ReactElement, useContext, useState } from 'react'
import { ILoaderContextType } from '../@types/loader'

const LoaderContext = createContext<ILoaderContextType>({
    loading: false,
    setLoading: null,
})

const LoaderProvider: React.FC<any> = ({ children } : any) => {
    const [loading, setLoading] = useState(false)

    return (
        <LoaderContext.Provider value={{ loading, setLoading }}>{children}</LoaderContext.Provider>
    )
}

const useLoader = () => {
    const context = useContext(LoaderContext)
    if (!context) {
        throw new Error('useLoading must be used within LoaderProvider')
    }
    return context
}

export { LoaderProvider, useLoader }