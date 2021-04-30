// https://www.sohamkamani.com/javascript/enums/

const UnconfirmedServiceChoice = {
  /** 0x00 20.1.2 BACnet-Confirmed-Request-PDU */
  I_AM: 0x00,

  /** 0x01 20.1.3 BACnet-Unconfirmed-Request-PDU */
  I_HAVE: 0x01,

  /** 0x02 20.1.4 BACnet-SimpleACK-PDU */
  UNCONFIRMED_COV_NOTIFICATION: 0x02,

  /** 0x03 20.1.5 BACnet-ComplexACK-PDU */
  UNCONFIRMED_EVENT_NOTIFICATION: 0x03,

  /** 0x04 20.1.6 BACnet-SegmentACK-PDU */
  UNCONFIRMED_PRIVATE_TRANSFER: 0x04,

  /** 0x05 20.1.7 BACnet-Error-PDU */
  UNCONFIRMED_TEXT_MESSAGE: 0x05,

  /** 0x06  20.1.8 BACnet-Reject-PDU */
  TIME_SYNCHRONIZATION: 0x06,

  /** 0x07 WHO_HAS, 20.1.9 BACnet-Abort-PDU */
  WHO_HAS: 0x07,

  /** 0x08 WHO-IS, 20.1.2 BACnet-Confirmed-Request-PDU */
  WHO_IS: 0x08,

  /** 0x09 */
  UTC_TIME_SYNCHRONIZATION: 0x09,

  /** 0x0A */
  WRITE_GROUP: 0x0a,

  /** 0x11 */
  DEVICE_COMMUNICATION_CONTROL: 0x11,

  UNNOWN_SERVICE_CHOICE: 0xffffffff,

  UNNOWN_SERVICE_CHOICE_128: 0x80,

  UNNOWN_SERVICE_CHOICE_129: 0x81,

  UNNOWN_SERVICE_CHOICE_130: 0x82,

  CONFIRMED_COV_NOTIFICATION: 0x01,
};

function getLabel(unconfirmedServiceChoice) {
  if (unconfirmedServiceChoice == null) {
    return null;
  }

  switch (unconfirmedServiceChoice) {
    case UnconfirmedServiceChoice.I_AM:
      return "I_AM";

    case UnconfirmedServiceChoice.I_HAVE:
      return "I_HAVE";

    /** 20.1.4 BACnet-SimpleACK-PDU */
    case UnconfirmedServiceChoice.UNCONFIRMED_COV_NOTIFICATION:
      return "UNCONFIRMED_COV_NOTIFICATION";

    /** 20.1.5 BACnet-ComplexACK-PDU */
    case UnconfirmedServiceChoice.UNCONFIRMED_EVENT_NOTIFICATION:
      return "UNCONFIRMED_EVENT_NOTIFICATION";

    /** 20.1.6 BACnet-SegmentACK-PDU */
    case UnconfirmedServiceChoice.UNCONFIRMED_PRIVATE_TRANSFER:
      return "UNCONFIRMED_PRIVATE_TRANSFER";

    /** 20.1.7 BACnet-Error-PDU */
    case UnconfirmedServiceChoice.UNCONFIRMED_TEXT_MESSAGE:
      return "UNCONFIRMED_TEXT_MESSAGE";

    /** 20.1.8 BACnet-Reject-PDU */
    case UnconfirmedServiceChoice.TIME_SYNCHRONIZATION:
      return "TIME_SYNCHRONIZATION";

    /** WHO_HAS, 20.1.9 BACnet-Abort-PDU */
    case UnconfirmedServiceChoice.WHO_HAS:
      return "WHO_HAS";

    /** WHO-IS, 20.1.2 BACnet-Confirmed-Request-PDU */
    case UnconfirmedServiceChoice.WHO_IS:
      return "WHO_IS";

    case UnconfirmedServiceChoice.UTC_TIME_SYNCHRONIZATION:
      return "UTC_TIME_SYNCHRONIZATION";

    case UnconfirmedServiceChoice.WRITE_GROUP:
      return "WRITE_GROUP";

    case UnconfirmedServiceChoice.DEVICE_COMMUNICATION_CONTROL:
      return "DEVICE_COMMUNICATION_CONTROL";

    default:
      return "UNKNOWN UnconfirmedServiceChoice " + confirmedServiceChoice;
  }
}

module.exports = { UnconfirmedServiceChoice, getLabel };
