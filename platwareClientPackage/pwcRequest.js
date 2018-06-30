var props = require('./defaultProps.js');
var dateConversion = require('./dateConversion.js')

preparePwHeader = function (data, deviceid) {
console.log("ssssssssssssss",Object.keys(data.header).length)
  var navigatorData = window.navigator;
  var services = Object.keys(data.reqData.services).toString();

  props.PWRequest.PWHeader.orgid = data.envProps.environment.envProps.orgId;
  props.PWRequest.PWHeader.appid = data.envProps.environment.envProps.appId;
  props.PWRequest.PWHeader.clientid = data.envProps.environment.envProps.clientId;

  props.PWRequest.PWHeader.servicename = services;
  props.PWRequest.PWHeader.loginid = '',
  props.PWRequest.PWHeader.deviceid = '',
  props.PWRequest.PWHeader.platform = data.envProps.environment.envProps.platform,
  props.PWRequest.PWHeader.authorization = '',

  headerKeys = data.header;
  for (x in headerKeys) {
      props.PWRequest.PWHeader[x] = headerKeys[x]
  }
  
//   props.PWRequest.PWHeader.requesttype = PR_PR,
  props.PWRequest.PWHeader.txnkey = '',
  props.PWRequest.PWHeader.requestid = '',
  props.PWRequest.PWHeader.username = '',
  props.PWRequest.PWHeader.hash = '',



  props.PWRequest.PWBody.interfaces.DEVICE_TIMESTAMP = dateConversion.dataFormat();
  props.PWRequest.PWBody.interfaces.IMEI_NO = deviceid;
  props.PWRequest.PWBody.interfaces.APPLICATION_VERSION = navigatorData.appVersion;
  props.PWRequest.PWBody.interfaces.PW_CLIENT_VERSION = "";
  props.PWRequest.PWBody.interfaces.SIM_ID = "";
  props.PWRequest.PWBody.interfaces.OS_VERSION = "";
  props.PWRequest.PWBody.interfaces.DEVICE_MAKE = navigatorData.platform;
  props.PWRequest.PWBody.interfaces["vendor"] = navigatorData.vendor;
  props.PWRequest.PWBody.interfaces["appName"] = navigatorData.appName;

  props.PWRequest.PWBody.interfaces["platform"] = navigatorData.platform;
  // props.PWRequest.PWBody.services = reqBody.services;
  return props
}


module.exports = {
  preparePwHeader
}













// var hexString = require('./hexString');
// // var CryptoJS = require('../crypto-js/crypto-js');

// var AESEncryption = require('./AESEncryption/PlatwareAES.js');


// var CryptoJS = require('../tpg-admin-portal/node_modules/crypto-js');





// var PWRequest = {
//     "PWHeader": {
//         "loginid": "",
//         "clientid": "",
//         "deviceid": "",
//         "platform": "WEB",
//         "orgid": "",
//         "authorization": "",
//         "requesttype": "PR_PR",
//         "txnkey": "",
//         "requestid": "",
//         "appid": "",
//         "servicename": "",
//         "username": "",
//         "hash": "",
//     },
//     "PWBody": {
//         "interfaces": {
//             "APPLICATION_VERSION": "",
//             "DEVICE_TIMESTAMP": "",
//             "PW_CLIENT_VERSION": "",
//             "SIM_ID": "",
//             "OS_VERSION": "",
//             "IMEI_NO": "",
//             "DEVICE_MAKE": "",
//             "DEVICE_MODEL": "",
//             "PW_VERSION": ""
//         },
//         "services": {}
//     }
// }

// var hashData = 'priya'

// var txnkey = "12345";

// var preparePwHeader = function (data, fingerprint) {
//     console.log("hashData",getHashvalue(hashData, txnkey))
//     var navigatorData = window.navigator;
//     var environment = data.environment;
//     var reqBody = data.reqData;
//     var url = data.baseUrl;
//     var currentDate = new Date();
//     var currentNounce = currentDate.getTime();
//     var nounceValue = hexString.getHexString(currentDate.getTime().toString());

//     var SecurityKey = currentNounce.toString() + environment.envProps.key;
//     console.log("SecurityKey", SecurityKey);
//     console.log("currentNounce", currentNounce);
//     console.log("nounceValue", nounceValue);

//     var subString = SecurityKey.substring(0, 32);

//     var authCryptor = environment.envProps.orgId + "~" + environment.envProps.appId + "~" +
//      fingerprint + ":" + "app" + ":" +
//     currentNounce;
//     console.log("authCryptor", authCryptor, "subString", subString);
//     var authEncryptKey = getEncryption(authCryptor, subString);

//     console.log("authCryptor encry=", authEncryptKey);



//     console.log("priya encry=", getEncryption("priya", subString));


//     // console.log("authCryptor decry=", getDecryption(authEncryptKey, subString));

//     var hashKey = getHashvalue("Basic " + authEncryptKey, environment.envProps.key);
//     console.log("hashKey=", hashKey);
//     console.log("reqBody", reqBody.services, Object.keys(reqBody.services).toString())
//     var services = Object.keys(reqBody.services).toString();
//     PWRequest.PWHeader.orgid = environment.envProps.orgId;
//     PWRequest.PWHeader.appid = environment.envProps.appId;
//     PWRequest.PWHeader.clientid = environment.envProps.clientId;
//     if (url != '/gatway') {
//         PWRequest.PWHeader.deviceid = fingerprint;
//         PWRequest.PWHeader["nounce"] = nounceValue;
//     }
//     PWRequest.PWHeader.authorization = "Basic " + authEncryptKey;
//     PWRequest.PWHeader.hash = hashKey;
//     PWRequest.PWHeader.servicename = services;
//     PWRequest.PWHeader.txnkey = '';
//     PWRequest.PWHeader.requestid = environment.envProps.orgId + 
//     environment.envProps.appId + fingerprint + "--" + currentDate.getTime();


//     PWRequest.PWBody.interfaces.DEVICE_TIMESTAMP = dataFormat();

//     PWRequest.PWBody.interfaces.IMEI_NO = fingerprint;


//     PWRequest.PWBody.interfaces.APPLICATION_VERSION = navigatorData.appVersion;
//     PWRequest.PWBody.interfaces.PW_CLIENT_VERSION = "";
//     PWRequest.PWBody.interfaces.SIM_ID = "";
//     PWRequest.PWBody.interfaces.OS_VERSION = "";
//     PWRequest.PWBody.interfaces.DEVICE_MAKE = navigatorData.platform;
//     PWRequest.PWBody.interfaces["vendor"] = navigatorData.vendor;
//     PWRequest.PWBody.interfaces["appName"] = navigatorData.appName;

//     PWRequest.PWBody.interfaces["platform"] = navigatorData.platform;
//     PWRequest.PWBody.services = reqBody.services;


//     return PWRequest;
// }


// var getEncryption = function (plaintext, randomKey) {
//     var a = AESEncryption.cryptor.encryptText(plaintext, randomKey);
//     return a;
// }
// var getDecryption = function (a, randomKey) {
//     var b = AESEncryption.cryptor.decryptText(a, randomKey);
//     return b;
// }

// var getHashvalue = function (plaintext, key) {
//     var hash = CryptoJS.HmacSHA512(plaintext, key).toString();
//     return hash;
// }



// module.exports = {
//     preparePwHeader: preparePwHeader,
// }
