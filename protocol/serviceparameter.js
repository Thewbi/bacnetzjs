const TagClass = require("./tagclass.js");
const ServiceParameterConstants = require("./serviceparameterconstants.js")
  .ServiceParameterConstants;
const ObjectType = require("./objecttype.js");
const DevicePropertyType = require("./devicepropertytype.js");

class ServiceParameter {
  constructor() {
    this.tagClass = -1;
    //this.applicationTagNumber = -1;
    this.lengthValueType = -1;
    this.tagNumber = 0;
    this.payload = null;
  }

  get bytes() {
    var data = Buffer.alloc(this.dataSizeInBuffer);

    let index = 0;
    let offset = 0;

    // the application tag is a byte that encodes the information type of this
    // service parameter, the type of this service parameter (Application or context
    // specific) and the length of the payload inside this service parameter
    let applicationTag =
      (this.tagNumber << 4) | (this.tagClass << 3) | this.lengthValueType;
    //data[offset + index++] = (byte) applicationTag;
    data.writeUInt8(applicationTag & 0xff, offset + index++);

    // copy the payload in
    //if (ArrayUtils.isNotEmpty(payload)) {
    if (this.payload != null) {
      // for extended values, preface the actual payload with the payload's length
      if (this.lengthValueType == ServiceParameter.EXTENDED_VALUE) {
        //data[offset + index++] = byte(payload.length);
        data.writeUInt8(this.payload.length & 0xff, offset + index++);
      }

      //System.arraycopy(payload, 0, data, offset + index, payload.length);
      //data = Buffer.concat([data, this.payload]);
      for (let i = 0; i < this.payload.length; i++) {
        data.writeUInt8(this.payload.readUInt8(i), i + 1);
      }
      index += this.payload.length;
    }

    return data;
  }

  fromBytes(message, offset) {
    // console.log(
    //   "SParam parsing from message " + message + " at offset " + offset
    // );

    var header = message[offset + 0];

    this.tagClass = (header & 8) >> 3;
    this.tagNumber = (header & 240) >> 4;
    this.lengthValueType = header & 7;

    // console.log("SParam tagClass " + this.tagClass);
    // console.log("SParam tagNumber " + this.tagNumber);
    // console.log("SParam lengthValueType " + this.lengthValueType);

    //this.dataSizeInBuffer = this.lengthValueType + 1;

    this.payload = [];

    // process the service parameters.
    //
    // the service parameters contain the actual information that the communication partner
    // sends as part of it's response for the request.
    //
    // Service parameters either are CONTEXT_SPECIFIC tags oder APPLICATION tags.
    // This if has two branches, one for CONTEXT_SPECIFIC tags and another APPLICATION tags.
    if (this.tagClass == TagClass.CONTEXT_SPECIFIC_TAG) {
      //
      // CONTEXT_SPECIFIC tags
      //
      switch (this.lengthValueType) {
        // 0x01
        case ServiceParameterConstants.PROPERTY_IDENTIFIER_CODE:
          var payload = message[offset + 1] & 0xff;
          //   console.log(
          //     ">>>>> PROPERTY_IDENTIFIER_CODE of property " +
          //       DevicePropertyType.getLabel(payload) +
          //       " (" +
          //       payload +
          //       ")"
          //   );
          break;

        // 0x04
        case ServiceParameterConstants.OBJECT_IDENTIFIER_CODE:
          //   console.log(">>>>> OBJECT_IDENTIFIER_CODE");
          var data =
            ((message[offset + 1] & 0xff) << 24) |
            ((message[offset + 2] & 0xff) << 16) |
            ((message[offset + 3] & 0xff) << 8) |
            ((message[offset + 4] & 0xff) << 0);

          var objectType = (data & (1023 << 22)) >> 22;
          var bacnetIdentifier = (data & (4194303 << 0)) >> 0;

          // copy payload from buffer over into the service parameter
          this.payload = message.slice(
            offset + 1,
            offset + this.lengthValueType + 1
          );
          break;

        // // 0x05
        // case ServiceParameterConstants.EXTENDED_TAG_CODE:
        //   // the length of the contained payload is store in the first byte
        //   var payloadLength = message[offset + 1] & 0xff;
        //   console.log(
        //     ">>>>> EXTENDED_TAG_CODE the payload length to read is: " +
        //       payloadLength
        //   );

        //   // consume the bytes that this extended tag contains
        //   let targetBuffer = Buffer.alloc(payloadLength);
        //   message.copy(targetBuffer, 0, offset + 2, offset + 2 + payloadLength);
        //   console.log(targetBuffer.toString());

        //   this.payload = message.slice(offset + 2, offset + 2 + payloadLength);
        //   break;

        // 0x06
        case ServiceParameterConstants.OPENING_TAG_CODE:
          //   console.log(">>>>> OPENING_TAG_CODE {[" + this.tagNumber + "]");
          break;

        // 0x07
        case ServiceParameterConstants.CLOSING_TAG_CODE:
          //   console.log(">>>>> CLOSING_TAG_CODE {[" + this.tagNumber + "]");
          break;

        default:
          //   console.log(
          //     "Unknown CONTEXT_TAG! lengthValueType = " + this.lengthValueType
          //   );
          break;
      }
    } else if (this.tagClass == TagClass.APPLICATION_TAG) {
      //
      // APPLICATION tags
      //
      switch (this.tagNumber) {
        // 0x00
        case ServiceParameterConstants.APPLICATION_TAG_NULL:
          //var payload = message[offset + 1] & 0xff;
          //   console.log(
          //     ">>>>> BOOLEAN. The boolean value is = " +
          //       (this.lengthValueType == 1 ? "TRUE" : "FALSE")
          //   );
          break;

        // 0x01
        case ServiceParameterConstants.APPLICATION_TAG_BOOLEAN:
          var payload = message[offset + 1] & 0xff;
          //   console.log(
          //     ">>>>> BOOLEAN. The boolean value is = " +
          //       (this.lengthValueType == 1 ? "TRUE" : "FALSE")
          //   );
          break;

        // 0x02
        case ServiceParameterConstants.UNSIGNED_INTEGER_CODE:
          var payload = message[offset + 1] & 0xff;
          //   console.log(
          //     ">>>>> UNSIGNED INTEGER. The unsigned integer value is = " + payload
          //   );
          break;

        // 0x07
        case ServiceParameterConstants.CHARACTER_STRING_CODE:
          // the length of the contained payload is store in the first byte
          var payloadLength = message[offset + 1] & 0xff;
          //   console.log(
          //     ">>>>> EXTENDED_TAG_CODE the payload length to read is: " +
          //       payloadLength
          //   );

          // TODO: store this value somewhere maybe?
          // consume the bytes that this extended tag contains
          let targetBuffer = Buffer.alloc(payloadLength);
          message.copy(targetBuffer, 0, offset + 2, offset + 2 + payloadLength);

          // DEBUG output the value
          //console.log(targetBuffer.toString());

          this.payload = message.slice(offset + 2, offset + 2 + payloadLength);
          break;

        // 0x09
        case ServiceParameterConstants.ENUMERATED_CODE:
          //   console.log(">>>>> ENUMERATED_CODE");
          //var payload = message[offset + 1] & 0xff;
          this.payload = message.slice(offset + 1, offset + 1 + 1);
          //   console.log(
          //     "The value of this enum is: " +
          //       payload +
          //       "! This value only makes sense in the context of the property identifier service parameter preceding it! The preceding property identifier determines which value is mapped to this enum key! For ObjectType: " +
          //       ObjectType.getLabel(payload)
          //   );
          break;

        // 0x0a
        case ServiceParameterConstants.DATE:
          //   console.log(">>>>> DATE");
          break;

        // 0x0b
        case ServiceParameterConstants.TIME:
          //   console.log(">>>>> TIME");
          break;

        // 0x0c = 12d
        case ServiceParameterConstants.APPLICATION_TAG_BACNET_OBJECT_IDENTIFIER:
          var data =
            ((message[offset + 1] & 0xff) << 24) |
            ((message[offset + 2] & 0xff) << 16) |
            ((message[offset + 3] & 0xff) << 8) |
            ((message[offset + 4] & 0xff) << 0);

          var objectType = (data & (1023 << 22)) >> 22;
          var bacnetIdentifier = (data & (4194303 << 0)) >> 0;

          //   console.log(
          //     ">>>>> OBJECT_IDENTIFIER_CODE objectType = " +
          //       ObjectType.getLabel(objectType) +
          //       " (" +
          //       objectType +
          //       ") " +
          //       " bacnetIdentifier = " +
          //       bacnetIdentifier
          //   );

          // copy payload from buffer over into the service parameter
          this.payload = message.slice(
            offset + 1,
            offset + this.lengthValueType + 1
          );
          break;

        case ServiceParameterConstants.APPLICATION_TAG_NUMBER_BIT_STRING:
          //   console.log(">>>>> BIT_STRING");
          break;

        default:
          console.log("Unknown APPLICATION_TAG! tagNumber = " + this.tagNumber);
          break;
      }
    }
  }

  get dataSizeInBuffer() {
    if (this.tagClass == TagClass.CONTEXT_SPECIFIC_TAG) {
      if (
        this.lengthValueType == ServiceParameterConstants.OPENING_TAG_CODE ||
        this.lengthValueType == ServiceParameterConstants.CLOSING_TAG_CODE
      ) {
        return 1;
      }
    } else if (this.tagClass == TagClass.APPLICATION_TAG) {
      if (this.lengthValueType == ServiceParameterConstants.EXTENDED_VALUE) {
        return this.payload.length + 2;
      } else if (
        this.messageType != null &&
        this.messageType == MessageType.BOOLEAN
      ) {
        return 1;
      }
    }

    return this.lengthValueType + 1;
  }

  get asString() {
    let data = "";

    switch (this.tagClass) {
      case TagClass.APPLICATION_TAG:
        data += "[APPLICATION_TAG]";

        switch (this.tagNumber) {
          case ServiceParameterConstants.BIT_STRING_CODE:
            data += "BIT STRING";
            break;

          case ServiceParameterConstants.APPLICATION_TAG_BOOLEAN:
            data += "BOOLEAN";
            break;

          case ServiceParameterConstants.APPLICATION_TAG_REAL:
            data += "REAL";
            // final byte[] data = { 0x3f, 0x35, (byte) 0xc2, (byte) 0x8f };
            //                final float realValue = ByteBuffer.wrap(payload).order(ByteOrder.BIG_ENDIAN).getFloat();
            //                stringBuffer.append(" Value: ").append(realValue);
            break;

          case ServiceParameterConstants.APPLICATION_TAG_DATE:
            data += "DATE";
            break;

          case ServiceParameterConstants.APPLICATION_TAG_TIME:
            data += "TIME";
            break;

          case ServiceParameterConstants.APPLICATION_TAG_NUMBER_CHARACTER_STRING:
            // final String temp = new String(payload);
            // stringBuffer.append("Character String (7) '").append(temp).append("'");
            break;

          case ServiceParameterConstants.UNSIGNED_INTEGER_CODE:
            //data += ("Unsigned Integer (2) - VALUE: ").append("" + (payload[0] & 0xFF));
            break;

          case ServiceParameterConstants.ENUMERATED_CODE:
            //stringBuffer.append("Enumerated (9)");
            break;

          // 0x12
          case ServiceParameterConstants.BACNET_OBJECT_IDENTIFIER:
            //stringBuffer.append("BACnetObjectIdentifier (12)");
            // the first ten bit contain the type of object this object identifier describes
            let objectType = (this.payload[0] & 0xff) << 2;
            objectType += (this.payload[1] & 0xc0) >> 6;

            switch (objectType) {
              case ObjectType.ObjectType.ANALOG_INPUT:
                data += ", ObjectType: analog-input";
                break;

              case ObjectType.ObjectType.ANALOG_VALUE:
                data += ", ObjectType: analog-value";
                break;

              case ObjectType.ObjectType.BINARY_INPUT:
                data += ", ObjectType: binary-input";
                break;

              case ObjectType.ObjectType.BINARY_OUTPUT:
                data += ", ObjectType: binary-input";
                break;

              case ObjectType.ObjectType.DEVICE:
                data += ", ObjectType: device";
                break;

              case ObjectType.ObjectType.FILE:
                data += ", ObjectType: file";
                break;

              case ObjectType.ObjectType.CALENDAR:
                data += ", ObjectType: multi-state-value";
                break;

              case ObjectType.ObjectType.LOOP:
                data += ", ObjectType: loop";
                break;

              case ObjectType.ObjectType.NOTIFICATION_CLASS:
                data += ", ObjectType: notification-class";
                break;

              case ObjectType.ObjectType.MULTI_STATE_INPUT:
                data += ", ObjectType: multi-state-input";
                break;

              case ObjectType.ObjectType.MULTI_STATE_OUTPUT:
                data += ", ObjectType: multi-state-output";
                break;

              case ObjectType.ObjectType.MULTI_STATE_VALUE:
                data += ", ObjectType: multi-state-value";
                break;

              case ObjectType.ObjectType.SCHEDULE:
                data += ", ObjectType: multi-state-value";
                break;

              default:
                //throw new RuntimeException("Unknown ObjectType: " + objectType);
                //                    LOG.error("Unknown ObjectType: " + objectType);
                console.log("Unknown ObjectType: " + objectType);
            }

            //let instanceNumber = getInstanceNumber();
            //stringBuffer.append(", InstanceNumber: " + instanceNumber);
            break;

          default:
            let errorMsg =
              "Unknown Application Tag: tagNumber = " + this.tagNumber + ")";
            if (this.payload.length > 0) {
              errorMsg += DevicePropertyType.getLabel(this.payload[0] & 0xff);
            }
            console.log(errorMsg);
        }
        break;

      case TagClass.CONTEXT_SPECIFIC_TAG:
        data += "[CONTEXT_SPECIFIC_TAG]";

        switch (this.lengthValueType) {
          case 1:
            // let codeAsUnsignedInt = payload[0] & 0xff;
            // stringBuffer
            //   .append("[DeviceProperty:")
            //   .append(DevicePropertyType.getByCode(codeAsUnsignedInt).getName())
            //   .append(", Code: ")
            //   .append(codeAsUnsignedInt)
            //   .append("]");
            break;

          case ServiceParameterConstants.OPENING_TAG_CODE:
            //stringBuffer.append("{[").append(tagNumber).append("]");
            data += " {[" + this.tagNumber + "] OPENING_TAG";
            break;

          case ServiceParameterConstants.CLOSING_TAG_CODE:
            //stringBuffer.append("}[").append(tagNumber).append("]");
            data += " }[" + this.tagNumber + "] CLOSEING_TAG";
            break;

          case ServiceParameterConstants.OBJECT_IDENTIFIER_CODE:
            console.log("object identifier");
            // final int bufferToInt = APIUtils.bufferToInt(getPayload(), 0);
            // final ObjectType objectType = ObjectType.getByCode(bufferToInt >> 22);
            // final int instanceNumber = (bufferToInt & 0x3FFFFF);
            // stringBuffer.append("objectType " + objectType + " instanceNumber " + instanceNumber);

            var oi =
              ((this.payload[0] & 0xff) << 24) |
              ((this.payload[1] & 0xff) << 16) |
              ((this.payload[2] & 0xff) << 8) |
              ((this.payload[3] & 0xff) << 0);

            var objectType = (oi & (1023 << 22)) >> 22;
            var bacnetIdentifier = (oi & (4194303 << 0)) >> 0;

            // console.log(
            //   "objectType " +
            //     objectType +
            //     " bacnetIdentifier " +
            //     bacnetIdentifier
            // );

            break;

          default:
            // stringBuffer.append("[Unknown Context Specific Tag: ").append(lengthValueType).append("]");
            // if (lengthValueType == 1) {
            //     stringBuffer.append(DevicePropertyType.getByCode(payload[0]));
            // } else if (lengthValueType == 2) {
            //     final int tempint = APIUtils.bytesToUnsignedShort(payload[0], payload[1], true);
            //     stringBuffer.append(DevicePropertyType.getByCode(tempint));
            // }
            break;
        }

        break;

      default:
        data += " [UNKNOWN_TAG_CLASS:" + tagClass + "]";
        //stringBuffer.append(DevicePropertyType.getByCode(payload[0] & 0xff));
        break;
    }

    let tagClassAsString =
      this.tagClass == 0 ? " Application Tag" : " Context Tag";

    return (
      "TagClass = " +
      this.tagClass +
      tagClassAsString +
      ", tagNumber = " +
      this.tagNumber +
      ", lengthValueType = " +
      this.lengthValueType +
      ", payload = " +
      this.payload +
      ", data = " +
      data
    );
  }
}

module.exports = { ServiceParameter };
