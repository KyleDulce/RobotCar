import { Component } from '@angular/core';
import { SocketService } from 'src/app/services/sockets/socket.service';

@Component({
  selector: 'app-manual-control-panel',
  templateUrl: './manual-control-panel.component.html',
  styleUrls: ['./manual-control-panel.component.css']
})
export class ManualControlPanelComponent {

  imageLoc: string;

  constructor(private socket: SocketService) { 
    var self = this;
    socket.connect();
    socket.addListener('ImageResult', function(data) {
      self.imgResult(data, self);
      console.log("set new image");
    });
  }

  //0 STOP 1 FORWARD 2 BACKWARD 3 LEFT 4 RIGHT
  onMove(d: number) {
    this.socket.sendMessage("move", d);
  }

  imgResult(data, self) {
    this.imageLoc = "";
    setTimeout(function() {
      self.imageLoc = SocketService.DESTINATION + "/" + data;
      console.log("set new image");
    }, 100);
  }

  grabpic() {
    this.socket.sendMessage("captureImage", null);
  }

}
