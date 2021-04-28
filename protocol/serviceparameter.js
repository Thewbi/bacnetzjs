const TagClass = require("./tagclass.js");
const ServiceParameterConstants = require("./serviceparameterconstants.js");

class ServiceParameter {
  constructor() {
    this.tagClass = -1;
    this.applicationTagNumber = -1;
    this.lengthValueType = -1;
    //this.dataSizeInBufferInternal = 0;
    this.tagNumber = 0;
    this.payload = null;
  }

  get bytes() {
    var data = Buffer.alloc(this.dataSizeInBuffer);

    let index = 0;
    let offset = 0;

    // the application tag is a byte that encodes the information type of this
    // service parameter, the type of this service parameter (Application or context
    // specific) and the length of the payload inside this service parameter
    let applicationTag =
      (this.tagNumber << 4) | (this.tagClass << 3) | this.lengthValueType;
    //data[offset + index++] = (byte) applicationTag;
    data.writeUInt8(applicationTag & 0xff, offset + index++);

    // copy the payload in
    //if (ArrayUtils.isNotEmpty(payload)) {
    if (this.payload != null) {
      // for extended values, preface the actual payload with the payload's length
      if (this.lengthValueType == ServiceParameter.EXTENDED_VALUE) {
        //data[offset + index++] = byte(payload.length);
        data.writeUInt8(this.payload.length & 0xff, offset + index++);
      }

      //System.arraycopy(payload, 0, data, offset + index, payload.length);
      //data = Buffer.concat([data, this.payload]);
      for (let i = 0; i < this.payload.length; i++) {
        data.writeUInt8(this.payload.readUInt8(i), i + 1);
      }
      index += this.payload.length;
    }

    return data;
  }

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

    //this.dataSizeInBuffer = this.lengthValueType + 1;

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

        //console.log("ObjectIdentifier: objectType " + objectType);
        //console.log("ObjectIdentifier: bacnetIdentifier " + bacnetIdentifier);

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

  get dataSizeInBuffer() {
    if (this.tagClass == TagClass.CONTEXT_SPECIFIC_TAG) {
      if (
        this.lengthValueType == ServiceParameterConstants.OPENING_TAG_CODE ||
        this.lengthValueType == ServiceParameterConstants.CLOSING_TAG_CODE
      ) {
        return 1;
      }
    } else if (this.tagClass == TagClass.APPLICATION_TAG) {
      if (this.lengthValueType == ServiceParameter.EXTENDED_VALUE) {
        return this.payload.length + 2;
      } else if (
        this.messageType != null &&
        this.messageType == MessageType.BOOLEAN
      ) {
        return 1;
      }
    }

    return this.lengthValueType + 1;
  }

  //   set dataSizeInBuffer(dataSizeInBuffer) {
  //     this.dataSizeInBufferInternal = dataSizeInBuffer;
  //   }
}

module.exports = ServiceParameter;
