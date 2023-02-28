import { useForm, SubmitHandler } from 'react-hook-form'
import { INewsFilters, INewsData } from '../@types/news'
import { useState } from 'react'
import { toast } from 'react-toastify'
import NewsCard from '../components/NewsCard'
import { useLoader } from '../context/LoaderContext'
import { NewsAPI } from '../apis/newsAPI'

export default function Search() {
    const [page, setPage] = useState(1)
    const [sources, setSources] = useState([])
    const [newsData, setNewsData] = useState<INewsData>()
    const { setLoading } = useLoader()

    const { register, handleSubmit, getValues } = useForm<INewsFilters>()

    const onSubmit: SubmitHandler<INewsFilters> = (inputs) => {
        searchNews({ ...inputs, page: 1 })
        setPage(1)
    }

    const searchNews = (inputs: INewsFilters , ) => {
        setLoading(true)
        NewsAPI.searchNews(inputs)
            .then((data) => {
                setNewsData((newsData) => {
                    if (inputs.page && inputs.page > 1 && newsData) {
                        newsData.articles = [...newsData.articles, ...data.articles]
                        console.log(newsData)
                        return newsData
                    }
                    return data
                })
            })
            .catch((err) => {
                toast(err?.message ? err.message : 'Failed to load data!', {
                    type: 'error',
                    delay: 1000,
                })
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const getSources = () => {
        setLoading(true)
        const { country, category } = getValues()
        NewsAPI.getSources({ country, category })
            .then((res) => {
                if (res.status == 'ok') {
                    setSources(res.sources)
                }
            })
            .catch((err) => {
                toast(err?.message ? err.message : 'Failed to load data!', {
                    type: 'error',
                    delay: 1000,
                })
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const loadMore = async () => {
        searchNews({ ...getValues(), page: page + 1 })
        setPage(page + 1)
    }
    return (
        <>
            <div className='box py-4'>
                <div className='w-full p-6 m-auto bg-neutral rounded-box shadow-md '>
                    <form className='mt-6' onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className='relative'>
                            <div className='absolute flex items-center ml-2 h-full'>
                                <svg
                                    className='w-4 h-4 fill-current text-primary-gray-dark'
                                    viewBox='0 0 16 16'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path d='M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z'></path>
                                </svg>
                            </div>

                            <input
                                type='text'
                                {...register('q')}
                                placeholder='Search news by keywords, title or description...'
                                className='px-8 py-3 block w-full mt-2 rounded-md focus:outline-none focus:ring-0 focus:ring-opacity-40 border border-gray-500 focus:border-blue-400 focus:ring-blue-300'
                            />
                        </div>

                        <div className='flex items-center justify-between mt-4'>
                            <p className='font-medium'>Filters</p>

                            {/* <button className='px-4 py-2 text-sm font-medium rounded-md'>
                            Reset Filter
                        </button> */}
                        </div>

                        <div>
                            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4'>
                                <select
                                    {...register('news_api_source')}
                                    className='px-4 py-3 block w-full mt-2 rounded-md focus:outline-none border border-gray-500 focus:border-blue-400 focus:ring-0'
                                >
                                    <option value='newsapi'>newsapi.org</option>
                                </select>

                                <select
                                    {...register('category', {
                                        onChange: () => getSources(),
                                    })}
                                    className='px-4 py-3 block w-full mt-2 rounded-md focus:outline-none border border-gray-500 focus:border-blue-400 focus:ring-0'
                                >
                                    <option value=''>All Categories</option>
                                    <option value='business'>Business</option>
                                    <option value='entertainment'>Entertainment</option>
                                    <option value='science'>Science</option>
                                    <option value='health'>Health</option>
                                    <option value='sports'>Sports</option>
                                    <option value='technology'>Technology</option>
                                </select>

                                <select
                                    {...register('country', {
                                        onChange: () => getSources(),
                                    })}
                                    className='px-4 py-3 block w-full mt-2 rounded-md focus:outline-none border border-gray-500 focus:border-blue-400 focus:ring-0'
                                >
                                    <option value=''>All Countries</option>
                                    <option value='us'>United States 🇺🇸 </option>
                                    <option value='gb'>United Kingdom 🇬🇧 </option>
                                    <option value='au'>Australia 🇦🇺 </option>
                                </select>

                                <select
                                    {...register('sources')}
                                    className='px-4 py-3 block w-full mt-2 rounded-md focus:outline-none border border-gray-500 focus:border-blue-400 focus:ring-0'
                                >
                                    <option value=''>All Sources</option>
                                    {sources &&
                                        sources.map((source: any) => (
                                            <option key={source.id} value={source.id}>
                                                {source.name}{' '}
                                                {/* <i className='text-sm'>({source.country})</i> */}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {newsData && <h6 className='text-lg font-bold dark:text-white my-4'>Result</h6>}
            {!newsData && <p className='text-sm text-center text-red-500 my-4'>No data found!</p>}

            <div className='inline-grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-5'>
                {newsData &&
                    newsData?.articles?.map((_article, i) => (
                        <NewsCard key={i} article={_article} />
                    ))}
                {newsData && newsData.totalResults > newsData.articles.length && (
                    <button
                        onClick={() => loadMore()}
                        className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    >
                        Load more...
                    </button>
                )}
            </div>
        </>
    )
}
