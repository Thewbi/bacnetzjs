const ServiceParameter = require("./serviceparameter.js").ServiceParameter;
const PDUType = require("./pdutype.js");
const UnconfirmedServiceChoice =
  require("./UnconfirmedServiceChoice.js").UnconfirmedServiceChoice;
const unconfirmedServiceChoiceGetLabel =
  require("./UnconfirmedServiceChoice.js").getLabel;
const confirmedServiceChoiceGetLabel =
  require("./ConfirmedServiceChoice.js").getLabel;
const ErrorClass = require("./errorclass.js");
const ErrorCode = require("./errorcode.js");
const util = require("../common/util.js");

class APDU {
  constructor() {
    this.pduType = -1;
    this.invokeId = -1;
    this.sequenceNumber = -1;
    this.proposedWindowSize = -1;
    //this.segmentedResponseAccepted = false;
    this.segmentedResponseAccepted = true;
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
    this.segmentationControl = (7 << 4) | 5;

    this.unconfirmedServiceChoice = null;
    this.confirmedServiceChoice = null;
    this.serviceParameters = [];
    this.payload = null;
  }

  get bytes() {
    console.log("APDU bytes()");
    let offset = 0;

    var data = Buffer.alloc(this.dataSizeInBufferWithoutServiceParameters);

    let index = 0;

    // 1 Byte: APDU Type and APDU Flags
    console.log("APDU bytes() type and flags");
    let apduTypeAndFlags = this.pduType;
    apduTypeAndFlags <<= 4;
    apduTypeAndFlags |= this.segmentedResponseAccepted ? 0x02 : 0x00;
    data.writeUInt8(apduTypeAndFlags & 0xff, offset + index++);
    console.log(data);

    // 1 Byte: segmentation information
    if (
      this.segmentedResponseAccepted ||
      this.pduType == PDUType.PDUType.CONFIRMED_SERVICE_REQUEST_PDU
    ) {
      console.log("APDU bytes() Segmentation Information");
      data.writeUInt8(this.segmentationControl & 0xff, offset + index++);
      console.log(data);
    }

    // 1 Byte: invoke ID
    if (this.invokeId >= 0) {
      console.log("APDU bytes() invoke id");
      data.writeUInt8(this.invokeId, offset + index++);
      console.log(data);
    }

    // 1 Byte: sequence number
    if (this.sequenceNumber >= 0) {
      console.log("APDU bytes() sequence number");
      data.writeUInt8(this.sequenceNumber, offset + index++);
      console.log(data);
    }

    // 1 Byte: proposed window size
    if (this.proposedWindowSize >= 0) {
      console.log("APDU bytes() proposed window size");
      data.writeUInt8(this.proposedWindowSize, offset + index++);
      console.log(data);
    }

    // 1 Byte: service choice
    if (this.unconfirmedServiceChoice != null) {
      console.log("APDU bytes() unconfirmed service choice");
      data.writeUInt8(this.unconfirmedServiceChoice, offset + index++);
      console.log(data);
    } else if (this.confirmedServiceChoice != null) {
      console.log("APDU bytes() confirmed service choice");
      data.writeUInt8(this.confirmedServiceChoice, offset + index++);
      console.log(data);
    } else {
      throw "Either confirmedServiceChoice or unconfirmedServiceChoice is required!";
    }

    // service parameters (such as ObjectIdentifierServiceParameter)
    if (this.serviceParameters.length > 0) {
      for (let i = 0; i < this.serviceParameters.length; i++) {
        console.log("APDU bytes() service parameter");
        let serviceParameter = this.serviceParameters[i];
        let serviceParameterBuffer = serviceParameter.bytes;
        data = Buffer.concat([data, serviceParameterBuffer]);
        console.log(data);
      }
    }

    console.log(data);
    return data;
  }

  fromBytes(data, offset) {
    // data contains:
    // 4 byte Virtual Link Control
    // ? byte NPDU (variable length because of source and destination network descriptors)
    // ? byte APDU (variable length because of service parameters)

    // console.log(
    //   "APDU parsing from message " + message + " at offset " + offset
    // );

    // save original offset for later size computation, initialize current position
    let startIndex = 0;
    let structureLength = 0;
    //this.offset = offset;
    //this.currentPosition = offset;

    // 1 byte - parse type and flags

    //
    // bits 7-4 are the PDU type
    this.pduType = data[offset + 0];
    this.pduType = (this.pduType & 240) >> 4;

    //
    // PDU flags

    // bit 3 is the segmentation bit
    this.segmentation = 0 < (data[startIndex + offset] & 0x08);

    // bit 2 is the moreSegmentsFollow bit
    this.moreSegmentsFollow = 0 < (data[startIndex + offset] & 0x04);

    // bit 1 is the segmentedResponseAccepted bit
    this.segmentedResponseAccepted = 0 < (data[startIndex + offset] & 0x02);

    offset++;
    structureLength++;

    //this.currentPosition++;

    // Response Information
    //
    // The ReadProperty request for max-apdu-length-accepted does not set the bit 2
    // but still contains segmentation information
    if (
      this.segmentedResponseAccepted ||
      this.pduType == PDUType.PDUType.CONFIRMED_SERVICE_REQUEST_PDU
    ) {
      this.segmentationControl = data[startIndex + offset] & 0xff;
      offset++;
      structureLength++;

      // invoke ID
      this.invokeId = data[startIndex + offset] & 0xff;
      offset++;
      structureLength++;

      // unconfirmed service choice
      let serviceChoiceCode = data[startIndex + offset] & 0xff;
      this.confirmedServiceChoice = serviceChoiceCode;
    } else if (this.pduType == PDUType.PDUType.SIMPLE_ACK_PDU) {
      // invoke ID
      this.invokeId = data[startIndex + offset] & 0xff;
      offset++;
      structureLength++;

      // confirmed service choice
      let serviceChoiceCode = data[startIndex + offset] & 0xff;
      this.confirmedServiceChoice = serviceChoiceCode;
    } else if (this.pduType == PDUType.PDUType.COMPLEX_ACK_PDU) {
      // this branch was introduced for parsing the response message of a
      // read-property request towards a bacnet device object

      // invoke ID
      this.invokeId = data[startIndex + offset] & 0xff;
      offset++;
      structureLength++;

      //
      // SEGMENTATION SPECIFIC - START
      //

      if (this.segmentation || this.moreSegmentsFollow) {
        // sequence number
        this.sequenceNumber = data[startIndex + offset] & 0xff;
        offset++;
        structureLength++;

        // proposed window size
        this.proposedWindowSize = data[startIndex + offset] & 0xff;
        offset++;
        structureLength++;
      }

      //
      // SEGMENTATION SPECIFIC - STOP
      //

      // service choice
      let serviceChoiceCode = data[startIndex + offset] & 0xff;
      this.confirmedServiceChoice = serviceChoiceCode;
    } else if (this.pduType == PDUType.PDUType.ERROR_PDU) {
      // invokeid
      this.invokeId = data[startIndex + offset] & 0xff;
      offset++;
      structureLength++;

      // service choice
      let serviceChoiceCode = data[startIndex + offset] & 0xff;
      this.confirmedServiceChoice = serviceChoiceCode;
      offset++;
      structureLength++;

      // read ServiceParameter ErrorClass
      let errorClassServiceParameter = new ServiceParameter();
      errorClassServiceParameter.fromBytes(data, startIndex + offset);
      this.serviceParameters.push(errorClassServiceParameter);
      offset += 2;
      structureLength += 2;

      // read ServiceParameter ErrorCode
      let errorCodeServiceParameter = new ServiceParameter();
      errorCodeServiceParameter.fromBytes(data, startIndex + offset);
      this.serviceParameters.push(errorCodeServiceParameter);
      offset += 2;
      structureLength += 2;

      let errorClass = errorClassServiceParameter.payload[0] & 0xff;
      let errorCode = errorCodeServiceParameter.payload[0] & 0xff;

      console.log(
        "Error detected! ErrorClass: " +
          ErrorClass.getLabel(errorClass) +
          " (" +
          errorClass +
          ") ErrorCode: " +
          ErrorCode.getLabel(errorCode) +
          " (" +
          errorCode +
          ")"
      );

      // no further processing
      return;
    } else if (this.pduType == PDUType.PDUType.SIMPLE_ACK_PDU) {
      // invokeid
      this.invokeId = data[startIndex + offset] & 0xff;
      offset++;
      structureLength++;

      // sequence number
      this.sequenceNumber = data[startIndex + offset] & 0xff;
      offset++;
      structureLength++;

      // proposedWindowSize
      this.proposedWindowSize = data[startIndex + offset] & 0xff;
      offset++;
      structureLength++;
    } else if (this.pduType == PDUType.PDUType.REJECT_PDU) {
      console.log("REJECT - Request was rejected by communication partner!");

      // invoke ID
      this.invokeId = data[startIndex + offset] & 0xff;
      offset++;
      structureLength++;

      // reject reason
      this.rejectReason = data[startIndex + offset] & 0xff;
      offset++;
      structureLength++;

      switch (this.rejectReason) {
        case 5:
          let msg = "REJECT REASON: missing-required-parameter (5)";
          console.log(msg);
          throw msg;

        default:
          console.log("UNKNOWN REJECT REASON: " + this.rejectReason);
          throw "UNKNOWN REJECT REASON: " + this.rejectReason;
      }
    } else if (this.pduType == PDUType.PDUType.ABORT_PDU) {
      console.log("REJECT - Request was rejected by communication partner!");

      // invoke ID
      this.invokeId = data[startIndex + offset] & 0xff;
      offset++;
      structureLength++;

      // abort reason
      this.abortReason = data[startIndex + offset] & 0xff;
      offset++;
      structureLength++;

      switch (this.abortReason) {
        case 4:
          let msg = "ABORT REASON: segmentation-not-supported (4)";
          console.log(msg);
          throw msg;

        default:
          console.log("UNKNOWN ABORT REASON: " + this.rejectReason);
          throw "UNKNOWN ABORT REASON: " + this.rejectReason;
      }
    } else {
      // unconfirmed service choice
      let serviceChoiceCode = data[startIndex + offset] & 0xff;
      this.unconfirmedServiceChoice = serviceChoiceCode;
    }

    offset++;
    structureLength++;

    // copy the APDU payload (contains service parameters) to a internal buffer and
    // do not parse them immediately because when a message is fragmented, several
    // APDUs will arrive and their payloads have to be reassembled to parse
    // all ServiceParameters for that particular fragmented response
    let payloadLength = data.length - (startIndex + offset);
    this.payload = Buffer.alloc(payloadLength);

    // buffer.copy(target, targetStart, sourceStart, sourceEnd);
    data.copy(this.payload, 0, startIndex + offset, data.length);

    // DEBUG
    //console.log(util.byteArrayToHexString(this.payload));

    //payload = Arrays.copyOfRange(data, startIndex + offset, payloadLength);

    //LOG.info(Utils.bytesToHex(payload));

    // // 1 byte - parse service choice - how to decide whether this is confirmed or unconfirmed?
    // this.unconfirmedServiceChoice = message[offset + 1];
    // this.currentPosition++;

    // //console.log("APDU pduType " + this.pduType);
    // //console.log("APDU unconfirmedServiceChoice " + this.unconfirmedServiceChoice);

    // this.serviceParameters = [];

    // // read ServiceParameters until the end of the buffer
    // while (this.currentPosition < message.length) {
    //   var serviceParameter = new ServiceParameter();

    //   this.serviceParameters.push(serviceParameter);

    //   serviceParameter.fromBytes(message, this.currentPosition);
    //   this.currentPosition += serviceParameter.dataSizeInBuffer;
    // }
  }

  parseServiceParameters() {
    if (this.payload == null) {
      return;
    }

    // 1 byte service choice, 1 byte invoke id before the service parameters start
    let offset = 0;

    // read ServiceParameters until the end of the buffer
    while (offset < this.payload.length) {
      var serviceParameter = new ServiceParameter();
      this.serviceParameters.push(serviceParameter);

      serviceParameter.fromBytes(this.payload, offset);
      offset += serviceParameter.dataSizeInBuffer;

      // DEBUG output the parsed service parameter
      //console.log(serviceParameter.asString);
    }
  }

  get dataSizeInBufferWithoutServiceParameters() {
    let dataLength = 0;

    // 1 byte: PDU type + PDU flags
    dataLength++;

    if (
      this.segmentedResponseAccepted ||
      this.pduType == PDUType.PDUType.CONFIRMED_SERVICE_REQUEST_PDU
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

  get asString() {
    let result = "";
    let invokeIdAsString = " invokeId = " + this.invokeId;

    let pduTypeAsString =
      " pduType = " +
      PDUType.getLabel(this.pduType) +
      " (" +
      this.pduType +
      ")";

    let unconfirmed =
      " UnconfirmedServiceChoice: " +
      unconfirmedServiceChoiceGetLabel(this.unconfirmedServiceChoice);

    let confirmed =
      " ConfirmedServiceChoice: " +
      confirmedServiceChoiceGetLabel(this.confirmedServiceChoice);

    result +=
      "[APDU] " + invokeIdAsString + pduTypeAsString + unconfirmed + confirmed;

    for (let i = 0; i < this.serviceParameters.length; i++) {
      result += this.serviceParameters[i].asString;
      result += "\n";
    }

    return result;
  }
}

module.exports = APDU;
