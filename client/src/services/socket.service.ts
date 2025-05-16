import { io } from 'socket.io-client';

export const socket = io("/")

export function handleEmitter(socketName: string, song?: any){
    socket.emit(socketName, song)
}