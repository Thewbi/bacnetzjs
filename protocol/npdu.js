class NPDU {
  constructor() {
    this.destinationNetworkNumber = 0;
    this.sourceMacLayerAddressLength = 0;
    this.sourceMac = 0;
    this.destinationMac = 0;
    this.destinationMACLayerAddressLength = 0;
    this.destinationHopCount = 0;
  }

  get bytes() {
    let offset = 0;

    var data = Buffer.alloc(this.dataSizeInBuffer);
    // data.writeUInt8(this.type, offset++);
    // data.writeUInt8(this.function, offset++);
    // data.writeUInt16BE(this.length, offset++);

    let index = 0;

    //data[offset + index++] = (byte) this.version;
    data.writeUInt8(this.version, offset + index++);

    //data[offset + index++] = (byte) this.control;
    data.writeUInt8(this.control, offset + index++);

    if (this.isDestinationSpecifierPresent) {
      // 2 byte destination network number
      //APIUtils.addShortToBuffer(data, offset + index, (short) destinationNetworkNumber);
      data.writeUInt16BE(this.destinationNetworkNumber, offset + index);
      index += 2;

      //data[offset + index++] = (byte) destinationMACLayerAddressLength;
      data.writeUInt16BE(
        this.destinationMACLayerAddressLength,
        offset + index++
      );
      if (this.destinationMACLayerAddressLength > 0) {
        for (let i = 0; i < this.destinationMACLayerAddressLength; i++) {
          //   data[offset + index++] = byte(
          //     (this.destinationMac >>
          //       (8 * (this.destinationMACLayerAddressLength - 1 - i))) &
          //       0xff
          //   );
        }
      }

      //data[offset + index++] = (byte) destinationHopCount;
      data.writeUInt8(this.destinationHopCount, offset + index++);
    }

    if (this.isSourceSpecifierPresent) {
      // 2 byte source network number
      //APIUtils.addShortToBuffer(data, offset + index, (short) sourceNetworkAddress);
      data.writeUInt16BE(this.sourceNetworkAddress, offset + index);
      index += 2;

      //data[offset + index++] = (byte) this.sourceMacLayerAddressLength;
      data.writeUInt8(this.sourceMacLayerAddressLength, offset + index++);
      if (this.sourceMacLayerAddressLength > 0) {
        for (let i = 0; i < sourceMacLayerAddressLength; i++) {
          //   data[offset + index++] = byte(
          //     (sourceMac >> (8 * (sourceMacLayerAddressLength - 1 - i))) & 0xff
          //   );
        }
      }
    }

    return data;
  }

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

  /**
   * Destination specifier where:
   * <ul>
   * <li />0 = DNET, DLEN, DADR, and Hop Count absent
   * <li />1 = DNET, DLEN, and Hop Count present DLEN = 0 denotes broadcast MAC
   * DADR and DADR field is absent DLEN > 0 specifies length of DADR field
   * </ul>
   *
   * @return
   */
  get isDestinationSpecifierPresent() {
    // 0x20 => 0010 0000
    return 0 < (this.control & 0x20);
  }

  /**
   * Source specifier where:
   * <ul>
   * <li />0 = SNET, SLEN, and SADR absent
   * <li />1 = SNET, SLEN, and SADR present SLEN = 0 Invalid SLEN > 0 specifies
   * length of SADR field
   * </ul>
   *
   * @return
   */
  get isSourceSpecifierPresent() {
    // 0x08 => 0000 1000
    return 0 < (this.control & 0x08);
  }

  get dataSizeInBuffer() {
    // two byte minimum for version and control
    let dataLength = 2;

    // destination specifier has four byte
    if (this.isDestinationSpecifierPresent) {
      // 2 byte: destination network address
      dataLength += 2;

      // 1 byte: mac layer address length
      dataLength += 1;

      // n bytes: for the mac itself
      dataLength += this.destinationMACLayerAddressLength;

      // 1 byte: hopCount
      dataLength += 1;
    }

    if (this.isSourceSpecifierPresent) {
      // 2 byte: source network address
      dataLength += 2;

      // 1 byte: mac layer address length
      dataLength += 1;

      // n bytes: for the mac itself
      dataLength += this.destinationMACLayerAddressLength;

      // 1 byte: hopCount
      //			dataLength += 1;
    }

    return dataLength;
  }
  get dataLength() {
    //return this.dataSizeInBuffer;
    return 1;
  }
}

module.exports = NPDU;
