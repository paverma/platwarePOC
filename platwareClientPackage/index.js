
var AESEncryption = require('./AESEncryption/PlatwareAES.js');
var Crypto = require('./crypto-js/cryptico.js');
var CryptoJS = require('../node_modules/crypto-js');
var PWCRequest = require('./pwcRequest.js');

var Fingerprint = require('../node_modules/fingerprintjs');

var fingerprint = function () {
  return new Fingerprint().get().toString();
}

exports.printMsg1 = function () {
  console.log("This is a message from the demo1 package");
}

exports.prepareRequest = function(data){

  console.log("prepareRequest =",PWCRequest.preparePwHeader(data,fingerprint()));
}

exports.getEncryption = function(plaintext,randomKey){
  // var randomKey = '18062911052582006609007567706159';
  var a=AESEncryption.cryptor.encryptText(plaintext,randomKey);
  return a;   
}

exports.getDecryption = function(a,randomKey){
  // var randomKey = '18062911052582006609007567706159';
  var b=AESEncryption.cryptor.decryptText(a, randomKey);
  return b;
}

exports.getHashvalue = function(plaintext,key){
  var hash= CryptoJS.HmacSHA512(plaintext,key).toString();
  return hash;
}

function hmac_512(message, secret) { 
  var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA512, secret); 
  hmac.update(message); var hash = hmac.finalize(); 
  return hash; 
}


exports.getRSA = function(plaintext){
  var PassPhrase = "The Moon is a Harsh Mistress.";
       var Bits = 512;
       
       var MattsRSAkey = Crypto.cryptico.generateRSAKey(PassPhrase, Bits);
       var MattsPublicKeyString = Crypto.cryptico.publicKeyString(MattsRSAkey);       
       
       console.log("Matt's public key string:",MattsPublicKeyString);
       console.log("message: " , plaintext);
       
       var EncryptionResult = Crypto.cryptico.encrypt(plaintext, MattsPublicKeyString);
       
       console.log("The encrypted message:",EncryptionResult.cipher);
       
       var DecryptionResult = Crypto.cryptico.decrypt(EncryptionResult.cipher, MattsRSAkey);
       
       console.log("The decrypted message:",DecryptionResult.plaintext);
       console.log("DecryptionResult.signature: " + DecryptionResult.signature);
}