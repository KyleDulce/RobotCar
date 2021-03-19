import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class SocketInterfaceService {

  constructor(private socket: SocketService) { }
}
