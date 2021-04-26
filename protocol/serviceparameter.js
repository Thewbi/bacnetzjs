class ServiceParameter {
  fromBytes(message, offset) {
    // console.log(
    //   "SParam parsing from message " + message + " at offset " + offset
    // );

    var header = message[offset + 0];

    this.tagClass = (header & 8) >> 3;
    this.applicationTagNumber = (header & 240) >> 4;
    this.lengthValueType = header & 7;

    // console.log("SParam tagClass " + this.tagClass);
    // console.log("SParam applicationTagNumber " + this.applicationTagNumber);
    // console.log("SParam lengthValueType " + this.lengthValueType);

    this.dataSizeInBuffer = this.lengthValueType + 1;

    this.payload = [];

    switch (this.applicationTagNumber) {
      case 2:
        // console.log("UnsignedInteger");

        break;

      case 12:
        // console.log("ObjectIdentifier");
        var data =
          ((message[offset + 1] & 0xff) << 24) |
          ((message[offset + 2] & 0xff) << 16) |
          ((message[offset + 3] & 0xff) << 8) |
          ((message[offset + 4] & 0xff) << 0);

        var objectType = (data & (1023 << 22)) >> 22;
        var bacnetIdentifier = (data & (4194303 << 0)) >> 0;

        console.log("ObjectIdentifier: objectType " + objectType);
        console.log("ObjectIdentifier: bacnetIdentifier " + bacnetIdentifier);

        // copy payload from buffer over into the service parameter
        // this.payload.push(
        //   message.slice(offset + 1, offset + this.lengthValueType + 1)
        // );

        this.payload = message.slice(
          offset + 1,
          offset + this.lengthValueType + 1
        );
        break;

      default:
        // console.log("Unknown SParam");
        break;
    }
  }
}

module.exports = ServiceParameter;
