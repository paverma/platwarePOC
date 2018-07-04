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
      url: '/register',
      envProps: envProps,
      header:{
        requesttype : 'PR_PR'
      },
      reqData : 
      {
        "interfaces": {
        },
        "services": {
          "REGISTERAPP": []
          // "PWSYNCCONFIG": [
          //   {
          //     "org_id": "KOTAK",
          //     "app_id": "KOTAKDO",
          //     "platform": "Android"
          //   }
          // ]
        }
      },
      authToken: '',
      regisToken: ''
    };
    PlatwareClient.logOut();
    // let getResponse = PlatwareClient.prepareRequest(req);
    // console.log("register = ", getResponse);

    // console.log("aes = ",PlatwareClient.getEncryption('priya','12345'));
    // console.log("getHashvalue =",PlatwareClient.getHashvalue('priya','12345'));
    // console.log("getRSA = ",PlatwareClient.getRSA('priya',''));

  let that = this;
    let getResponse1 = PlatwareClient.callPlatware(req, function(data) {
      // let body = data ? JSON.parse(data.body) : {};
      // console.log('callback called',body,data.body);
      console.log("dcsdd.......",data);
      // if(data  === 'success'){
      //   console.log("Welcome")
      // }else{
      //   console.log('error: credentials are wrong');
  
      // }
    });
  }
}
