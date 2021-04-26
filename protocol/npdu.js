class NPDU {
  fromBytes(message, offset) {
    // console.log(
    //   "NPDU parsing from message " + message + " at offset " + offset
    // );

    this.version = message[offset + 0];
    this.control = message[offset + 1];
    this.destinationNetwork =
      ((message[offset + 2] & 0xff) << 8) | (message[offset + 3] & 0xff);
    this.destinationMACLayerAddressLength = message[offset + 4];
    this.hopCount = message[offset + 5];

    // console.log("NPDU version " + this.version);
    // console.log("NPDU control " + this.control);
    // console.log("NPDU destinationNetwork " + this.destinationNetwork);
    // console.log(
    //   "NPDU destinationMACLayerAddressLength " +
    //     this.destinationMACLayerAddressLength
    // );
    // console.log("NPDU hopCount " + this.hopCount);
  }

  get dataSizeInBuffer() {
    return 6;
  }
}

module.exports = NPDU;
