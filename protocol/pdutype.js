// https://www.sohamkamani.com/javascript/enums/

const PDUType = {
  CONFIRMED_SERVICE_REQUEST_PDU: 0x00,
  UNCONFIRMED_SERVICE_REQUEST_PDU: 0x01,
  SIMPLE_ACK_PDU: 0x02,
  COMPLEX_ACK_PDU: 0x03,
  SEGMENT_ACK_PDU: 0x04,
  ERROR_PDU: 0x05,
};

module.exports = PDUType;
