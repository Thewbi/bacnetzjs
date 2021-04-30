const ConfirmedServiceChoice = {
  // Alarm and Event Services
  acknowledgeAlarm: 0,
  confirmedCOVNotification: 1,
  confirmedEventNotification: 2,
  getAlarmSummary: 3,
  getEnrollmentSummary: 4,
  getEventInformation: 29,
  SUBSCRIBE_COV: 5,
  subscribeCOVProperty: 28,
  lifeSafetyOperation: 27,

  // File Access Services
  atomicReadFile: 6,
  atomicWriteFile: 7,

  //  Object Access Services
  ADD_LIST_ELEMENT: 8,
  removeListElement: 9,
  createObject: 10,
  deleteObject: 11,
  READ_PROPERTY: 12,
  READ_PROPERTY_MULTIPLE: 14,
  readRange: 26,
  WRITE_PROPERTY: 15,
  writePropertyMultiple: 16,

  //  Remote Device Management Services
  deviceCommunicationControl: 17,
  confirmedPrivateTransfer: 18,
  confirmedTextMessage: 19,
  REINITIALIZE_DEVICE: 20,

  //  Virtual Terminal Services
  vtOpen: 21,
  vtClose: 22,
  vtData: 23,
};

function getLabel(confirmedServiceChoice) {
  if (confirmedServiceChoice == null) {
    return null;
  }

  switch (confirmedServiceChoice) {
    case ConfirmedServiceChoice.acknowledgeAlarm:
      return "acknowledgeAlarm";

    case ConfirmedServiceChoice.confirmedCOVNotification:
      return "confirmedCOVNotification";
    case ConfirmedServiceChoice.confirmedEventNotification:
      return "confirmedEventNotification";
    case ConfirmedServiceChoice.getAlarmSummary:
      return "getAlarmSummary";
    case ConfirmedServiceChoice.getEnrollmentSummary:
      return "getEnrollmentSummary";
    case ConfirmedServiceChoice.getEventInformation:
      return "getEventInformation";
    case ConfirmedServiceChoice.SUBSCRIBE_COV:
      return "SUBSCRIBE_COV";
    case ConfirmedServiceChoice.subscribeCOVProperty:
      return "subscribeCOVProperty";
    case ConfirmedServiceChoice.lifeSafetyOperation:
      return "lifeSafetyOperation";

    // File Access Services
    case ConfirmedServiceChoice.atomicReadFile:
      return "atomicReadFile";
    case ConfirmedServiceChoice.atomicWriteFile:
      return "atomicWriteFile";

    //  Object Access Services
    case ConfirmedServiceChoice.ADD_LIST_ELEMENT:
      return "ADD_LIST_ELEMENT";
    case ConfirmedServiceChoice.removeListElement:
      return "removeListElement";
    case ConfirmedServiceChoice.createObject:
      return "createObject";
    case ConfirmedServiceChoice.deleteObject:
      return "deleteObject";
    case ConfirmedServiceChoice.READ_PROPERTY:
      return "READ_PROPERTY";
    case ConfirmedServiceChoice.READ_PROPERTY_MULTIPLE:
      return "READ_PROPERTY_MULTIPLE";
    case ConfirmedServiceChoice.readRange:
      return "readRange";
    case WRITE_PROPERTY:
      return "WRITE_PROPERTY";
    case ConfirmedServiceChoice.writePropertyMultiple:
      return "writePropertyMultiple";

    //  Remote Device Management Services
    case ConfirmedServiceChoice.deviceCommunicationControl:
      return "deviceCommunicationControl";
    case ConfirmedServiceChoice.confirmedPrivateTransfer:
      return "confirmedPrivateTransfer";
    case ConfirmedServiceChoice.confirmedTextMessage:
      return "confirmedTextMessage";
    case ConfirmedServiceChoice.REINITIALIZE_DEVICE:
      return "REINITIALIZE_DEVICE";

    //  Virtual Terminal Services
    case ConfirmedServiceChoice.vtOpen:
      return "vtOpen";
    case ConfirmedServiceChoice.vtClose:
      return "vtClose";
    case ConfirmedServiceChoice.vtData:
      return "vtData";

    default:
      return "UNKNOWN ConfirmedServiceChoice " + confirmedServiceChoice;
  }
}

module.exports = { ConfirmedServiceChoice, getLabel };
