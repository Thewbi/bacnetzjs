const ObjectType = {
  /**
   * 0x00 = 0d
   */
  ANALOG_INPUT: 0x00,

  /**
   * 0x01 = 1d
   */
  ANALOG_OUTPUT: 0x01,

  /**
   * 0x02 = 2d
   */
  ANALOG_VALUE: 0x02,

  /**
   * 0x03 = 3d
   */
  BINARY_INPUT: 0x03,

  /**
   * 0x04 = 4d
   */
  BINARY_OUTPUT: 0x04,

  /**
   * 0x06 = 6d
   */
  CALENDAR: 0x06,

  /**
   * 0x08 = 8d
   */
  DEVICE: 0x08,

  /**
   * 0x0A = 10d
   */
  FILE: 0x0a,

  /**
   * 0x0C = 12d
   */
  LOOP: 0x0c,

  /**
   * 0x0D = 13d
   */
  MULTI_STATE_INPUT: 0x0d,

  /**
   * 0x0E = 14d
   */
  MULTI_STATE_OUTPUT: 0x0e,

  /**
   * 0x0F = 15d
   */
  NOTIFICATION_CLASS: 0x0f,

  /**
   * 0x11 = 17d
   */
  SCHEDULE: 0x11,

  /**
   * 0x13 = 19d
   */
  MULTI_STATE_VALUE: 0x13,
};

function getLabel(objectType) {
  if (objectType == null) {
    return "null";
  }

  switch (objectType) {
    case ObjectType.ANALOG_INPUT:
      return "ANALOG_INPUT";

    case ObjectType.ANALOG_OUTPUT:
      return "ANALOG_OUTPUT";

    case ObjectType.ANALOG_VALUE:
      return "ANALOG_VALUE";

    case ObjectType.BINARY_INPUT:
      return "BINARY_INPUT";

    case ObjectType.BINARY_OUTPUT:
      return "BINARY_OUTPUT";

    case ObjectType.CALENDAR:
      return "CALENDAR";

    case ObjectType.DEVICE:
      return "DEVICE";

    case ObjectType.FILE:
      return "FILE";

    case ObjectType.LOOP:
      return "LOOP";

    /**
     * 0x0D = 13d
     */
    case ObjectType.MULTI_STATE_INPUT:
      return "MULTI_STATE_INPUT";

    /**
     * 0x0E = 14d
     */
    case ObjectType.MULTI_STATE_OUTPUT:
      return "MULTI_STATE_OUTPUT";

    /**
     * 0x0F = 15d
     */
    case ObjectType.NOTIFICATION_CLASS:
      return "NOTIFICATION_CLASS";

    /**
     * 0x11 = 17d
     */
    case ObjectType.SCHEDULE:
      return "SCHEDULE";

    /**
     * 0x13 = 19d
     */
    case ObjectType.MULTI_STATE_VALUE:
      return "MULTI_STATE_VALUE";

    default:
      return "UKNOWN";
  }
}

module.exports = { ObjectType, getLabel };
