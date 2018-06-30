import { Component } from '@angular/core';

import * as PlatwareClient from '../../platwareClientPackage/index';

import * as envProps from '../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(){
    const req = {
      baseUrl: '/register',
      envProps: envProps,
      header:{
        // requesttype : 'PR_PR'
      },
      reqData : 
      {
        "interfaces": {
        },
        "services": {
          "REGISTERAPP": [],
        }
      },
      authToken: '',
      regisToken: ''
    };
    let getResponse = PlatwareClient.prepareRequest(req);
    console.log("register = ", getResponse);

    console.log("aes = ",PlatwareClient.getEncryption('priya','12345'));
    // console.log("getHashvalue =",PlatwareClient.getHashvalue('priya','12345'));
    // console.log("getRSA = ",PlatwareClient.getRSA('priya'));
    
  }
}
