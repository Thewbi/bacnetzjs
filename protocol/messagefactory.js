const VirtualLinkControl = require("./virtualinkcontrol.js");
const NPDU = require("./npdu.js");
const APDU = require("./apdu.js");
const PDUType = require("./pdutype.js");
const UnconfirmedServiceChoice = require("./unconfirmedservicechoice.js");
const ConfirmedServiceChoice = require("./confirmedservicechoice.js");
const ServiceParameter = require("./serviceparameter.js");
const ObjectIdentifierServiceParameter = require("./objectidentifierserviceparameter.js");
const TagClass = require("./tagclass.js");
const DevicePropertyType = require("./devicepropertytype.js");

const Message = require("../transport/message.js");

class MessageFactory {
  whoIsMessage() {
    var virtualLinkControl = new VirtualLinkControl();
    // Type: BACnet/IP (Annex J) (0x81)
    virtualLinkControl.type = 0x81;
    // Function: Original-Broadcast-NPDU (0x0b)
    virtualLinkControl.function = 0x0b;
    // BVLC-Length: 4 of 22 bytes BACnet packet length
    virtualLinkControl.length = 0x00;

    var npdu = new NPDU();
    npdu.version = 0x01;
    npdu.control = 0x00;

    var apdu = new APDU();
    apdu.pduType = PDUType.UNCONFIRMED_SERVICE_REQUEST_PDU;
    apdu.unconfirmedServiceChoice = UnconfirmedServiceChoice.WHO_IS;

    var message = new Message();
    message.virtualLinkControl = virtualLinkControl;
    message.npdu = npdu;
    message.apdu = apdu;

    virtualLinkControl.length = message.dataLength;

    return message;
  }

  objectListSize(deviceObject) {
    var virtualLinkControl = new VirtualLinkControl();
    virtualLinkControl.type = 0x81;
    virtualLinkControl.function = 0x0a;
    // is set later, when the full package data was added
    virtualLinkControl.length = 0x00;

    // NPDU including destination network information
    var outNpdu = new NPDU();
    outNpdu.version = 0x01;
    // no additional information
    // this works, if the cp is connected to the device directly via 192.168.2.1
    outNpdu.control = 0x00;

    // this object identifier has to be context specific. I do not know why
    var objectIdentifierServiceParameter = new ObjectIdentifierServiceParameter();
    objectIdentifierServiceParameter.tagClass = TagClass.CONTEXT_SPECIFIC_TAG;
    objectIdentifierServiceParameter.tagNumber = 0x00;
    objectIdentifierServiceParameter.lengthValueType = 0x04;
    objectIdentifierServiceParameter.objectType = deviceObject.objectType;
    objectIdentifierServiceParameter.bacnetIdentifier =
      deviceObject.bacnetIdentifier;

    var propertyIdentifierServiceParameter = new ServiceParameter();
    propertyIdentifierServiceParameter.tagClass = TagClass.CONTEXT_SPECIFIC_TAG;
    propertyIdentifierServiceParameter.tagNumber = 0x01;
    propertyIdentifierServiceParameter.lengthValueType = 0x01;
    //propertyIdentifierServiceParameter.setPayload(new byte[] { (byte) DeviceProperty.OBJECT_LIST });
    propertyIdentifierServiceParameter.payload = Buffer.alloc(1);
    propertyIdentifierServiceParameter.payload.writeUInt8(
      DevicePropertyType.OBJECT_LIST,
      0
    );

    // request index 0 which is the length of the array
    var propertyArrayIndexServiceParameter = new ServiceParameter();
    propertyArrayIndexServiceParameter.tagClass = TagClass.CONTEXT_SPECIFIC_TAG;
    propertyArrayIndexServiceParameter.tagNumber = 0x02;
    propertyArrayIndexServiceParameter.lengthValueType = 0x01;
    //propertyArrayIndexServiceParameter.setPayload(new byte[] { (byte) 0x00 });
    propertyArrayIndexServiceParameter.payload = Buffer.alloc(1);
    propertyArrayIndexServiceParameter.payload.writeUInt8(0x00);

    var outApdu = new APDU();
    outApdu.pduType = PDUType.CONFIRMED_SERVICE_REQUEST_PDU;
    outApdu.invokeId = 1;
    outApdu.confirmedServiceChoice = ConfirmedServiceChoice.READ_PROPERTY;
    outApdu.serviceParameters.push(objectIdentifierServiceParameter);
    outApdu.serviceParameters.push(propertyIdentifierServiceParameter);
    outApdu.serviceParameters.push(propertyArrayIndexServiceParameter);

    var outMessage = new Message();
    outMessage.virtualLinkControl = virtualLinkControl;
    outMessage.npdu = outNpdu;
    outMessage.apdu = outApdu;

    virtualLinkControl.length = outMessage.dataLength;

    return outMessage;
  }
}

module.exports = MessageFactory;
