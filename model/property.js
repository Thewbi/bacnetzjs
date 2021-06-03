class Property {
    constructor() {
      this.serviceParameterKey = null;
    }

    get asString() {
      var output = this.serviceParameterKey.asString;
      return output;
    }

    get asShortString() {
        var output = this.serviceParameterKey.asStringShort;
        return output;
      }
  }

  module.exports = Property;
