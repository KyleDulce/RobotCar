import { Injectable } from '@angular/core';
declare var require: any;
var io = require("socket.io-client");

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public static DESTINATION = "http://10.0.0.220:3500";

  private socket;

  constructor() { }

  public connect() {
    this.socket = io(SocketService.DESTINATION);
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
