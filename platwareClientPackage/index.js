var AESEncryption = require('./AESEncryption/PlatwareAES.js');
var Crypto = require('./crypto-js/cryptico.js');
var CryptoJS = require('../node_modules/crypto-js');
var PWCRequest = require('./pwcRequest.js');

var Fingerprint = require('../node_modules/fingerprintjs');

var fingerprint = function () {
  return new Fingerprint().get().toString();
}

exports.prepareRequest = function (data) {
  console.log("prepareRequest =", PWCRequest.preparePwHeader(data, fingerprint()));
}

exports.callPlatware = function (data, callback) {
  var requestData = PWCRequest.preparePwHeader(data, fingerprint())

  switch (data.url) {
    case '/register':
      const xhr = new XMLHttpRequest();
      function request1() {
        xhr.timeout = 100000;
        xhr.onreadystatechange = function (e) {
          console.log("xhr", xhr.getAllResponseHeaders())

          if (xhr.readyState === 4) {
            if (xhr.status === 200) {

              var bodyData = JSON.parse(xhr.response);
              var new1 = bodyData.services.REGISTERAPP.records[0].data[0].rsa;
              var new2 = JSON.parse(new1);
              localStorageAESPublicKey(new2, data.envProps.environment.envProps.securityKey);
              // console.log("new1", new1, )

              callback(xhr.response);
              console.log("Code here for the server answer when successful")
              // Code here for the server answer when successful
            }
          }
        }
        xhr.onerror = function (error) {
          console.log("Code here for the server answer when not successful")
          callback(error);
        }
        xhr.ontimeout = function () {
          callback(xhr);
          console.log("ontimeout")
          // Well, it took to long do some code here to handle that
        }
        xhr.open('POST', data.envProps.environment.baseUrl + data.url, true)
        for (var key in requestData.PWRequest.PWHeader) {
          xhr.setRequestHeader(key, requestData.PWRequest.PWHeader[key]);
        }
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(requestData.PWRequest.PWBody));
      }
      console.log("requestData ====", requestData)
      request1();

      break;

    case '/auth':

  // function request(url) {
  //   const xhr = new XMLHttpRequest();
  //   xhr.timeout = 60000;
  //   xhr.onreadystatechange = function (e) {
  //     console.log("xhr", xhr)
  //     if (xhr.readyState === 4) {
  //       if (xhr.status === 200) {
  //         callback(xhr.status);
  //         console.log("Code here for the server answer when successful")
  //         // Code here for the server answer when successful
  //       }
  //     }
  //   }
  //   xhr.onerror = function (error) {
  //     console.log("Code here for the server answer when not successful")
  //     callback(error);
  //   }
  //   xhr.ontimeout = function () {
  //     callback(xhr);
  //     console.log("ontimeout")
  //     // Well, it took to long do some code here to handle that
  //   }
  //   console.log("requestData.PWRequest.PWHeader", JSON.stringify(requestData.PWRequest.PWHeader))
  //   xhr.open('POST', 'http://192.168.1.67:9002/router/engine/v1/register', true)
  //   console.log("requestData.PWRequest.PWBody", requestData.PWRequest.PWHeader)
  //   for (var key in requestData.PWRequest.PWHeader) {
  //     xhr.setRequestHeader(key, requestData.PWRequest.PWHeader[key]);
  //   }
  //   xhr.send(JSON.stringify(requestData.PWRequest.PWBody));
  // }

  // request();
      break;

    case '/logout':

      break;

  }

}


var localStorageAESPublicKey = function (data, key) {
  var obj = {};
  for (var keyValue in data) {
    obj[keyValue] = AESEncryption.cryptor.encryptText(data[keyValue], key);
  }
  localStorage.setItem("Publickey", JSON.stringify(obj))
}

exports.getEncryption = function (plaintext, randomKey) {
  var a = AESEncryption.cryptor.encryptText(plaintext, randomKey);
  return a;
}

exports.getDecryption = function (a, randomKey) {
  var b = AESEncryption.cryptor.decryptText(a, randomKey);
  return b;
}

exports.getHashvalue = function (plaintext, key) {
  var hash = CryptoJS.HmacSHA512(plaintext, key).toString();
  return hash;
}

exports.getRSA = function (plaintext, publicKey) {
  var PassPhrase = "The Moon is a Harsh Mistress.";
  var Bits = 512;

  var MattsRSAkey = Crypto.cryptico.generateRSAKey(PassPhrase, Bits);
  var MattsPublicKeyString = Crypto.cryptico.publicKeyString(MattsRSAkey);

  console.log("Matt's public key string:", MattsPublicKeyString);
  console.log("message: ", plaintext);

  var EncryptionResult = Crypto.cryptico.encrypt(plaintext, MattsPublicKeyString);

  console.log("The encrypted message:", EncryptionResult.cipher);

  var DecryptionResult = Crypto.cryptico.decrypt(EncryptionResult.cipher, MattsRSAkey);

  console.log("The decrypted message:", DecryptionResult.plaintext);
}


exports.logOut = function () {
  localStorage.removeItem('authToken', "authToken");
  // localStorage.removeItem('JWTToken', "JWTToken");
  // localStorage.removeItem('publicKey', "publicKey");
  localStorage.removeItem('loginId', "loginId");
  localStorage.removeItem('username', "username");
}
