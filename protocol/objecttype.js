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

module.exports = { ObjectType };
