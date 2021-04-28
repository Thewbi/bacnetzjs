// https://www.sohamkamani.com/javascript/enums/

const UnconfirmedServiceChoice = {
  /** 20.1.2 BACnet-Confirmed-Request-PDU */
  I_AM: 0x00,

  /** 20.1.3 BACnet-Unconfirmed-Request-PDU */
  I_HAVE: 0x01,

  /** 20.1.4 BACnet-SimpleACK-PDU */
  UNCONFIRMED_COV_NOTIFICATION: 0x02,

  /** 20.1.5 BACnet-ComplexACK-PDU */
  UNCONFIRMED_EVENT_NOTIFICATION: 0x03,

  /** 20.1.6 BACnet-SegmentACK-PDU */
  UNCONFIRMED_PRIVATE_TRANSFER: 0x04,

  /** 20.1.7 BACnet-Error-PDU */
  UNCONFIRMED_TEXT_MESSAGE: 0x05,

  /** 20.1.8 BACnet-Reject-PDU */
  TIME_SYNCHRONIZATION: 0x06,

  /** WHO_HAS, 20.1.9 BACnet-Abort-PDU */
  WHO_HAS: 0x07,

  /** WHO-IS, 20.1.2 BACnet-Confirmed-Request-PDU */
  WHO_IS: 0x08,

  UTC_TIME_SYNCHRONIZATION: 0x09,

  WRITE_GROUP: 0x0a,

  DEVICE_COMMUNICATION_CONTROL: 0x11,

  UNNOWN_SERVICE_CHOICE: 0xffffffff,

  UNNOWN_SERVICE_CHOICE_128: 0x80,

  UNNOWN_SERVICE_CHOICE_129: 0x81,

  UNNOWN_SERVICE_CHOICE_130: 0x82,

  CONFIRMED_COV_NOTIFICATION: 0x01,
};

module.exports = UnconfirmedServiceChoice;
