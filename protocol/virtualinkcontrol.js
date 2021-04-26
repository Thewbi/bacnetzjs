// https://stackoverflow.com/questions/6998355/including-javascript-class-definition-from-another-file-in-node-js

class VirtualLinkControl {
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
}

module.exports = VirtualLinkControl;
