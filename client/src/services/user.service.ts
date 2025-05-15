import type { UserModel } from "../models/user.model"
import { httpService } from "./http.service"

const STORAGE_KEY_LOGGEDIN_USER = "loggedInUser"

export function getLoggedinUser(): any {
  const session = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)
  if(!session) return null
  return JSON.parse(session)
}

export function setUserSession(userData: UserModel): void {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userData))
}

export async function validateUser(): Promise<UserModel | null> {
    const sessionUser = await getLoggedinUser()
    if(!sessionUser) return null 
    const data = await httpService.post("auth/validate", sessionUser);
    return data
}