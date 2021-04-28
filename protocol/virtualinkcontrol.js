// https://stackoverflow.com/questions/6998355/including-javascript-class-definition-from-another-file-in-node-js

class VirtualLinkControl {
  constructor() {
    this.type = -1;
    this.function = -1;
    this.length = 0;
  }
  get bytes() {
    let offset = 0;

    var data = Buffer.alloc(4);
    data.writeUInt8(this.type, offset++);
    data.writeUInt8(this.function, offset++);
    data.writeUInt16BE(this.length, offset++);

    return data;
  }

  fromBytes(message, offset) {
    // console.log("VLC parsing from message " + message + " at offset " + offset);

    this.type = message[offset + 0];
    this.function = message[offset + 1];
    this.length =
      ((message[offset + 2] & 0xff) << 8) | (message[offset + 3] & 0xff);

    // console.log("VLC type " + this.type);
    // console.log("VLC function " + this.function);
    // console.log("VLC length " + this.length);
  }

  get dataSizeInBuffer() {
    return 4;
  }
  get dataLength() {
    //return this.dataSizeInBuffer;
    return 4;
  }
}

module.exports = VirtualLinkControl;
