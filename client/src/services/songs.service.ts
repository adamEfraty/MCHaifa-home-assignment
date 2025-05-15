import { httpService } from "./http.service";

export async function getScrapedSongs(reg?: string){
    console.log('radwan')
    const data = await httpService.get("song", reg)
    console.log(data)
    return data
};