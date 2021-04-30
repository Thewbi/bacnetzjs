// https://stackoverflow.com/questions/34309988/byte-array-to-hex-string-conversion-in-javascript
function byteArrayToHexString(byteArray) {
  return Array.from(byteArray, function (byte) {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");
}

module.exports = { byteArrayToHexString };
