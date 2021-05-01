const ServiceParameterConstants = {
  /** 0x01 */
  PROPERTY_IDENTIFIER_CODE: 0x01,

  /** 0x05 */
  EXTENDED_TAG_CODE: 5,

  /** 0x06 */
  OPENING_TAG_CODE: 6,

  /** 0x07 */
  CLOSING_TAG_CODE: 7,

  /** 0x08 */
  BIT_STRING_CODE: 8,

  /** 0x07 Application Tag: Character String */
  CHARACTER_STRING_CODE: 7,

  /** 0x04 */
  OBJECT_IDENTIFIER_CODE: 0x04,

  /** 0x09 Application Tag: Enumerated Code */
  ENUMERATED_CODE: 9,

  /** 0x01 */
  UNKOWN_TAG_NUMBER: 1,

  /** 0x02 Application Tag: Unsigned integer */
  UNSIGNED_INTEGER_CODE: 2,

  /** 0x01 */
  BOOLEAN_CODE: 1,

  /** 0x04 */
  REAL_CODE: 4,

  /** 0x0c = 12d */
  BACNET_OBJECT_IDENTIFIER: 12,

  /** 0x05 */
  EXTENDED_VALUE: 0x05,

  /** 0x0A */
  DATE: 0x0a,

  /** 0x0B */
  TIME: 0x0b,

  /** 0x00 */
  APPLICATION_TAG_NULL: 0x00,

  /** 0x01 */
  APPLICATION_TAG_BOOLEAN: 0x01,

  /** 0x04 */
  APPLICATION_TAG_REAL: 0x04,

  /** 0x0A */
  APPLICATION_TAG_DATE: 0x0a,

  /** 0x0B */
  APPLICATION_TAG_TIME: 0x0b,

  //    APPLICATION_TAG_OBJECT_IDENTIFIER:4,

  /** 0x07 */
  APPLICATION_TAG_NUMBER_CHARACTER_STRING: 7,

  /** 0x08 */
  APPLICATION_TAG_NUMBER_BIT_STRING: 8,

  /** 0x0C = 12s */
  APPLICATION_TAG_BACNET_OBJECT_IDENTIFIER: 12,

  /** 0x03 */
  SIGNED_INTEGER_TWOS_COMMPLEMENT_NOTATION: 3,
};

module.exports = { ServiceParameterConstants };
