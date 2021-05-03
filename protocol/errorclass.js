const ErrorClass = {
  /** 0x01 */
  OBJECT: 0x01,

  /** 0x02 */
  PROPERTY: 0x02,

  /** 0x03 */
  RESOURCE: 0x03,
};

function getLabel(errorclass) {
  if (errorclass == null) {
    return "null";
  }

  switch (errorclass) {
    case ErrorClass.OBJECT:
      return "object";

    case ErrorClass.PROPERTY:
      return "property";

    case ErrorClass.RESOURCE:
      return "resource";

    default:
      return "UNKNOWN";
  }
}

module.exports = { ErrorClass, getLabel };
