class DeviceObject {
  constructor() {
    this.objectType = -1;
    this.bacnetIdentifier = -1;
    this.properties = [];
  }

  get asString() {
    var output =
      "[DeviceObject] objectType = " +
      this.objectType +
      ", bacnetIdentifier = " +
      this.bacnetIdentifier;
    return output;
  }
}

module.exports = DeviceObject;
