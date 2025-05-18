import { io } from 'socket.io-client';

export const socket = io(process.env.NODE_ENV === "production" ? "/" : "//localhost:3000/")

export function handleEmitter(socketName: string, song?: any){
    socket.emit(socketName, song)
}