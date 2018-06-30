import { Component } from '@angular/core';

import * as PlatwareClient from '../../platwareClientPackage/index';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(){
    // console.log("aes = ",PlatwareClient.getEncryption('priya','12345'));
    // console.log("getHashvalue =",PlatwareClient.getHashvalue('priya','12345'));
    console.log("getRSA = ",PlatwareClient.getRSA('priya'));
    
  }
}
