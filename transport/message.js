const VirtualLinkControl = require("../protocol/virtualinkcontrol.js");
const NPDU = require("../protocol/npdu.js");
const APDU = require("../protocol/apdu.js");
const PDUType = require("../protocol/pdutype.js");

class Message {
  get dataLength() {
    let dataLength = 0;

    if (this.virtualLinkControl != null) {
      //   dataLength += this.virtualLinkControl.dataLength;
      dataLength += this.virtualLinkControl.dataSizeInBuffer;
    }
    if (this.npdu != null) {
      //dataLength += this.npdu.dataLength;
      dataLength += this.npdu.dataSizeInBuffer;
    }
    if (this.apdu != null) {
      //dataLength += this.apdu.dataLength;
      dataLength += this.apdu.dataSizeInBuffer;
    }

    return dataLength;
  }

  get bytes() {
    let length = 0;

    let virtualLinkControlDataLength = 0;
    let npduDataLength = 0;
    let apduDataLength = 0;

    if (this.virtualLinkControl != null) {
      virtualLinkControlDataLength = this.virtualLinkControl.dataSizeInBuffer;
      //LOG.trace("VirtualLinkControl.getDataLenght() {}", virtualLinkControlDataLength);

      length += virtualLinkControlDataLength;
    }

    if (this.npdu != null) {
      npduDataLength = this.npdu.dataSizeInBuffer;
      //LOG.trace("NPDU.getDataLenght() {}", npduDataLength);

      length += npduDataLength;
    }

    if (this.apdu != null) {
      apduDataLength = this.apdu.dataSizeInBuffer;
      //LOG.trace("APDU.getDataLenght() {}", apduDataLength);

      length += apduDataLength;
    }

    // https://nodejs.org/en/knowledge/advanced/buffers/how-to-use-buffers/
    //final byte[] data = new byte[length];
    var data = Buffer.alloc(0);

    //let offset = 0;

    if (this.virtualLinkControl != null) {
      //virtualLinkControl.toBytes(data, offset);
      //offset += virtualLinkControlDataLength;

      let tempBuffer = this.virtualLinkControl.bytes;
      data = Buffer.concat([data, tempBuffer]);
    }

    if (this.npdu != null) {
      //   npdu.toBytes(data, offset);
      //   offset += npduDataLength;

      let tempBuffer = this.npdu.bytes;
      data = Buffer.concat([data, tempBuffer]);
    }

    if (this.apdu != null) {
      //   apdu.toBytes(data, offset);
      //   offset += apduDataLength;

      let tempBuffer = this.apdu.bytes;
      data = Buffer.concat([data, tempBuffer]);
    }

    var arrByte = Uint8Array.from(data);
    //console.log(arrByte);

    return data;
  }

  get asString() {
    var output = "[Message] ";

    output += "APDU: " + this.apdu.asString + " ";

    // retrieve type of message from APDU
    switch (this.apdu.pduType) {
      case PDUType.UNCONFIRMED_SERVICE_REQUEST_PDU:
        // unconfirmed request

        switch (this.apdu.unconfirmedServiceChoice) {
          case UnconfirmedServiceChoice.I_AM:
            output += "I-AM ";

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

          case UnconfirmedServiceChoice.WHO_IS:
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

      case PDUType.COMPLEX_ACK_PDU:
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
