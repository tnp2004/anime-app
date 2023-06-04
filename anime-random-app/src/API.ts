import { SHOWING_ANIME } from "./App"
import { Anime } from "./types"

class AnimeCls {
    constructor(
        public title: string, 
        public url: string, 
        public episodes: number,
        public score: number,
        public images: {}, 
        public trailer: string, 
        public duration: string, 
        public studios: [], 
        public synopsis: string
        ){}
}

interface Studio {
    mal_id: number
    name: string
    type: string
    url: string
}

export const fetchAnimeData = async (): Promise<Anime[]> => {
    const animeArr: Anime[] = []
    for(let i = 0;i < SHOWING_ANIME; i++) {
        const endpoint = `https://api.jikan.moe/v4/random/anime`
        const dataJson = await (await fetch(endpoint)).json()
        const { title, url, episodes, favorites, images, trailer, duration, studios, synopsis } = dataJson.data
        const studiosName = studios.map((studio: Studio) => studio.name)
        const newData = await new AnimeCls(title, url, episodes, favorites, images.jpg.image_url, trailer.url, duration, studiosName, synopsis)
        animeArr.push(newData)
    }
    return animeArr
}