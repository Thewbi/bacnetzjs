const ErrorCode = {
  /** 0x1f */
  UNKNOWN_OBJECT: 0x1f,

  /** 0x20 */
  UNKNOWN_PROPERTY: 0x20,

  /** 0x25 = 37 */
  VALUE_OUT_OF_RANGE: 0x25,

  /** 0x13 = 19 */
  NO_SPACE_TO_ADD_LIST_ELEMENT: 0x13,
};

function getLabel(errorcode) {
  if (errorcode == null) {
    return "null";
  }

  switch (errorcode) {
    case ErrorCode.UNKNOWN_OBJECT:
      return "unknown-object";

    case ErrorCode.UNKNOWN_PROPERTY:
      return "unknown-property";

    case ErrorCode.VALUE_OUT_OF_RANGE:
      return "value-out-of-range";

    case ErrorCode.NO_SPACE_TO_ADD_LIST_ELEMENT:
      return "no-space-to-add-list-element";

    default:
      return "UNKNOWN";
  }
}

module.exports = { ErrorCode, getLabel };
