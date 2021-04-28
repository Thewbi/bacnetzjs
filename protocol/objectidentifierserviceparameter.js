class ObjectIdentifierServiceParameter {
  constructor() {
    super.constructor();
    this.objectType = -1;
    this.bacnetIdentifier = -1;
  }

  get bytes() {
    var data = Buffer.alloc(this.dataSizeInBuffer);

    let offset = 0;
    let index = 0;

    // application tag
    let applicationTag =
      (this.tagNumber << 4) | (this.tagClass << 3) | this.lengthValueType;
    data.writeUInt8(applicationTag & 0xff, offset + index++);

    // object type and instance number encoded into four byte
    let objectTypeAndBacnetIdentifier =
      (this.objectType << 22) | this.bacnetIdentifier;
    data.writeInt32BE(objectTypeAndBacnetIdentifier, offset + index);
    index += 4;

    return data;
  }

  get dataSizeInBuffer() {
    // 1 byte application tag
    // 4 byte ObjectType + InstanceNumber
    return 5;
  }
}

module.exports = ObjectIdentifierServiceParameter;
