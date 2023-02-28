import { INewsArticle } from '../@types/news'

export default function NewsCard({ article }: any) {
    return (
        <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-8 relative'>
            <div className='w-full min-h-[250px] bg-zinc-900 rounded-lg items-center justify-center flex flex-col overflow-hidden'>
                <img className='rounded-t-lg w-full  m-auto' src={article?.urlToImage} alt='' />
            </div>
            <div className='p-5 pb-20'>
                <a href={article?.url}>
                    <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                        {article?.title}
                    </h5>
                </a>
                <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
                    {article?.description}
                </p>
                <div className='absolute inset-x-0 bottom-0 p-5'>
                    <a
                        href={article?.url}
                        target='_blank'
                        rel='noreferrer'
                        className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    >
                        Read more...
                    </a>
                    <span className='inline-flex float-right items-center px-3 py-2 text-xs italic font-medium text-center text-gray-500 truncate dark:text-gray-400'>
                        Source: {article?.source?.name}
                    </span>
                </div>
            </div>
        </div>
    )
}
