import { useEffect, useState } from 'react'
import { NewsAPI } from '../apis/newsAPI'
import { UserAPI } from '../apis/userAPI'
import { useLoader } from '../context/LoaderContext'
import HeadlineCard from '../components/HeadlineCard'
import { INewsData } from '../@types/news'

export default function Home() {
    const { setLoading } = useLoader()
    const [newsData, setNewsData] = useState<INewsData>()

    const getTopHeadlines = async () => {
        setLoading(true)
        NewsAPI.getTopHeadlines({
            page: 1,
            country: 'us',
            category: 'technology',
        })
            .then((data) => {
                setNewsData(data)
            })
            .catch((err) => {
                console.error(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        ;(async () => {
            await getTopHeadlines()
        })()
    }, [])

    return (
        <>
            <h6 className='text-lg font-bold dark:text-white my-4'>Top Headlines</h6>

            <div className='inline-grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-5'>
                {newsData &&
                    newsData?.articles?.map((_article, i) => (
                        <HeadlineCard key={i} article={_article} />
                    ))}
            </div>
        </>
    )
}
