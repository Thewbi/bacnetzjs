const ErrorClass = {
  /** 0x01 */
  OBJECT: 0x01,

  /** (0x02 */
  PROPERTY: 0x02,
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

    default:
      return "UNKNOWN";
  }
}

module.exports = { ErrorClass, getLabel };
