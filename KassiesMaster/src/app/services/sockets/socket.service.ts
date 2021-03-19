import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private static DESTINATION = "http://10.0.0.220:3500";
  private io;

  private socket;

  constructor() { 
    this.io = require("socket.io-client");
  }

  public connect() {
    this.socket = this.io(SocketService.DESTINATION);
  }

  public connectionStatus(): boolean {
    return this.socket.connected;
  }

  public addListener(eventName: string, callback) {
    this.socket.on(eventName, callback);
  }

  public sendMessage(eventName, data) {
    this.socket.emit(eventName, data);
  }

  public removeAllListenersOnEvent(eventName:string) {
    this.socket.removeAllListeners(eventName);
  }

  public removeListenerOnEvent(eventName: string, callbackToRemove) {
    this.socket.off(eventName, callbackToRemove);
  }

}
