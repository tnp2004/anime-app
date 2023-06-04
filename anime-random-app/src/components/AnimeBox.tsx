import React from 'react'
import { Anime } from '../types'

const AnimeBox: React.FC<Anime> = ({ title, url, episodes, images, trailer, duration, studios, synopsis, callback, number }) => {
    return (
        <button className="p-1 border-2 w-64 h-fit my-4 md:my-0 bg-blue-900" onClick={() => callback(number)}>
            <h2 className='p-1 bg-blue-500 text-slate-800 font-bold block w-full cursor-pointer mx-auto'>{title}</h2>
            <img className='mx-auto cursor-pointer rounded-b-md border-4 border-blue-800' loading='lazy' src={`${images}`} alt={title} />
            <p className='text-slate-300 font-bold'>{episodes > 1 ? `${episodes} Episodes` : "1 Episode"}</p>
        </button>
    )
}

export default AnimeBox