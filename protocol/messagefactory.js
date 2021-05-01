const VirtualLinkControl = require("./virtualinkcontrol.js");
const NPDU = require("./npdu.js");
const APDU = require("./apdu.js");
const PDUType = require("./pdutype.js").PDUType;
const UnconfirmedServiceChoice = require("./unconfirmedservicechoice.js")
  .UnconfirmedServiceChoice;
const ConfirmedServiceChoice = require("./confirmedservicechoice.js")
  .ConfirmedServiceChoice;
const ServiceParameter = require("./serviceparameter.js").ServiceParameter;
const ServiceParameterConstants = require("./serviceparameterconstants.js");
const ObjectIdentifierServiceParameter = require("./objectidentifierserviceparameter.js");
const TagClass = require("./tagclass.js");
const DevicePropertyType = require("./devicepropertytype.js");

const Message = require("../transport/message.js");

class MessageFactory {
  whoIs() {
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
    objectIdentifierServiceParameter.lengthValueType =
      ServiceParameterConstants.ServiceParameterConstants.OBJECT_IDENTIFIER_CODE;
    objectIdentifierServiceParameter.objectType = deviceObject.objectType;
    objectIdentifierServiceParameter.bacnetIdentifier =
      deviceObject.bacnetIdentifier;

    var propertyIdentifierServiceParameter = new ServiceParameter();
    propertyIdentifierServiceParameter.tagClass = TagClass.CONTEXT_SPECIFIC_TAG;
    propertyIdentifierServiceParameter.tagNumber = 0x01;
    propertyIdentifierServiceParameter.lengthValueType = 0x01;
    propertyIdentifierServiceParameter.payload = Buffer.alloc(1);
    propertyIdentifierServiceParameter.payload.writeUInt8(
      DevicePropertyType.DevicePropertyType.OBJECT_LIST,
      0
    );

    // request index 0 which is the length of the array
    var propertyArrayIndexServiceParameter = new ServiceParameter();
    propertyArrayIndexServiceParameter.tagClass = TagClass.CONTEXT_SPECIFIC_TAG;
    propertyArrayIndexServiceParameter.tagNumber = 0x02;
    propertyArrayIndexServiceParameter.lengthValueType = 0x01;
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

  objectList(deviceObject) {
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
    objectIdentifierServiceParameter.lengthValueType =
      ServiceParameterConstants.ServiceParameterConstants.OBJECT_IDENTIFIER_CODE;
    objectIdentifierServiceParameter.objectType = deviceObject.objectType;
    objectIdentifierServiceParameter.bacnetIdentifier =
      deviceObject.bacnetIdentifier;

    var propertyIdentifierServiceParameter = new ServiceParameter();
    propertyIdentifierServiceParameter.tagClass = TagClass.CONTEXT_SPECIFIC_TAG;
    propertyIdentifierServiceParameter.tagNumber = 0x01;
    propertyIdentifierServiceParameter.lengthValueType = 0x01;
    propertyIdentifierServiceParameter.payload = Buffer.alloc(1);
    let offset = 0;
    propertyIdentifierServiceParameter.payload.writeUInt8(
      DevicePropertyType.DevicePropertyType.OBJECT_LIST,
      offset
    );

    var outApdu = new APDU();
    outApdu.pduType = PDUType.CONFIRMED_SERVICE_REQUEST_PDU;
    outApdu.invokeId = 1;
    outApdu.confirmedServiceChoice = ConfirmedServiceChoice.READ_PROPERTY;
    outApdu.serviceParameters.push(objectIdentifierServiceParameter);
    outApdu.serviceParameters.push(propertyIdentifierServiceParameter);

    var outMessage = new Message();
    outMessage.virtualLinkControl = virtualLinkControl;
    outMessage.npdu = outNpdu;
    outMessage.apdu = outApdu;

    virtualLinkControl.length = outMessage.dataLength;

    return outMessage;
  }

  propertiesAll(deviceObject) {
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
    //outNpdu.control = 0x00;

    // destination specifier
    outNpdu.control = 0x24;
    outNpdu.destinationNetworkAddress = 999;
    outNpdu.destinationMacLayerAddressLength = 1;
    outNpdu.destinationAddress = 25;
    outNpdu.destinationHopCount = 255;

    // this object identifier has to be context specific. I do not know why
    var objectIdentifierServiceParameter = new ObjectIdentifierServiceParameter();
    objectIdentifierServiceParameter.tagClass = TagClass.CONTEXT_SPECIFIC_TAG;
    objectIdentifierServiceParameter.tagNumber = 0x00;
    objectIdentifierServiceParameter.lengthValueType =
      ServiceParameterConstants.ServiceParameterConstants.OBJECT_IDENTIFIER_CODE;
    objectIdentifierServiceParameter.objectType = deviceObject.objectType;
    objectIdentifierServiceParameter.bacnetIdentifier =
      deviceObject.bacnetIdentifier;

    // {[1] opening bracket
    var openingBracketServiceParameter = new ServiceParameter();
    openingBracketServiceParameter.tagClass = TagClass.CONTEXT_SPECIFIC_TAG;
    openingBracketServiceParameter.tagNumber = 0x01;
    openingBracketServiceParameter.lengthValueType =
      ServiceParameterConstants.ServiceParameterConstants.OPENING_TAG_CODE;

    // request ALL
    var allDevicePropertyServiceParameter = new ServiceParameter();
    allDevicePropertyServiceParameter.tagClass = TagClass.CONTEXT_SPECIFIC_TAG;
    allDevicePropertyServiceParameter.tagNumber = 0x00;
    allDevicePropertyServiceParameter.lengthValueType = 1;
    //allDevicePropertyServiceParameter.setPayload(new byte[] { (byte) DevicePropertyType.ALL.getCode() });
    allDevicePropertyServiceParameter.payload = Buffer.alloc(1);
    let offset = 0;
    allDevicePropertyServiceParameter.payload.writeUInt8(
      DevicePropertyType.DevicePropertyType.ALL,
      offset
    );

    // }[1] closeing bracket
    var closingBracketServiceParameter = new ServiceParameter();
    closingBracketServiceParameter.tagClass = TagClass.CONTEXT_SPECIFIC_TAG;
    closingBracketServiceParameter.tagNumber = 0x01;
    closingBracketServiceParameter.lengthValueType =
      ServiceParameterConstants.ServiceParameterConstants.CLOSING_TAG_CODE;

    var outApdu = new APDU();
    outApdu.pduType = PDUType.CONFIRMED_SERVICE_REQUEST_PDU;
    outApdu.invokeId = 1;
    outApdu.confirmedServiceChoice =
      ConfirmedServiceChoice.READ_PROPERTY_MULTIPLE;
    outApdu.serviceParameters.push(objectIdentifierServiceParameter);
    outApdu.serviceParameters.push(openingBracketServiceParameter);
    outApdu.serviceParameters.push(allDevicePropertyServiceParameter);
    outApdu.serviceParameters.push(closingBracketServiceParameter);

    var outMessage = new Message();
    outMessage.virtualLinkControl = virtualLinkControl;
    outMessage.npdu = outNpdu;
    outMessage.apdu = outApdu;

    virtualLinkControl.length = outMessage.dataLength;

    return outMessage;
  }

  writeProperty(deviceObject, value) {
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
    //outNpdu.control = 0x00;

    // destination specifier
    outNpdu.control = 0x24;
    outNpdu.destinationNetworkAddress = 999;
    outNpdu.destinationMacLayerAddressLength = 1;
    outNpdu.destinationAddress = 25;
    outNpdu.destinationHopCount = 255;

    // this object identifier has to be context specific. I do not know why
    var objectIdentifierServiceParameter = new ObjectIdentifierServiceParameter();
    objectIdentifierServiceParameter.tagClass = TagClass.CONTEXT_SPECIFIC_TAG;
    objectIdentifierServiceParameter.tagNumber = 0x00;
    objectIdentifierServiceParameter.lengthValueType =
      ServiceParameterConstants.ServiceParameterConstants.OBJECT_IDENTIFIER_CODE;
    objectIdentifierServiceParameter.objectType = deviceObject.objectType;
    objectIdentifierServiceParameter.bacnetIdentifier =
      deviceObject.bacnetIdentifier;

    var propertyIdentifierServiceParameter = new ServiceParameter();
    propertyIdentifierServiceParameter.tagClass = TagClass.CONTEXT_SPECIFIC_TAG;
    propertyIdentifierServiceParameter.tagNumber = 0x01;
    propertyIdentifierServiceParameter.lengthValueType = 0x01;
    propertyIdentifierServiceParameter.payload = Buffer.alloc(1);
    propertyIdentifierServiceParameter.payload.writeUInt8(
      DevicePropertyType.DevicePropertyType.PRESENT_VALUE,
      0
    );

    // opening tag {[3]
    var openingBracketServiceParameter = new ServiceParameter();
    openingBracketServiceParameter.tagClass = TagClass.CONTEXT_SPECIFIC_TAG;
    openingBracketServiceParameter.tagNumber = 0x03;
    openingBracketServiceParameter.lengthValueType =
      ServiceParameterConstants.ServiceParameterConstants.OPENING_TAG_CODE;

    // present value to set
    var presentValueServiceParameter = new ServiceParameter();
    presentValueServiceParameter.tagClass = TagClass.APPLICATION_TAG;
    presentValueServiceParameter.tagNumber = 0x02;
    presentValueServiceParameter.lengthValueType = 0x01;
    presentValueServiceParameter.payload = Buffer.alloc(1);
    presentValueServiceParameter.payload.writeUInt8(value);

    // opening tag }[3]
    var closingBracketServiceParameter = new ServiceParameter();
    closingBracketServiceParameter.tagClass = TagClass.CONTEXT_SPECIFIC_TAG;
    closingBracketServiceParameter.tagNumber = 0x03;
    closingBracketServiceParameter.lengthValueType =
      ServiceParameterConstants.ServiceParameterConstants.CLOSING_TAG_CODE;

    // priority
    var priorityServiceParameter = new ServiceParameter();
    priorityServiceParameter.tagClass = TagClass.CONTEXT_SPECIFIC_TAG;
    priorityServiceParameter.tagNumber = 0x04;
    priorityServiceParameter.lengthValueType = 0x01;
    priorityServiceParameter.payload = Buffer.alloc(1);
    priorityServiceParameter.payload.writeUInt8(0x10, 0);

    var outApdu = new APDU();
    outApdu.pduType = PDUType.CONFIRMED_SERVICE_REQUEST_PDU;
    outApdu.invokeId = 1;
    outApdu.confirmedServiceChoice = ConfirmedServiceChoice.WRITE_PROPERTY;
    outApdu.serviceParameters.push(objectIdentifierServiceParameter);
    outApdu.serviceParameters.push(propertyIdentifierServiceParameter);
    outApdu.serviceParameters.push(openingBracketServiceParameter);
    outApdu.serviceParameters.push(presentValueServiceParameter);
    outApdu.serviceParameters.push(closingBracketServiceParameter);
    outApdu.serviceParameters.push(priorityServiceParameter);

    var outMessage = new Message();
    outMessage.virtualLinkControl = virtualLinkControl;
    outMessage.npdu = outNpdu;
    outMessage.apdu = outApdu;

    virtualLinkControl.length = outMessage.dataLength;

    return outMessage;
  }
}

module.exports = MessageFactory;
