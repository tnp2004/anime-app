import React from 'react'
import { Anime } from '../types'
import '../Fontheader.css'

interface animeDetail extends Anime {
    back: any
}

const AnimeDetails: React.FC<animeDetail> = ({ title, url, episodes, score, images, trailer, duration, studios, synopsis, back }) => {

    return (
        <div className='container mx-auto'>
            <button className='md:absolute left-3 top-3 bg-blue-900 font-bold m-1' onClick={back}>Back</button>
            <h1 className='p-5 header text-center'>{title}</h1>
            <div className='md:flex md:w-1/2 mx-auto bg-indigo-600 p-2 rounded-t-md md:mt-12'>
                <img className='mx-auto md:mx-1 w-content p-2 bg-indigo-900' src={`${images}`} alt={title} />
                <ul className='text-start mt-3 ml-1 w-full'>
                    <li><b>Score:</b> {score} <img className='w-5 inline mb-1' src="https://em-content.zobj.net/thumbs/160/microsoft/310/star_2b50.png" alt="star" /></li>
                    <li className='my-3'><b>Episoeds:</b> {episodes} </li>
                    <li className='my-3'><b>Duration:</b> {duration || 'Unknown'}</li>
                    <li className='my-3'><b>Studios:</b> {studios.length !== 0 ? studios.toString() : 'Unknown'}</li>
                    <li className='my-3'><b>Trailer:</b> {trailer ? <a className='text-white hover:text-slate-300' href={trailer}>{trailer}</a> : 'none'}</li>
                    <li className='my-3'><b>Mal:</b> {url ? <a href={url} className='cursor-pointer break-all text-white hover:text-slate-300'>{url}</a> : 'none'}</li>
                </ul>
            </div>
            <div className='bg-indigo-500 md:mb-3 md:w-1/2 mx-auto rounded-b-md'>
                <p className='p-2 text-start'>{synopsis ? synopsis : 'no synopsis'}</p>
            </div>
        </div>
    )
}

export default AnimeDetails