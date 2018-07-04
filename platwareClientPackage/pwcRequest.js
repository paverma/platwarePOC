var props = require('./defaultProps.js');
var dateConversion = require('./dateConversion.js')
var hexByteConversion = require('./hexByteConversion');

var AESEncryption = require('./AESEncryption/PlatwareAES.js');
var Crypto = require('./crypto-js/cryptico.js');
var CryptoJS = require('../node_modules/crypto-js');


preparePwHeader = function (data, deviceid) {
  var _loginId = localStorage.getItem("loginId") ? localStorage.getItem("loginId") : '--';
  var _navigatorData = window.navigator;
  var _services = Object.keys(data.reqData.services).toString();

  var _currentDate = new Date();
  var _currentNounce = _currentDate.getTime();
  var _nounceValue = hexByteConversion.getHexString(_currentDate.getTime().toString());
  
  var _SecurityKey = _currentNounce.toString() + data.envProps.environment.envProps.securityKey;

  var _subString = _SecurityKey.substring(0, 32);

  var _authCryptor = data.envProps.environment.envProps.orgId + "~" + data.envProps.environment.envProps.appId + "~" +
    deviceid + ":app:" + _currentNounce;
  
  var _authEncryptKey = getEncryption(_authCryptor, _subString);

    props.PWRequest.PWHeader.orgid = data.envProps.environment.envProps.orgId;
    props.PWRequest.PWHeader.appid = data.envProps.environment.envProps.appId;
    props.PWRequest.PWHeader.clientid = data.envProps.environment.envProps.orgId + "~"+data.envProps.environment.envProps.appId;

    props.PWRequest.PWHeader.servicename = _services;
    props.PWRequest.PWHeader.loginid = '';
    props.PWRequest.PWHeader.platform = data.envProps.environment.envProps.platform;

    props.PWRequest.PWHeader.authorization = "Basic " + _authEncryptKey;

    if (data.url === '/register' || data.url === '/auth') {
        props.PWRequest.PWHeader.deviceid = deviceid;
        props.PWRequest.PWHeader["nounce"] = _nounceValue;
    }
  var _headerKeys = data.header;
    for (x in _headerKeys) {
        props.PWRequest.PWHeader[x] = _headerKeys[x]
     }

  var _interfacesKeys = data.reqData.interfaces;
    for (x in _interfacesKeys) {
        props.PWRequest.PWBody.interfaces[x] = _interfacesKeys[x]
    }

    console.log("_authEncryptKey",_authEncryptKey)
  var _hashKey = getHashvalue("Basic " + _authEncryptKey, data.envProps.environment.envProps.securityKey);


  // console.log("dateConversion.dataFormat('requestid', _currentDate)",dateConversion.dataFormat('tnxDate', _currentDate));
  // var __tnx = randomString(32- dateConversion.dataFormat('tnxDate', _currentDate).length);
  // console.log("txnKey = ",dateConversion.dataFormat('tnxDate', _currentDate) +__tnx) 
    props.PWRequest.PWHeader.txnkey = '',
    props.PWRequest.PWHeader.requestid = data.envProps.environment.envProps.orgId +
    data.envProps.environment.envProps.appId + deviceid + _loginId + dateConversion.dataFormat('requestid', _currentDate);
    props.PWRequest.PWHeader.username = '',
    props.PWRequest.PWHeader.hash = _hashKey,

    props.PWRequest.PWBody.interfaces.DEVICE_TIMESTAMP = dateConversion.dataFormat('device', _currentDate);
    props.PWRequest.PWBody.interfaces.IMEI_NO = deviceid;
    props.PWRequest.PWBody.interfaces.APPLICATION_VERSION = _navigatorData.appVersion;
    props.PWRequest.PWBody.interfaces.PW_CLIENT_VERSION = "";
    props.PWRequest.PWBody.interfaces.SIM_ID = "";
    props.PWRequest.PWBody.interfaces.OS_VERSION = "";
    props.PWRequest.PWBody.interfaces.DEVICE_MAKE = _navigatorData.platform;
    props.PWRequest.PWBody.interfaces["vendor"] = _navigatorData.vendor;
    props.PWRequest.PWBody.interfaces["appName"] = _navigatorData.appName;

    props.PWRequest.PWBody.interfaces["platform"] = _navigatorData.platform;
    props.PWRequest.PWBody.services = data.reqData.services;
  return props
}

var getEncryption = function (plaintext, randomKey) {
    var a = AESEncryption.cryptor.encryptText(plaintext, randomKey);
    return a;
}
var getDecryption = function (a, randomKey) {
    var b = AESEncryption.cryptor.decryptText(a, randomKey);
    return b;
}
var getHashvalue = function (plaintext, key) {
    var hash = CryptoJS.HmacSHA512(plaintext, key).toString();
    return hash;
}



var randomString = function(length) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i) {
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return result;
  }

module.exports = {
    preparePwHeader
}
