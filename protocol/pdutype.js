// https://www.sohamkamani.com/javascript/enums/

const PDUType = {
  CONFIRMED_SERVICE_REQUEST_PDU: 0x00,
  UNCONFIRMED_SERVICE_REQUEST_PDU: 0x01,
  SIMPLE_ACK_PDU: 0x02,
  COMPLEX_ACK_PDU: 0x03,
  SEGMENT_ACK_PDU: 0x04,
  ERROR_PDU: 0x05,
};

function getLabel(pduType) {

  if (pduType == null) {
    return "null";
  }

  switch (pduType) {

    case PDUType.CONFIRMED_SERVICE_REQUEST_PDU:
      return "CONFIRMED_SERVICE_REQUEST_PDU";

      case PDUType.UNCONFIRMED_SERVICE_REQUEST_PDU:
      return "UNCONFIRMED_SERVICE_REQUEST_PDU";

      case PDUType.SIMPLE_ACK_PDU:
      return "SIMPLE_ACK_PDU";

      case PDUType.COMPLEX_ACK_PDU:
      return "COMPLEX_ACK_PDU";

      case PDUType.SEGMENT_ACK_PDU:
      return "SEGMENT_ACK_PDU";

      case PDUType.ERROR_PDU:
      return "ERROR_PDU";

      default:
        return "UKNOWN";
  }

}

module.exports = { PDUType, getLabel };
