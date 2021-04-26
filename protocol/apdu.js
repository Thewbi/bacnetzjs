const ServiceParameter = require("./serviceparameter.js");

class APDU {
  fromBytes(message, offset) {
    // console.log(
    //   "APDU parsing from message " + message + " at offset " + offset
    // );

    // save original offset for later size computation, initialize current position
    this.offset = offset;
    this.currentPosition = offset;

    // parse type
    this.type = message[offset + 0];
    this.currentPosition++;

    this.type = (this.type & 240) >> 4;

    // parse service choice
    this.serviceChoice = message[offset + 1];
    this.currentPosition++;

    //console.log("APDU type " + this.type);
    //console.log("APDU serviceChoice " + this.serviceChoice);

    this.serviceParameters = [];

    // read ServiceParameters until the end of the buffer
    while (this.currentPosition < message.length) {
      var serviceParameter = new ServiceParameter();

      this.serviceParameters.push(serviceParameter);

      serviceParameter.fromBytes(message, this.currentPosition);
      this.currentPosition += serviceParameter.dataSizeInBuffer;
    }
  }

  get dataSizeInBuffer() {
    return this.currentPosition - this.offset;
  }
}

module.exports = APDU;
