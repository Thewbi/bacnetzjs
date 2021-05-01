const ErrorCode = {
  /** 0x1f */
  UNKNOWN_OBJECT: 0x1f,

  /** 0x20 */
  UNKNOWN_PROPERTY: 0x20,

  /** 0x25 = 37 */
  VALUE_OUT_OF_RANGE: 0x25,
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

    default:
      return "UNKNOWN";
  }
}

module.exports = { ErrorCode, getLabel };
