import React, { useEffect, useState } from 'react'
import { fetchAnimeData } from './API'
import AnimeBox from './components/AnimeBox'
import { Anime } from "./types"
import AnimeDetails from './components/AnimeDetails'
import Loading from './components/Loading'
import History from './components/History'
import './Fontheader.css'
import arrow from './images/down-arrows.png'
import 'animate.css';
import animePicture from './images/anime-pic.png'

type Props = {}

export const SHOWING_ANIME: number = 5

export default function App({ }: Props) {

  const [loading, setLoading] = useState(false)
  const [number, setNumber] = useState(0)
  const [animeList, setAnimeList] = useState<Anime[]>([]) // animes history
  const [currentAnimes, setcurrentAnimes] = useState<Anime[]>([]) // showing animes
  const [isDetail, setIsDetail] = useState(false)
  const [isAnimes, setIsAnimes] = useState(true)
  const [isHistory, setIsHistory] = useState(false)
  const [isGreeting, setIsGreeting] = useState(true)


  const getNewAnimes = async () => {
    setcurrentAnimes([])
    setLoading(true)

    const animeData = await fetchAnimeData()
    setcurrentAnimes(animeData)
    setLoading(false)
  }

  const animeMoreDetail = (number: number) => {
    setIsDetail(true)
    setIsAnimes(false)
    setNumber(number)
  }

  const detailBack = () => {
    setIsDetail(false)
    setIsAnimes(true)
  }

  const historyBack = () => {
    setIsHistory(prev => !prev)
  }

  const resetAnimeHistory = () => {
    setAnimeList(prev => [])
    setIsGreeting(false)
  }

  useEffect(() => {
    setAnimeList((prev: Anime[]) => [...prev, ...currentAnimes])
  }, [currentAnimes])

  if (isHistory) {
    return <History callback={historyBack} callbackResetHistory={resetAnimeHistory} animesList={animeList} />
  }

  if (isAnimes && !isDetail) {
    return (
      <div className='text-center mx-auto'>
        <h1 className='header p-2 md:p-5 bg-slate-200 text-blue-800 md:w-1/2 mx-auto rounded-b-xl mb-5 md:mb-0'>Anime random</h1>
        {isGreeting && <div className='my-12 p-1 text-xl font-bold '>
          <section>Are you don't know what anime to watch ?</section>
          <section>We will help you</section>
          <img className='mx-auto mt-7 animate__animated animate__bounce w-24' src={arrow} alt="arrow" />
        </div>}
        <div className={`md:w-1/3 mx-auto inline md:inline-block ${!isGreeting ? 'my-20' : ''}`}>
          <button className=' bg-blue-800 font-bold md:w-1/2 rounded-l-md rounded-r-none' onClick={getNewAnimes}>new Anime</button>
          <button className='mx-auto bg-blue-900 rounded-r-md rounded-l-none' onClick={historyBack}>History</button>
        </div>
        <br />
        {loading && <Loading />}
        <div className='md:flex justify-around'>
          {!loading && currentAnimes.length === SHOWING_ANIME ? (
            currentAnimes.map((anime, index) => <AnimeBox {...anime} callback={animeMoreDetail} number={index} key={index} />)
          ) : null}
        </div>
        {currentAnimes.length === 0 || loading ? <img className='mx-auto mt-12' src={animePicture} alt="anime" /> : ''}
      </div>
    )
  }

  return <AnimeDetails {...currentAnimes[number]} back={detailBack} />
}