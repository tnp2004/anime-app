import React, { useState } from 'react'
import '../Fontheader.css'
import { Anime } from '../types'
import AnimeDetails from './AnimeDetails'

type Props = {
    callback: () => void
    callbackResetHistory: () => void
    animesList: Anime[]
}

const History: React.FC<Props> = ({ callback, callbackResetHistory, animesList }) => {
    const [isDetail, setIsDetail] = useState(false)
    const [animeDetail, setAnimeDetail] = useState<Anime>(Object)
    const detail = (anime: Anime) => {
        setIsDetail(prev => !prev)
        setAnimeDetail(anime)
    }

    if (isDetail) {
        return <AnimeDetails {...animeDetail} back={detail} />
    }

    return (
        <div>
            <button className='md:absolute left-3 top-3 bg-blue-900 font-bold m-1' onClick={callback}>Back</button>
            <div className='mx-auto md:w-1/2'>
                <h1 className='header pt-5 text-center md:text-start'>History</h1>
                <button className='mt-5 bg-transparent border-2 border-blue-600 text-blue-500 hover:bg-blue-800 hover:border-blue-900 hover:text-slate-200' onClick={callbackResetHistory}>reset history</button>
                {
                    animesList.length === 0 ?
                        <p className='text-center text-slate-500 my-20 font-bold md:text-xl'>no history</p> :
                        <ol className='my-10 p-1'>
                            {animesList.map((anime, index) =>
                                <li className='bg-blue-900 rounded my-2 p-1 font-bold flex cursor-pointer hover:bg-blue-800 transition duration-150 ease-out hover:ease-in' key={index} onClick={() => detail(animesList[index])} >
                                    <span className='my-auto'>{index + 1}. </span>
                                    <img className='bg-auto w-8 h-10 inline mx-2 border-2 border-slate-300' src={`${anime.images}`} alt={anime.title} />
                                    <span className='my-auto'>{anime.title}</span>
                                </li>)}
                        </ol>
                }
            </div>
        </div>
    )
}

export default History