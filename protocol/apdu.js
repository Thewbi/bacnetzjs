const ServiceParameter = require("./serviceparameter.js");
const PDUType = require("./pdutype.js");

class APDU {
  constructor() {
    this.invokeId = -1;
    this.sequenceNumber = -1;
    this.proposedWindowSize = -1;
    this.segmentedResponseAccepted = false;
    /**
     * upper nibble = max response segments accepted <br />
     * <br />
     * lower nibble = size of maximum apdu accepted
     *
     * <pre>
     * //        outApdu.setMaxResponseSegmentsAccepted(30);
     * outApdu.setMaxResponseSegmentsAccepted(16);
     *
     * // binary 0000b (0d) - MinimumMessageSize (50 Octets)
     * // binary 0001b (1d) - MinimumMessageSize (128 Octets)
     * // binary 0010b (2d) - MinimumMessageSize (206 Octets)
     * // binary 0011b (3d) - MinimumMessageSize (480 Octets)
     * // binary 0100b (4d) - MinimumMessageSize (1024 Octets)
     * // binary 0101b (5d) - MinimumMessageSize (1476 Octets)
     * outApdu.setSizeOfMaximumAPDUAccepted(5);
     * </pre>
     *
     * As a default use a max response segments accepted of 16 and maximum ADPU size
     * accepted of (1476 Octets) (= 5d)
     */
    this.segmentationControl = (16 << 4) | 5;
    this.unconfirmedServiceChoice = null;
    this.confirmedServiceChoice = null;
    this.serviceParameters = [];
  }

  get bytes() {
    let offset = 0;

    var data = Buffer.alloc(this.dataSizeInBufferWithoutServiceParameters);

    let index = 0;

    // 1 Byte: APDU Type and APDU Flags
    let apduTypeAndFlags = this.pduType;
    apduTypeAndFlags <<= 4;
    apduTypeAndFlags |= this.segmentedResponseAccepted ? 0x02 : 0x00; // when missing -> abort:
    // segmentation-not-supported
    //data[offset + index++] = (byte) (apduTypeAndFlags & 0xFF);
    data.writeUInt8(apduTypeAndFlags & 0xff, offset + index++);

    // 1 Byte: segmentation information
    if (
      this.segmentedResponseAccepted ||
      this.pduType == PDUType.CONFIRMED_SERVICE_REQUEST_PDU
    ) {
      //data[offset + index++] = (byte) (this.segmentationControl & 0xFF);
      data.writeUInt8(this.segmentationControl & 0xff, offset + index++);
    }

    // 1 Byte: invoke ID
    if (this.invokeId >= 0) {
      //data[offset + index++] = (byte) this.invokeId;
      data.writeUInt8(this.invokeId, offset + index++);
    }

    // 1 Byte: sequence number
    if (this.sequenceNumber >= 0) {
      //data[offset + index++] = (byte) this.sequenceNumber;
      data.writeUInt8(this.sequenceNumber, offset + index++);
    }

    // 1 Byte: proposed window size
    if (this.proposedWindowSize >= 0) {
      //data[offset + index++] = (byte) this.proposedWindowSize;
      data.writeUInt8(this.proposedWindowSize, offset + index++);
    }

    // 1 Byte: service choice
    if (this.unconfirmedServiceChoice != null) {
      //data[offset + index++] = (byte) this.unconfirmedServiceChoice.getId();
      data.writeUInt8(this.unconfirmedServiceChoice, offset + index++);
    } else if (this.confirmedServiceChoice != null) {
      //data[offset + index++] = (byte) this.confirmedServiceChoice.getId();
      data.writeUInt8(this.confirmedServiceChoice, offset + index++);
    } else {
      throw "Either confirmedServiceChoice or unconfirmedServiceChoice is required!";
    }

    // service parameters (such as ObjectIdentifierServiceParameter)
    if (this.serviceParameters.length > 0) {
      for (let i = 0; i < this.serviceParameters.length; i++) {
        let serviceParameter = this.serviceParameters[i];
        let serviceParameterBuffer = serviceParameter.bytes;
        data = Buffer.concat([data, serviceParameterBuffer]);
      }
    }

    return data;
  }

  fromBytes(message, offset) {
    // console.log(
    //   "APDU parsing from message " + message + " at offset " + offset
    // );

    // save original offset for later size computation, initialize current position
    this.offset = offset;
    this.currentPosition = offset;

    // parse type
    this.pduType = message[offset + 0];
    this.currentPosition++;

    this.pduType = (this.pduType & 240) >> 4;

    // parse service choice
    this.unconfirmedServiceChoice = message[offset + 1];
    this.currentPosition++;

    //console.log("APDU pduType " + this.pduType);
    //console.log("APDU unconfirmedServiceChoice " + this.unconfirmedServiceChoice);

    this.serviceParameters = [];

    // read ServiceParameters until the end of the buffer
    while (this.currentPosition < message.length) {
      var serviceParameter = new ServiceParameter();

      this.serviceParameters.push(serviceParameter);

      serviceParameter.fromBytes(message, this.currentPosition);
      this.currentPosition += serviceParameter.dataSizeInBuffer;
    }
  }

  get dataSizeInBufferWithoutServiceParameters() {
    let dataLength = 0;

    // 1 byte: PDU type + PDU flags
    dataLength++;

    if (
      this.segmentedResponseAccepted ||
      this.pduType == PDUType.CONFIRMED_SERVICE_REQUEST_PDU
    ) {
      dataLength++;
    }

    // invoke id
    if (this.invokeId >= 0) {
      dataLength++;
    }

    // 1 Byte: sequence number
    if (this.sequenceNumber >= 0) {
      dataLength++;
    }

    // 1 Byte: proposed window size
    if (this.proposedWindowSize >= 0) {
      dataLength++;
    }

    // service choice
    if (
      this.unconfirmedServiceChoice != null ||
      this.confirmedServiceChoice != null
    ) {
      dataLength++;
    }

    //   if (!withoutServiceParameters) {
    //     if (this.serviceParameters.length > 0) {
    //       // service parameters
    //       for (let i = 0; i < this.serviceParameters.length; i++) {
    //         let serviceParameter = this.serviceParameters[i];
    //         let tempDataLength = serviceParameter.dataSizeInBuffer;
    //         dataLength += tempDataLength;
    //       }
    //     }
    //   }

    return dataLength;
  }

  get dataSizeInBuffer() {
    let dataLength = this.dataSizeInBufferWithoutServiceParameters;

    if (this.serviceParameters.length > 0) {
      // service parameters
      for (let i = 0; i < this.serviceParameters.length; i++) {
        let serviceParameter = this.serviceParameters[i];
        let tempDataLength = serviceParameter.dataSizeInBuffer;
        dataLength += tempDataLength;
      }
    }

    return dataLength;
  }
}

module.exports = APDU;
