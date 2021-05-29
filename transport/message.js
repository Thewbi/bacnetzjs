const VirtualLinkControl = require("../protocol/virtualinkcontrol.js");
const NPDU = require("../protocol/npdu.js");
const APDU = require("../protocol/apdu.js");
const PDUType = require("../protocol/pdutype.js");
const UnconfirmedServiceChoice = require("../protocol/unconfirmedservicechoice.js");

const util = require("../common/util.js");

class Message {
  get dataLength() {
    let dataLength = 0;

    if (this.virtualLinkControl != null) {
      dataLength += this.virtualLinkControl.dataSizeInBuffer;
    }
    if (this.npdu != null) {
      dataLength += this.npdu.dataSizeInBuffer;
    }
    if (this.apdu != null) {
      dataLength += this.apdu.dataSizeInBuffer;
    }

    return dataLength;
  }

  parseServiceParameters() {
    if (this.apdu == null) {
      return;
    }

    this.apdu.parseServiceParameters();
  }

  get bytes() {
    let length = 0;

    let virtualLinkControlDataLength = 0;
    let npduDataLength = 0;
    let apduDataLength = 0;

    if (this.virtualLinkControl != null) {
      virtualLinkControlDataLength = this.virtualLinkControl.dataSizeInBuffer;

      length += virtualLinkControlDataLength;
    }

    if (this.npdu != null) {
      npduDataLength = this.npdu.dataSizeInBuffer;

      length += npduDataLength;
    }

    if (this.apdu != null) {
      apduDataLength = this.apdu.dataSizeInBuffer;

      length += apduDataLength;
    }

    // https://nodejs.org/en/knowledge/advanced/buffers/how-to-use-buffers/
    var data = Buffer.alloc(0);

    if (this.virtualLinkControl != null) {
      let tempBuffer = this.virtualLinkControl.bytes;
      data = Buffer.concat([data, tempBuffer]);
    }

    if (this.npdu != null) {
      let tempBuffer = this.npdu.bytes;
      data = Buffer.concat([data, tempBuffer]);
    }

    if (this.apdu != null) {
      let tempBuffer = this.apdu.bytes;
      data = Buffer.concat([data, tempBuffer]);
    }

    //var arrByte = Uint8Array.from(data);
    console.log("getBytes() " + util.byteArrayToHexString(data));

    return data;
  }

  get asString() {
    var output = "[Message] ";

    output += "APDU: " + this.apdu.asString + " ";

    // retrieve type of message from APDU
    switch (this.apdu.pduType) {
      case PDUType.PDUType.UNCONFIRMED_SERVICE_REQUEST_PDU:
        // unconfirmed request

        switch (this.apdu.unconfirmedServiceChoice) {
          case UnconfirmedServiceChoice.UnconfirmedServiceChoice.I_AM:
            output += "I-AM ";

            this.apdu.parseServiceParameters();

            // output object identifier
            var payload = this.apdu.serviceParameters[0].payload;

            var data =
              ((payload[0] & 0xff) << 24) |
              ((payload[1] & 0xff) << 16) |
              ((payload[2] & 0xff) << 8) |
              ((payload[3] & 0xff) << 0);

            var objectType = (data & (1023 << 22)) >> 22;
            var bacnetIdentifier = (data & (4194303 << 0)) >> 0;

            output += "objectType: ";
            output += objectType;
            output += " bacnetIdentifier: ";
            output += bacnetIdentifier;

            break;

          case UnconfirmedServiceChoice.UnconfirmedServiceChoice.WHO_IS:
            output += "WHO-IS, dataLength = " + this.dataLength;
            break;

          default:
            output +=
              "Unknown UnconfirmedServiceChoice: " +
              this.apdu.unconfirmedServiceChoice +
              " ";
            break;
        }
        break;

      case PDUType.PDUType.SIMPLE_ACK_PDU:
        output += "SIMPLE_ACK_PDU ";
        break;

      case PDUType.PDUType.COMPLEX_ACK_PDU:
        output += "COMPLEX_ACK_PDU ";
        break;

      default:
        output += "Unknown PDUType: " + this.apdu.pduType;
        break;
    }

    return output;
  }
}

module.exports = Message;
