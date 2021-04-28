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

module.exports = ConfirmedServiceChoice;
