import { io } from 'socket.io-client';

export const socket = io("http://localhost:3000")

export function handleEmitter(socketName: string, song?: any){
    socket.emit(socketName, song)
}