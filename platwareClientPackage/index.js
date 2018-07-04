var AESEncryption = require('./AESEncryption/PlatwareAES.js');
var Crypto = require('./crypto-js/cryptico.js');
var CryptoJS = require('../node_modules/crypto-js');
var PWCRequest = require('./pwcRequest.js');

var Fingerprint = require('../node_modules/fingerprintjs');

var request = require('../node_modules/request');

var fingerprint = function () {
  return new Fingerprint().get().toString();
}

exports.printMsg1 = function () {
  console.log("This is a message from the demo1 package");
}

exports.prepareRequest = function (data) {
  console.log("prepareRequest =", PWCRequest.preparePwHeader(data, fingerprint()));

}


exports.callPlatware = function (data, callback) {
  var requestData = PWCRequest.preparePwHeader(data, fingerprint())

  // url: 'http://203.112.149.200:443/config/authenticateUser',
  // var options = {
  //   method: 'POST',
  //   url: data.envProps.environment.baseUrl + data.url,
  //   headers: requestData.PWRequest.PWHeader,
  //   body: requestData.PWRequest.PWBody
  // };

  console.log("data.url", data.url)
  switch (data.url) {
    case '/register':
      const xhr = new XMLHttpRequest();

      function request(url) {
        xhr.timeout = 100000;
        xhr.onreadystatechange = function (e) {
          console.log("xhr", xhr)
          // console.log("securityKey=",data.envProps.environment.envProps.securityKey)
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var headers = xhr.getAllResponseHeaders();
              var arr = headers.trim().split(/[\r\n]+/);

              // Create a map of header names to values
              var headerMap = {};
              arr.forEach(function (line) {
                var parts = line.split(': ');
                var header = parts.shift();
                var value = parts.join(': ');
                headerMap[header] = value;
              });
              var contentType = headerMap["hash"];
              var bodyData = JSON.parse(xhr.response);
              var new1 = bodyData.services.REGISTERAPP.records[0].data[0].rsa;
              var new2 = JSON.parse(new1);
              for(key in new2)
{
  localStorageAESPublicKey({
    key: new2[key],
  }, data.envProps.environment.envProps.securityKey);
console.log("valvalval", key)
}
              console.log("new1",new1, )
              // console.log("xhr====", bodyData.services,
              //   headers, headerMap, contentType)

              // localStorageAESPublicKey({
              //   "public-exponent": "",
              //   "private-modules": "value",
              //   "public-modules": "value",
              //   "private-exponent": "value"
              // }, data.envProps.environment.envProps.securityKey);


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
        // console.log("requestData.PWRequest.PWHeader", JSON.stringify(requestData.PWRequest.PWHeader))
        xhr.open('POST', data.envProps.environment.baseUrl + data.url, true)
        for (var key in requestData.PWRequest.PWHeader) {
          xhr.setRequestHeader(key, requestData.PWRequest.PWHeader[key]);
        }
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(requestData.PWRequest.PWBody));
      }
      console.log("requestData ====", requestData)
      request();

      break;

    case '/auth':

      break;

    case '/logout':

      break;

  }

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




  // function httpAuthentication(error, response, body) {

  //   if (!error && response.statusCode == 200) {
  //     callback(response);
  //     var info = JSON.parse(body);
  //   } else {
  //     callback(response);
  //     console.log("get error")
  //   }
  // }
  // request(options, httpAuthentication);

}


var localStorageAESPublicKey = function (data, key) {
  var obj = {};
  for (var keyValue in data) {
    obj[keyValue] = AESEncryption.cryptor.encryptText(data[keyValue], key);
  }
  localStorage.setItem("key", JSON.stringify(obj))
  console.log("data, key",data, key,JSON.stringify(obj))
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

function hmac_512(message, secret) {
  var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA512, secret);
  hmac.update(message);
  var hash = hmac.finalize();
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
