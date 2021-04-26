class MessageToDeviceObjectConverter {
  convert(bacnetMessage, deviceObject) {
    // copy the remote address
    deviceObject.remoteInfo = bacnetMessage.remoteInfo;

    // copy object type and identifier
    var payload = bacnetMessage.apdu.serviceParameters[0].payload;

    var data =
      ((payload[0] & 0xff) << 24) |
      ((payload[1] & 0xff) << 16) |
      ((payload[2] & 0xff) << 8) |
      ((payload[3] & 0xff) << 0);

    deviceObject.objectType = (data & (1023 << 22)) >> 22;
    deviceObject.bacnetIdentifier = (data & (4194303 << 0)) >> 0;
  }
}

module.exports = MessageToDeviceObjectConverter;
