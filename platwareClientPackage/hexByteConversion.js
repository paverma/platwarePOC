
var getHexString = function (value) {
    var byteArray = [];
    for (var i = 0; i < value.length; i++) {
        byteArray.push(value.charCodeAt(i));
    }
    var value = toHexString(byteArray);
    return value;
}

var toHexString = function (byteArray) {
    return Array.from(byteArray, function (byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
}

module.exports = {
    getHexString : getHexString
}