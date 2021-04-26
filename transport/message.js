class Message {
  get asString() {
    var output = "[Message] ";

    // retrieve type of message from APDU
    switch (this.apdu.type) {
      case 1:
        // unconfirmed request

        switch (this.apdu.serviceChoice) {
          case 0:
            // I-AM
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
        }
        break;
    }

    return output;
  }
}

module.exports = Message;
