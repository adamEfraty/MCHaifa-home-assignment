import { io } from 'socket.io-client';

export const socket = io("https://mchaifa-home-assignment-2.onrender.com")

export function handleEmitter(socketName: string, song?: any){
    socket.emit(socketName, song)
}