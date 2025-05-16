import { httpService } from "./http.service";

export async function getScrapedSongs(reg?: string){
    const data = await httpService.get("song/songs", reg)
    return data
};