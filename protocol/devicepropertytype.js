// non-greedy regex: :(.*?)"

const DevicePropertyType = {
  ACKED_TRANSITIONS: 0x00,
  ACK_REQUIRED: 0x01,
  ACTION: 0x02,
  ACTION_TEXT: 0x03,
  ACTIVE_TEXT: 0x04,
  ACTIVE_VT_SESSIONS: 0x05,
  ALARM_VALUE: 0x06,
  ALARM_VALUES: 0x07,
  ALL: 0x08,
  ALL_WRITES_SUCCESSFUL: 9,
  APDU_SEGMENT_TIMEOUT: 10,
  APDU_TIMEOUT: 11,
  APPLICATION_SOFTWARE_VERSION: 12,
  ARCHIVE: 13,
  BIAS: 14,
  CHANGE_OF_STATE_COUNT: 15,
  CHANGE_OF_STATE_TIME: 16,
  NOTIFICATION_CLASS: 17,
  CONTROLLED_VARIABLE_REFERENCE: 19,
  CONTROLLED_VARIABLE_UNITS: 20,
  CONTROLLED_VARIABLE_VALUE: 21,
  COV_INCREMENT: 22,
  DATE_LIST: 23,
  DAYLIGHT_SAVINGS_STATUS: 24,
  DEADBAND: 25,
  DERIVATIVE_CONSTANT: 26,
  DERIVATIVE_CONSTANT_UNITS: 27,
  DESCRIPTION: 28,
  DESCRIPTION_OF_HALT: 29,
  DEVICE_ADDRESS_BINDING: 30,
  DEVICE_TYPE: 31,
  EFFECTIVE_PERIOD: 32,
  ELAPSED_ACTIVE_TIME: 33,
  ERROR_LIMIT: 34,
  EVENT_ENABLE: 35,
  EVENT_STATE: 36,
  EVENT_TYPE: 37,
  EXCEPTION_SCHEDULE: 38,
  FAULT_VALUES: 39,
  FEEDBACK_VALUE: 40,
  FILE_ACCESS_METHOD: 41,
  FILE_SIZE: 42,
  FILE_TYPE: 43,
  FIRMWARE_REVISION: 44,
  HIGH_LIMIT: 45,
  INACTIVE_TEXT: 46,
  IN_PROCESS: 47,
  INSTANCE_OF: 48,
  INTEGRAL_CONSTANT: 49,
  INTEGRAL_CONSTANT_UNITS: 50,
  LIMIT_ENABLE: 52,
  LIST_OF_GROUP_MEMBERS: 53,
  LIST_OF_OBJECT_PROPERTY_REFERENCES: 54,
  LOCAL_DATE: 56,
  LOCAL_TIME: 57,
  LOCATION: 58,
  LOW_LIMIT: 59,
  MANIPULATED_VARIABLE_REFERENCE: 60,
  MAXIMUM_OUTPUT: 61,
  MAX_APDU_LENGTH_ACCEPTED: 62,
  MAX_INFO_FRAMES: 63,
  MAX_MASTER: 64,
  MAX_PRES_VALUE: 65,
  MINIMUM_OFF_TIME: 66,
  MINIMUM_ON_TIME: 67,
  MINIMUM_OUTPUT: 68,
  MIN_PRES_VALUE: 69,
  MODEL_NAME: 70,
  MODIFICATION_DATE: 71,
  NOTIFY_TYPE: 72,
  NUMBER_OF_APDU_RETRIES: 73,
  NUMBER_OF_STATES: 74,
  OBJECT_IDENTIFIER: 75,
  OBJECT_LIST: 76,
  OBJECT_NAME: 77,
  OBJECT_PROPERTY_REFERENCE: 78,
  OBJECT_TYPE: 79,
  OPTIONAL: 80,
  OUT_OF_SERVICE: 81,
  OUTPUT_UNITS: 82,
  EVENT_PARAMETERS: 83,
  POLARITY: 84,
  PRESENT_VALUE: 85,
  PRIORITY: 86,
  PRIORITY_ARRAY: 87,
  PRIORITY_FOR_WRITING: 88,
  PROCESS_IDENTIFIER: 89,
  PROGRAM_CHANGE: 90,
  PROGRAM_LOCATION: 91,
  PROGRAM_STATE: 92,
  PROPORTIONAL_CONSTANT: 93,
  PROPORTIONAL_CONSTANT_UNITS: 94,
  PROTOCOL_CONFORMANCE_CLASS: 95,
  PROTOCOL_OBJECT_TYPES_SUPPORTED: 96,
  PROTOCOL_SERVICES_SUPPORTED: 97,
  PROTOCOL_VERSION: 98,
  READ_ONLY: 99,
  REASON_FOR_HALT: 100,
  RECIPIENT: 101,
  RECIPIENT_LIST: 102,
  RELIABILITY: 103,
  RELINQUISH_DEFAULT: 104,
  REQUIRED: 105,
  RESOLUTION: 106,
  SEGMENTATION_SUPPORTED: 107,
  SETPOINT: 108,
  SETPOINT_REFERENCE: 109,
  STATE_TEXT: 110,
  STATUS_FLAGS: 111,
  SYSTEM_STATUS: 112,
  TIME_DELAY: 113,
  TIME_OF_ACTIVE_TIME_RESET: 114,
  TIME_OF_STATE_COUNT_RESET: 115,
  TIME_SYNCHRONIZATION_RECIPIENTS: 116,
  UNITS: 117,
  UPDATE_INTERVAL: 118,
  UTC_OFFSET: 119,
  VENDOR_IDENTIFIER: 120,
  VENDOR_NAME: 121,
  VT_CLASSES_SUPPORTED: 122,
  WEEKLY_SCHEDULE: 123,
  ATTEMPTED_SAMPLES: 124,
  AVERAGE_VALUE: 125,
  BUFFER_SIZE: 126,
  CLIENT_COV_INCREMENT: 127,
  COV_RESUBSCRIPTION_INTERVAL: 128,
  EVENT_TIME_STAMPS: 130,
  LOG_BUFFER: 131,
  LOG_DEVICE_OBJECT_PROPERTY: 132,
  ENABLE: 133,
  LOG_INTERVAL: 134,
  MAXIMUM_VALUE: 135,
  MINIMUM_VALUE: 136,
  NOTIFICATION_THRESHOLD: 137,
  PROTOCOL_REVISION: 139,
  RECORDS_SINCE_NOTIFICATION: 140,
  RECORD_COUNT: 141,
  START_TIME: 142,
  STOP_TIME: 143,
  STOP_WHEN_FULL: 144,
  TOTAL_RECORD_COUNT: 145,
  VALID_SAMPLES: 146,
  WINDOW_INTERVAL: 147,
  WINDOW_SAMPLES: 148,
  MAXIMUM_VALUE_TIMESTAMP: 149,
  MINIMUM_VALUE_TIMESTAMP: 150,
  VARIANCE_VALUE: 151,
  ACTIVE_COV_SUBSCRIPTIONS: 152,
  BACKUP_FAILURE_TIMEOUT: 153,
  CONFIGURATION_FILES: 154,
  DATABASE_REVISION: 155,
  DIRECT_READING: 156,
  LAST_RESTORE_TIME: 157,
  MAINTENANCE_REQUIRED: 158,
  MEMBER_OF: 159,
  MODE: 160,
  OPERATION_EXPECTED: 161,
  SETTING: 162,
  SILENCED: 163,
  TRACKING_VALUE: 164,
  ZONE_MEMBERS: 165,
  LIFE_SAFETY_ALARM_VALUES: 166,
  MAX_SEGMENTS_ACCEPTED: 167,
  PROFILE_NAME: 168,
  AUTO_SLAVE_DISCOVERY: 169,
  MANUAL_SLAVE_ADDRESS_BINDING: 170,
  SLAVE_ADDRESS_BINDING: 171,
  SLAVE_PROXY_ENABLE: 172,
  LAST_NOTIFY_RECORD: 173,
  SCHEDULE_DEFAULT: 174,
  ACCEPTED_MODES: 175,
  ADJUST_VALUE: 176,
  COUNT: 177,
  COUNT_BEFORE_CHANGE: 178,
  COUNT_CHANGE_TIME: 179,
  COV_PERIOD: 180,
  INPUT_REFERENCE: 181,
  LIMIT_MONITORING_INTERVAL: 182,
  LOGGING_OBJECT: 183,
  LOGGING_RECORD: 184,
  PRESCALE: 185,
  PULSE_RATE: 186,
  SCALE: 187,
  SCALE_FACTOR: 188,
  UPDATE_TIME: 189,
  VALUE_BEFORE_CHANGE: 190,
  VALUE_SET: 191,
  VALUE_CHANGE_TIME: 192,
  ALIGN_INTERVALS: 193,
  INTERVAL_OFFSET: 195,
  LAST_RESTART_REASON: 196,
  LOGGING_TYPE: 197,
  RESTART_NOTIFICATION_RECIPIENTS: 202,
  TIME_OF_DEVICE_RESTART: 203,
  TIME_SYNCHRONIZATION_INTERVAL: 204,
  TRIGGER: 205,
  UTC_TIME_SYNCHRONIZATION_RECIPIENTS: 206,
  NODE_SUBTYPE: 207,
  NODE_TYPE: 208,
  STRUCTURED_OBJECT_LIST: 209,
  SUBORDINATE_ANNOTATIONS: 210,
  SUBORDINATE_LIST: 211,
  ACTUAL_SHED_LEVEL: 212,
  DUTY_WINDOW: 213,
  EXPECTED_SHED_LEVEL: 214,
  FULL_DUTY_BASELINE: 215,
  REQUESTED_SHED_LEVEL: 218,
  SHED_DURATION: 219,
  SHED_LEVEL_DESCRIPTIONS: 220,
  SHED_LEVELS: 221,
  STATE_DESCRIPTION: 222,
  DOOR_ALARM_STATE: 226,
  DOOR_EXTENDED_PULSE_TIME: 227,
  DOOR_MEMBERS: 228,
  DOOR_OPEN_TOO_LONG_TIME: 229,
  DOOR_PULSE_TIME: 230,
  DOOR_STATUS: 231,
  DOOR_UNLOCK_DELAY_TIME: 232,
  LOCK_STATUS: 233,
  MASKED_ALARM_VALUES: 234,
  SECURED_STATUS: 235,
  ABSENTEE_LIMIT: 244,
  ACCESS_ALARM_EVENTS: 245,
  ACCESS_DOORS: 246,
  ACCESS_EVENT: 247,
  ACCESS_EVENT_AUTHENTICATION_FACTOR: 248,
  ACCESS_EVENT_CREDENTIAL: 249,
  ACCESS_EVENT_TIME: 250,
  ACCESS_TRANSACTION_EVENTS: 251,
  ACCOMPANIMENT: 252,
  ACCOMPANIMENT_TIME: 253,
  ACTIVATION_TIME: 254,
  ACTIVE_AUTHENTICATION_POLICY: 255,
  ASSIGNED_ACCESS_RIGHTS: 256,
  AUTHENTICATION_FACTORS: 257,
  AUTHENTICATION_POLICY_LIST: 258,
  AUTHENTICATION_POLICY_NAMES: 259,
  AUTHENTICATION_STATUS: 260,
  AUTHORIZATION_MODE: 261,
  BELONGS_TO: 262,
  CREDENTIAL_DISABLE: 263,
  CREDENTIAL_STATUS: 264,
  CREDENTIALS: 265,
  CREDENTIALS_IN_ZONE: 266,
  DAYS_REMAINING: 267,
  ENTRY_POINTS: 268,
  EXIT_POINTS: 269,
  EXPIRY_TIME: 270,
  EXTENDED_TIME_ENABLE: 271,
  FAILED_ATTEMPT_EVENTS: 272,
  FAILED_ATTEMPTS: 273,
  FAILED_ATTEMPTS_TIME: 274,
  LAST_ACCESS_EVENT: 275,
  LAST_ACCESS_POINT: 276,
  LAST_CREDENTIAL_ADDED: 277,
  LAST_CREDENTIAL_ADDED_TIME: 278,
  LAST_CREDENTIAL_REMOVED: 279,
  LAST_CREDENTIAL_REMOVED_TIME: 280,
  LAST_USE_TIME: 281,
  LOCKOUT: 282,
  LOCKOUT_RELINQUISH_TIME: 283,
  MAX_FAILED_ATTEMPTS: 285,
  MEMBERS: 286,
  MUSTER_POINT: 287,
  NEGATIVE_ACCESS_RULES: 288,
  NUMBER_OF_AUTHENTICATION_POLICIES: 289,
  OCCUPANCY_COUNT: 290,
  OCCUPANCY_COUNT_ADJUST: 291,
  OCCUPANCY_COUNT_ENABLE: 292,
  OCCUPANCY_LOWER_LIMIT: 294,
  OCCUPANCY_LOWER_LIMIT_ENFORCED: 295,
  OCCUPANCY_STATE: 296,
  OCCUPANCY_UPPER_LIMIT: 297,
  OCCUPANCY_UPPER_LIMIT_ENFORCED: 298,
  PASSBACK_MODE: 300,
  PASSBACK_TIMEOUT: 301,
  POSITIVE_ACCESS_RULES: 302,
  REASON_FOR_DISABLE: 303,
  SUPPORTED_FORMATS: 304,
  SUPPORTED_FORMAT_CLASSES: 305,
  THREAT_AUTHORITY: 306,
  THREAT_LEVEL: 307,
  TRACE_FLAG: 308,
  TRANSACTION_NOTIFICATION_CLASS: 309,
  USER_EXTERNAL_IDENTIFIER: 310,
  USER_INFORMATION_REFERENCE: 311,
  USER_NAME: 317,
  USER_TYPE: 318,
  USES_REMAINING: 319,
  ZONE_FROM: 320,
  ZONE_TO: 321,
  ACCESS_EVENT_TAG: 322,
  GLOBAL_IDENTIFIER: 323,
  VERIFICATION_TIME: 326,
  BASE_DEVICE_SECURITY_POLICY: 327,
  DISTRIBUTION_KEY_REVISION: 328,
  DO_NOT_HIDE: 329,
  KEY_SETS: 330,
  LAST_KEY_SERVER: 331,
  NETWORK_ACCESS_SECURITY_POLICIES: 332,
  PACKET_REORDER_TIME: 333,
  SECURITY_PDU_TIMEOUT: 334,
  SECURITY_TIME_WINDOW: 335,
  SUPPORTED_SECURITY_ALGORITHMS: 336,
  UPDATE_KEY_SET_TIMEOUT: 337,
  BACKUP_AND_RESTORE_STATE: 338,
  BACKUP_PREPARATION_TIME: 339,
  RESTORE_COMPLETION_TIME: 340,
  RESTORE_PREPARATION_TIME: 341,
  BIT_MASK: 342,
  BIT_TEXT: 343,
  IS_UTC: 344,
  GROUP_MEMBERS: 345,
  GROUP_MEMBER_NAMES: 346,
  MEMBER_STATUS_FLAGS: 347,
  REQUESTED_UPDATE_INTERVAL: 348,
  COVU_PERIOD: 349,
  COVU_RECIPIENTS: 350,
  EVENT_MESSAGE_TEXTS: 351,
  EVENT_MESSAGE_TEXTS_CONFIG: 352,
  EVENT_DETECTION_ENABLE: 353,
  EVENT_ALGORITHM_INHIBIT: 354,
  EVENT_ALGORITHM_INHIBIT_REF: 355,
  TIME_DELAY_NORMAL: 356,
  RELIABILITY_EVALUATION_INHIBIT: 357,
  FAULT_PARAMETERS: 358,
  FAULT_TYPE: 359,
  LOCAL_FORWARDING_ONLY: 360,
  PROCESS_IDENTIFIER_FILTER: 361,
  SUBSCRIBED_RECIPIENTS: 362,
  PORT_FILTER: 363,
  AUTHORIZATION_EXEMPTIONS: 364,
  ALLOW_GROUP_DELAY_INHIBIT: 365,
  CHANNEL_NUMBER: 366,
  CONTROL_GROUPS: 367,
  EXECUTION_DELAY: 368,
  LAST_PRIORITY: 369,
  WRITE_STATUS: 370,
  PROPERTY_LIST: 371,
  SERIAL_NUMBER: 372,
  BLINK_WARN_ENABLE: 373,
  DEFAULT_FADE_TIME: 374,
  DEFAULT_RAMP_RATE: 375,
  DEFAULT_STEP_INCREMENT: 376,
  EGRESS_TIME: 377,
  IN_PROGRESS: 378,
  INSTANTANEOUS_POWER: 379,
  LIGHTING_COMMAND: 380,
  LIGHTING_COMMAND_DEFAULT_PRIORITY: 381,
  MAX_ACTUAL_VALUE: 382,
  MIN_ACTUAL_VALUE: 383,
  POWER: 384,
  TRANSITION: 385,
  EGRESS_ACTIVE: 386,
};

function getLabel(devicePropertyType) {
  if (devicePropertyType == null) {
    return null;
  }

  switch (devicePropertyType) {
    case DevicePropertyType.ACKED_TRANSITIONS:
      return "acked-transitions";
    case DevicePropertyType.ACK_REQUIRED:
      return "ack-required";
    case DevicePropertyType.ACTION:
      return "action";
    case DevicePropertyType.ACTION_TEXT:
      return "action-text";
    case DevicePropertyType.ACTIVE_TEXT:
      return "active-text";
    case DevicePropertyType.ACTIVE_VT_SESSIONS:
      return "active-vt-sessions";
    case DevicePropertyType.ALARM_VALUE:
      return "alarm-value";
    case DevicePropertyType.ALARM_VALUES:
      return "alarm-values";
    case DevicePropertyType.ALL:
      return "all";
    case DevicePropertyType.ALL_WRITES_SUCCESSFUL:
      return "all-writes-successful";
    case DevicePropertyType.APDU_SEGMENT_TIMEOUT:
      return "apdu-segment-timeout";
    case DevicePropertyType.APDU_TIMEOUT:
      return "apdu-timeout";
    case DevicePropertyType.APPLICATION_SOFTWARE_VERSION:
      return "application-software-version";
    case DevicePropertyType.ARCHIVE:
      return "archive";
    case DevicePropertyType.BIAS:
      return "bias";
    case DevicePropertyType.CHANGE_OF_STATE_COUNT:
      return "change-of-state-count";
    case DevicePropertyType.CHANGE_OF_STATE_TIME:
      return "change-of-state-time";
    case DevicePropertyType.NOTIFICATION_CLASS:
      return "notification-class";
    case DevicePropertyType.CONTROLLED_VARIABLE_REFERENCE:
      return "controlled-variable-reference";
    case DevicePropertyType.CONTROLLED_VARIABLE_UNITS:
      return "controlled-variable-units";
    case DevicePropertyType.CONTROLLED_VARIABLE_VALUE:
      return "controlled-variable-value";
    case DevicePropertyType.COV_INCREMENT:
      return "cov-increment";
    case DevicePropertyType.DATE_LIST:
      return "date-list";
    case DevicePropertyType.DAYLIGHT_SAVINGS_STATUS:
      return "daylight-savings-status";
    case DevicePropertyType.DEADBAND:
      return "deadband";
    case DevicePropertyType.DERIVATIVE_CONSTANT:
      return "derivative-constant";
    case DevicePropertyType.DERIVATIVE_CONSTANT_UNITS:
      return "derivative-constant-units";
    case DevicePropertyType.DESCRIPTION:
      return "description";
    case DevicePropertyType.DESCRIPTION_OF_HALT:
      return "description-of-halt";
    case DevicePropertyType.DEVICE_ADDRESS_BINDING:
      return "device-address-binding";
    case DevicePropertyType.DEVICE_TYPE:
      return "device-type";
    case DevicePropertyType.EFFECTIVE_PERIOD:
      return "effective-period";
    case DevicePropertyType.ELAPSED_ACTIVE_TIME:
      return "elapsed-active-time";
    case DevicePropertyType.ERROR_LIMIT:
      return "error-limit";
    case DevicePropertyType.EVENT_ENABLE:
      return "event-enable";
    case DevicePropertyType.EVENT_STATE:
      return "event-state";
    case DevicePropertyType.EVENT_TYPE:
      return "event-type";
    case DevicePropertyType.EXCEPTION_SCHEDULE:
      return "exception-schedule";
    case DevicePropertyType.FAULT_VALUES:
      return "fault-values";
    case DevicePropertyType.FEEDBACK_VALUE:
      return "feedback-value";
    case DevicePropertyType.FILE_ACCESS_METHOD:
      return "file-access-method";
    case DevicePropertyType.FILE_SIZE:
      return "file-size";
    case DevicePropertyType.FILE_TYPE:
      return "file-type";
    case DevicePropertyType.FIRMWARE_REVISION:
      return "firmware-revision";
    case DevicePropertyType.HIGH_LIMIT:
      return "high-limit";
    case DevicePropertyType.INACTIVE_TEXT:
      return "inactive-text";
    case DevicePropertyType.IN_PROCESS:
      return "in-process";
    case DevicePropertyType.INSTANCE_OF:
      return "instance-of";
    case DevicePropertyType.INTEGRAL_CONSTANT:
      return "integral-constant";
    case DevicePropertyType.INTEGRAL_CONSTANT_UNITS:
      return "integral-constant-units";
    case DevicePropertyType.LIMIT_ENABLE:
      return "limit-enable";
    case DevicePropertyType.LIST_OF_GROUP_MEMBERS:
      return "list-of-group-members";
    case DevicePropertyType.LIST_OF_OBJECT_PROPERTY_REFERENCES:
      return "list-of-object-property-references";
    case DevicePropertyType.LOCAL_DATE:
      return "local-date";
    case DevicePropertyType.LOCAL_TIME:
      return "local-time";
    case DevicePropertyType.LOCATION:
      return "location";
    case DevicePropertyType.LOW_LIMIT:
      return "low-limit";
    case DevicePropertyType.MANIPULATED_VARIABLE_REFERENCE:
      return "manipulated-variable-reference";
    case DevicePropertyType.MAXIMUM_OUTPUT:
      return "maximum-output";
    case DevicePropertyType.MAX_APDU_LENGTH_ACCEPTED:
      return "max-apdu-length-accepted";
    case DevicePropertyType.MAX_INFO_FRAMES:
      return "max-info-frames";
    case DevicePropertyType.MAX_MASTER:
      return "max-master";
    case DevicePropertyType.MAX_PRES_VALUE:
      return "max-pres-value";
    case DevicePropertyType.MINIMUM_OFF_TIME:
      return "minimum-off-time";
    case DevicePropertyType.MINIMUM_ON_TIME:
      return "minimum-on-time";
    case DevicePropertyType.MINIMUM_OUTPUT:
      return "minimum-output";
    case DevicePropertyType.MIN_PRES_VALUE:
      return "min-pres-value";
    case DevicePropertyType.MODEL_NAME:
      return "model-name";
    case DevicePropertyType.MODIFICATION_DATE:
      return "modification-date";
    case DevicePropertyType.NOTIFY_TYPE:
      return "notify-type";
    case DevicePropertyType.NUMBER_OF_APDU_RETRIES:
      return "number-of-apdu-retries";
    case DevicePropertyType.NUMBER_OF_STATES:
      return "number-of-states";
    case DevicePropertyType.OBJECT_IDENTIFIER:
      return "object-identifier";
    case DevicePropertyType.OBJECT_LIST:
      return "object-list";
    case DevicePropertyType.OBJECT_NAME:
      return "object-name";
    case DevicePropertyType.OBJECT_PROPERTY_REFERENCE:
      return "object-property-reference";
    case DevicePropertyType.OBJECT_TYPE:
      return "object-type";
    case DevicePropertyType.OPTIONAL:
      return "optional";
    case DevicePropertyType.OUT_OF_SERVICE:
      return "out-of-service";
    case DevicePropertyType.OUTPUT_UNITS:
      return "output-units";
    case DevicePropertyType.EVENT_PARAMETERS:
      return "event-parameters";
    case DevicePropertyType.POLARITY:
      return "polarity";
    case DevicePropertyType.PRESENT_VALUE:
      return "present-value";
    case DevicePropertyType.PRIORITY:
      return "priority";
    case DevicePropertyType.PRIORITY_ARRAY:
      return "priority-array";
    case DevicePropertyType.PRIORITY_FOR_WRITING:
      return "priority-for-writing";
    case DevicePropertyType.PROCESS_IDENTIFIER:
      return "process-identifier";
    case DevicePropertyType.PROGRAM_CHANGE:
      return "program-change";
    case DevicePropertyType.PROGRAM_LOCATION:
      return "program-location";
    case DevicePropertyType.PROGRAM_STATE:
      return "program-state";
    case DevicePropertyType.PROPORTIONAL_CONSTANT:
      return "proportional-constant";
    case DevicePropertyType.PROPORTIONAL_CONSTANT_UNITS:
      return "proportional-constant-units";
    case DevicePropertyType.PROTOCOL_CONFORMANCE_CLASS:
      return "protocol-conformance-class";
    case DevicePropertyType.PROTOCOL_OBJECT_TYPES_SUPPORTED:
      return "protocol-object-types-supported";
    case DevicePropertyType.PROTOCOL_SERVICES_SUPPORTED:
      return "protocol-services-supported";
    case DevicePropertyType.PROTOCOL_VERSION:
      return "protocol-version";
    case DevicePropertyType.READ_ONLY:
      return "read-only";
    case DevicePropertyType.REASON_FOR_HALT:
      return "reason-for-halt";
    case DevicePropertyType.RECIPIENT:
      return "recipient";
    case DevicePropertyType.RECIPIENT_LIST:
      return "recipient-list";
    case DevicePropertyType.RELIABILITY:
      return "reliability";
    case DevicePropertyType.RELINQUISH_DEFAULT:
      return "relinquish-default";
    case DevicePropertyType.REQUIRED:
      return "required";
    case DevicePropertyType.RESOLUTION:
      return "resolution";
    case DevicePropertyType.SEGMENTATION_SUPPORTED:
      return "segmentation-supported";
    case DevicePropertyType.SETPOINT:
      return "setpoint";
    case DevicePropertyType.SETPOINT_REFERENCE:
      return "setpoint-reference";
    case DevicePropertyType.STATE_TEXT:
      return "state-text";
    case DevicePropertyType.STATUS_FLAGS:
      return "status-flags";
    case DevicePropertyType.SYSTEM_STATUS:
      return "system-status";
    case DevicePropertyType.TIME_DELAY:
      return "time-delay";
    case DevicePropertyType.TIME_OF_ACTIVE_TIME_RESET:
      return "time-of-active-time-reset";
    case DevicePropertyType.TIME_OF_STATE_COUNT_RESET:
      return "time-of-state-count-reset";
    case DevicePropertyType.TIME_SYNCHRONIZATION_RECIPIENTS:
      return "time-synchronization-recipients";
    case DevicePropertyType.UNITS:
      return "units";
    case DevicePropertyType.UPDATE_INTERVAL:
      return "update-interval";
    case DevicePropertyType.UTC_OFFSET:
      return "utc-offset";
    case DevicePropertyType.VENDOR_IDENTIFIER:
      return "vendor-identifier";
    case DevicePropertyType.VENDOR_NAME:
      return "vendor-name";
    case DevicePropertyType.VT_CLASSES_SUPPORTED:
      return "vt-classes-supported";
    case DevicePropertyType.WEEKLY_SCHEDULE:
      return "weekly-schedule";
    case DevicePropertyType.ATTEMPTED_SAMPLES:
      return "attempted-samples";
    case DevicePropertyType.AVERAGE_VALUE:
      return "average-value";
    case DevicePropertyType.BUFFER_SIZE:
      return "buffer-size";
    case DevicePropertyType.CLIENT_COV_INCREMENT:
      return "client-cov-increment";
    case DevicePropertyType.COV_RESUBSCRIPTION_INTERVAL:
      return "cov-resubscription-interval";
    case DevicePropertyType.EVENT_TIME_STAMPS:
      return "event-time-stamps";
    case DevicePropertyType.LOG_BUFFER:
      return "log-buffer";
    case DevicePropertyType.LOG_DEVICE_OBJECT_PROPERTY:
      return "log-device-object-property";
    case DevicePropertyType.ENABLE:
      return "enable";
    case DevicePropertyType.LOG_INTERVAL:
      return "log-interval";
    case DevicePropertyType.MAXIMUM_VALUE:
      return "maximum-value";
    case DevicePropertyType.MINIMUM_VALUE:
      return "minimum-value";
    case DevicePropertyType.NOTIFICATION_THRESHOLD:
      return "notification-threshold";
    case DevicePropertyType.PROTOCOL_REVISION:
      return "protocol-revision";
    case DevicePropertyType.RECORDS_SINCE_NOTIFICATION:
      return "records-since-notification";
    case DevicePropertyType.RECORD_COUNT:
      return "record-count";
    case DevicePropertyType.START_TIME:
      return "start-time";
    case DevicePropertyType.STOP_TIME:
      return "stop-time";
    case DevicePropertyType.STOP_WHEN_FULL:
      return "stop-when-full";
    case DevicePropertyType.TOTAL_RECORD_COUNT:
      return "total-record-count";
    case DevicePropertyType.VALID_SAMPLES:
      return "valid-samples";
    case DevicePropertyType.WINDOW_INTERVAL:
      return "window-interval";
    case DevicePropertyType.WINDOW_SAMPLES:
      return "window-samples";
    case DevicePropertyType.MAXIMUM_VALUE_TIMESTAMP:
      return "maximum-value-timestamp";
    case DevicePropertyType.MINIMUM_VALUE_TIMESTAMP:
      return "minimum-value-timestamp";
    case DevicePropertyType.VARIANCE_VALUE:
      return "variance-value";
    case DevicePropertyType.ACTIVE_COV_SUBSCRIPTIONS:
      return "active-cov-subscriptions";
    case DevicePropertyType.BACKUP_FAILURE_TIMEOUT:
      return "backup-failure-timeout";
    case DevicePropertyType.CONFIGURATION_FILES:
      return "configuration-files";
    case DevicePropertyType.DATABASE_REVISION:
      return "database-revision";
    case DevicePropertyType.DIRECT_READING:
      return "direct-reading";
    case DevicePropertyType.LAST_RESTORE_TIME:
      return "last-restore-time";
    case DevicePropertyType.MAINTENANCE_REQUIRED:
      return "maintenance-required";
    case DevicePropertyType.MEMBER_OF:
      return "member-of";
    case DevicePropertyType.MODE:
      return "mode";
    case DevicePropertyType.OPERATION_EXPECTED:
      return "operation-expected";
    case DevicePropertyType.SETTING:
      return "setting";
    case DevicePropertyType.SILENCED:
      return "silenced";
    case DevicePropertyType.TRACKING_VALUE:
      return "tracking-value";
    case DevicePropertyType.ZONE_MEMBERS:
      return "zone-members";
    case DevicePropertyType.LIFE_SAFETY_ALARM_VALUES:
      return "life-safety-alarm-values";
    case DevicePropertyType.MAX_SEGMENTS_ACCEPTED:
      return "max-segments-accepted";
    case DevicePropertyType.PROFILE_NAME:
      return "profile-name";
    case DevicePropertyType.AUTO_SLAVE_DISCOVERY:
      return "auto-slave-discovery";
    case DevicePropertyType.MANUAL_SLAVE_ADDRESS_BINDING:
      return "manual-slave-address-binding";
    case DevicePropertyType.SLAVE_ADDRESS_BINDING:
      return "slave-address-binding";
    case DevicePropertyType.SLAVE_PROXY_ENABLE:
      return "slave-proxy-enable";
    case DevicePropertyType.LAST_NOTIFY_RECORD:
      return "last-notify-record";
    case DevicePropertyType.SCHEDULE_DEFAULT:
      return "schedule-default";
    case DevicePropertyType.ACCEPTED_MODES:
      return "accepted-modes";
    case DevicePropertyType.ADJUST_VALUE:
      return "adjust-value";
    case DevicePropertyType.COUNT:
      return "count";
    case DevicePropertyType.COUNT_BEFORE_CHANGE:
      return "count-before-change";
    case DevicePropertyType.COUNT_CHANGE_TIME:
      return "count-change-time";
    case DevicePropertyType.COV_PERIOD:
      return "cov-period";
    case DevicePropertyType.INPUT_REFERENCE:
      return "input-reference";
    case DevicePropertyType.LIMIT_MONITORING_INTERVAL:
      return "limit-monitoring-interval";
    case DevicePropertyType.LOGGING_OBJECT:
      return "logging-object";
    case DevicePropertyType.LOGGING_RECORD:
      return "logging-record";
    case DevicePropertyType.PRESCALE:
      return "prescale";
    case DevicePropertyType.PULSE_RATE:
      return "pulse-rate";
    case DevicePropertyType.SCALE:
      return "scale";
    case DevicePropertyType.SCALE_FACTOR:
      return "scale-factor";
    case DevicePropertyType.UPDATE_TIME:
      return "update-time";
    case DevicePropertyType.VALUE_BEFORE_CHANGE:
      return "value-before-change";
    case DevicePropertyType.VALUE_SET:
      return "value-set";
    case DevicePropertyType.VALUE_CHANGE_TIME:
      return "value-change-time";
    case DevicePropertyType.ALIGN_INTERVALS:
      return "align-intervals";
    case DevicePropertyType.INTERVAL_OFFSET:
      return "interval-offset";
    case DevicePropertyType.LAST_RESTART_REASON:
      return "last-restart-reason";
    case DevicePropertyType.LOGGING_TYPE:
      return "logging-type";
    case DevicePropertyType.RESTART_NOTIFICATION_RECIPIENTS:
      return "restart-notification-recipients";
    case DevicePropertyType.TIME_OF_DEVICE_RESTART:
      return "time-of-device-restart";
    case DevicePropertyType.TIME_SYNCHRONIZATION_INTERVAL:
      return "time-synchronization-interval";
    case DevicePropertyType.TRIGGER:
      return "trigger";
    case DevicePropertyType.UTC_TIME_SYNCHRONIZATION_RECIPIENTS:
      return "utc-time-synchronization-recipients";
    case DevicePropertyType.NODE_SUBTYPE:
      return "node-subtype";
    case DevicePropertyType.NODE_TYPE:
      return "node-type";
    case DevicePropertyType.STRUCTURED_OBJECT_LIST:
      return "structured-object-list";
    case DevicePropertyType.SUBORDINATE_ANNOTATIONS:
      return "subordinate-annotations";
    case DevicePropertyType.SUBORDINATE_LIST:
      return "subordinate-list";
    case DevicePropertyType.ACTUAL_SHED_LEVEL:
      return "actual-shed-level";
    case DevicePropertyType.DUTY_WINDOW:
      return "duty-window";
    case DevicePropertyType.EXPECTED_SHED_LEVEL:
      return "expected-shed-level";
    case DevicePropertyType.FULL_DUTY_BASELINE:
      return "full-duty-baseline";
    case DevicePropertyType.REQUESTED_SHED_LEVEL:
      return "requested-shed-level";
    case DevicePropertyType.SHED_DURATION:
      return "shed-duration";
    case DevicePropertyType.SHED_LEVEL_DESCRIPTIONS:
      return "shed-level-descriptions";
    case DevicePropertyType.SHED_LEVELS:
      return "shed-levels";
    case DevicePropertyType.STATE_DESCRIPTION:
      return "state-description";
    case DevicePropertyType.DOOR_ALARM_STATE:
      return "door-alarm-state";
    case DevicePropertyType.DOOR_EXTENDED_PULSE_TIME:
      return "door-extended-pulse-time";
    case DevicePropertyType.DOOR_MEMBERS:
      return "door-members";
    case DevicePropertyType.DOOR_OPEN_TOO_LONG_TIME:
      return "door-open-too-long-time";
    case DevicePropertyType.DOOR_PULSE_TIME:
      return "door-pulse-time";
    case DevicePropertyType.DOOR_STATUS:
      return "door-status";
    case DevicePropertyType.DOOR_UNLOCK_DELAY_TIME:
      return "door-unlock-delay-time";
    case DevicePropertyType.LOCK_STATUS:
      return "lock-status";
    case DevicePropertyType.MASKED_ALARM_VALUES:
      return "masked-alarm-values";
    case DevicePropertyType.SECURED_STATUS:
      return "secured-status";
    case DevicePropertyType.ABSENTEE_LIMIT:
      return "absentee-limit";
    case DevicePropertyType.ACCESS_ALARM_EVENTS:
      return "access-alarm-events";
    case DevicePropertyType.ACCESS_DOORS:
      return "access-doors";
    case DevicePropertyType.ACCESS_EVENT:
      return "access-event";
    case DevicePropertyType.ACCESS_EVENT_AUTHENTICATION_FACTOR:
      return "access-event-authentication-factor";
    case DevicePropertyType.ACCESS_EVENT_CREDENTIAL:
      return "access-event-credential";
    case DevicePropertyType.ACCESS_EVENT_TIME:
      return "access-event-time";
    case DevicePropertyType.ACCESS_TRANSACTION_EVENTS:
      return "access-transaction-events";
    case DevicePropertyType.ACCOMPANIMENT:
      return "accompaniment";
    case DevicePropertyType.ACCOMPANIMENT_TIME:
      return "accompaniment-time";
    case DevicePropertyType.ACTIVATION_TIME:
      return "activation-time";
    case DevicePropertyType.ACTIVE_AUTHENTICATION_POLICY:
      return "active-authentication-policy";
    case DevicePropertyType.ASSIGNED_ACCESS_RIGHTS:
      return "assigned-access-rights";
    case DevicePropertyType.AUTHENTICATION_FACTORS:
      return "authentication-factors";
    case DevicePropertyType.AUTHENTICATION_POLICY_LIST:
      return "authentication-policy-list";
    case DevicePropertyType.AUTHENTICATION_POLICY_NAMES:
      return "authentication-policy-names";
    case DevicePropertyType.AUTHENTICATION_STATUS:
      return "authentication-status";
    case DevicePropertyType.AUTHORIZATION_MODE:
      return "authorization-mode";
    case DevicePropertyType.BELONGS_TO:
      return "belongs-to";
    case DevicePropertyType.CREDENTIAL_DISABLE:
      return "credential-disable";
    case DevicePropertyType.CREDENTIAL_STATUS:
      return "credential-status";
    case DevicePropertyType.CREDENTIALS:
      return "credentials";
    case DevicePropertyType.CREDENTIALS_IN_ZONE:
      return "credentials-in-zone";
    case DevicePropertyType.DAYS_REMAINING:
      return "days-remaining";
    case DevicePropertyType.ENTRY_POINTS:
      return "entry-points";
    case DevicePropertyType.EXIT_POINTS:
      return "exit-points";
    case DevicePropertyType.EXPIRY_TIME:
      return "expiry-time";
    case DevicePropertyType.EXTENDED_TIME_ENABLE:
      return "extended-time-enable";
    case DevicePropertyType.FAILED_ATTEMPT_EVENTS:
      return "failed-attempt-events";
    case DevicePropertyType.FAILED_ATTEMPTS:
      return "failed-attempts";
    case DevicePropertyType.FAILED_ATTEMPTS_TIME:
      return "failed-attempts-time";
    case DevicePropertyType.LAST_ACCESS_EVENT:
      return "last-access-event";
    case DevicePropertyType.LAST_ACCESS_POINT:
      return "last-access-point";
    case DevicePropertyType.LAST_CREDENTIAL_ADDED:
      return "last-credential-added";
    case DevicePropertyType.LAST_CREDENTIAL_ADDED_TIME:
      return "last-credential-added-time";
    case DevicePropertyType.LAST_CREDENTIAL_REMOVED:
      return "last-credential-removed";
    case DevicePropertyType.LAST_CREDENTIAL_REMOVED_TIME:
      return "last-credential-removed-time";
    case DevicePropertyType.LAST_USE_TIME:
      return "last-use-time";
    case DevicePropertyType.LOCKOUT:
      return "lockout";
    case DevicePropertyType.LOCKOUT_RELINQUISH_TIME:
      return "lockout-relinquish-time";
    case DevicePropertyType.MAX_FAILED_ATTEMPTS:
      return "max-failed-attempts";
    case DevicePropertyType.MEMBERS:
      return "members";
    case DevicePropertyType.MUSTER_POINT:
      return "muster-point";
    case DevicePropertyType.NEGATIVE_ACCESS_RULES:
      return "negative-access-rules";
    case DevicePropertyType.NUMBER_OF_AUTHENTICATION_POLICIES:
      return "number-of-authentication-policies";
    case DevicePropertyType.OCCUPANCY_COUNT:
      return "occupancy-count";
    case DevicePropertyType.OCCUPANCY_COUNT_ADJUST:
      return "occupancy-count-adjust";
    case DevicePropertyType.OCCUPANCY_COUNT_ENABLE:
      return "occupancy-count-enable";
    case DevicePropertyType.OCCUPANCY_LOWER_LIMIT:
      return "occupancy-lower-limit";
    case DevicePropertyType.OCCUPANCY_LOWER_LIMIT_ENFORCED:
      return "occupancy-lower-limit-enforced";
    case DevicePropertyType.OCCUPANCY_STATE:
      return "occupancy-state";
    case DevicePropertyType.OCCUPANCY_UPPER_LIMIT:
      return "occupancy-upper-limit";
    case DevicePropertyType.OCCUPANCY_UPPER_LIMIT_ENFORCED:
      return "occupancy-upper-limit-enforced";
    case DevicePropertyType.PASSBACK_MODE:
      return "passback-mode";
    case DevicePropertyType.PASSBACK_TIMEOUT:
      return "passback-timeout";
    case DevicePropertyType.POSITIVE_ACCESS_RULES:
      return "positive-access-rules";
    case DevicePropertyType.REASON_FOR_DISABLE:
      return "reason-for-disable";
    case DevicePropertyType.SUPPORTED_FORMATS:
      return "supported-formats";
    case DevicePropertyType.SUPPORTED_FORMAT_CLASSES:
      return "supported-format-classes";
    case DevicePropertyType.THREAT_AUTHORITY:
      return "threat-authority";
    case DevicePropertyType.THREAT_LEVEL:
      return "threat-level";
    case DevicePropertyType.TRACE_FLAG:
      return "trace-flag";
    case DevicePropertyType.TRANSACTION_NOTIFICATION_CLASS:
      return "transaction-notification-class";
    case DevicePropertyType.USER_EXTERNAL_IDENTIFIER:
      return "user-external-identifier";
    case DevicePropertyType.USER_INFORMATION_REFERENCE:
      return "user-information-reference";
    case DevicePropertyType.USER_NAME:
      return "user-name";
    case DevicePropertyType.USER_TYPE:
      return "user-type";
    case DevicePropertyType.USES_REMAINING:
      return "uses-remaining";
    case DevicePropertyType.ZONE_FROM:
      return "zone-from";
    case DevicePropertyType.ZONE_TO:
      return "zone-to";
    case DevicePropertyType.ACCESS_EVENT_TAG:
      return "access-event-tag";
    case DevicePropertyType.GLOBAL_IDENTIFIER:
      return "global-identifier";
    case DevicePropertyType.VERIFICATION_TIME:
      return "verification-time";
    case DevicePropertyType.BASE_DEVICE_SECURITY_POLICY:
      return "base-device-security-policy";
    case DevicePropertyType.DISTRIBUTION_KEY_REVISION:
      return "distribution-key-revision";
    case DevicePropertyType.DO_NOT_HIDE:
      return "do-not-hide";
    case DevicePropertyType.KEY_SETS:
      return "key-sets";
    case DevicePropertyType.LAST_KEY_SERVER:
      return "last-key-server";
    case DevicePropertyType.NETWORK_ACCESS_SECURITY_POLICIES:
      return "network-access-security-policies";
    case DevicePropertyType.PACKET_REORDER_TIME:
      return "packet-reorder-time";
    case DevicePropertyType.SECURITY_PDU_TIMEOUT:
      return "security-pdu-timeout";
    case DevicePropertyType.SECURITY_TIME_WINDOW:
      return "security-time-window";
    case DevicePropertyType.SUPPORTED_SECURITY_ALGORITHMS:
      return "supported-security-algorithms";
    case DevicePropertyType.UPDATE_KEY_SET_TIMEOUT:
      return "update-key-set-timeout";
    case DevicePropertyType.BACKUP_AND_RESTORE_STATE:
      return "backup-and-restore-state";
    case DevicePropertyType.BACKUP_PREPARATION_TIME:
      return "backup-preparation-time";
    case DevicePropertyType.RESTORE_COMPLETION_TIME:
      return "restore-completion-time";
    case DevicePropertyType.RESTORE_PREPARATION_TIME:
      return "restore-preparation-time";
    case DevicePropertyType.BIT_MASK:
      return "bit-mask";
    case DevicePropertyType.BIT_TEXT:
      return "bit-text";
    case DevicePropertyType.IS_UTC:
      return "is-utc";
    case DevicePropertyType.GROUP_MEMBERS:
      return "group-members";
    case DevicePropertyType.GROUP_MEMBER_NAMES:
      return "group-member-names";
    case DevicePropertyType.MEMBER_STATUS_FLAGS:
      return "member-status-flags";
    case DevicePropertyType.REQUESTED_UPDATE_INTERVAL:
      return "requested-update-interval";
    case DevicePropertyType.COVU_PERIOD:
      return "covu-period";
    case DevicePropertyType.COVU_RECIPIENTS:
      return "covu-recipients";
    case DevicePropertyType.EVENT_MESSAGE_TEXTS:
      return "event-message-texts";
    case DevicePropertyType.EVENT_MESSAGE_TEXTS_CONFIG:
      return "event-message-texts-config";
    case DevicePropertyType.EVENT_DETECTION_ENABLE:
      return "event-detection-enable";
    case DevicePropertyType.EVENT_ALGORITHM_INHIBIT:
      return "event-algorithm-inhibit";
    case DevicePropertyType.EVENT_ALGORITHM_INHIBIT_REF:
      return "event-algorithm-inhibit-ref";
    case DevicePropertyType.TIME_DELAY_NORMAL:
      return "time-delay-normal";
    case DevicePropertyType.RELIABILITY_EVALUATION_INHIBIT:
      return "reliability-evaluation-inhibit";
    case DevicePropertyType.FAULT_PARAMETERS:
      return "fault-parameters";
    case DevicePropertyType.FAULT_TYPE:
      return "fault-type";
    case DevicePropertyType.LOCAL_FORWARDING_ONLY:
      return "local-forwarding-only";
    case DevicePropertyType.PROCESS_IDENTIFIER_FILTER:
      return "process-identifier-filter";
    case DevicePropertyType.SUBSCRIBED_RECIPIENTS:
      return "subscribed-recipients";
    case DevicePropertyType.PORT_FILTER:
      return "port-filter";
    case DevicePropertyType.AUTHORIZATION_EXEMPTIONS:
      return "authorization-exemptions";
    case DevicePropertyType.ALLOW_GROUP_DELAY_INHIBIT:
      return "allow-group-delay-inhibit";
    case DevicePropertyType.CHANNEL_NUMBER:
      return "channel-number";
    case DevicePropertyType.CONTROL_GROUPS:
      return "control-groups";
    case DevicePropertyType.EXECUTION_DELAY:
      return "execution-delay";
    case DevicePropertyType.LAST_PRIORITY:
      return "last-priority";
    case DevicePropertyType.WRITE_STATUS:
      return "write-status";
    case DevicePropertyType.PROPERTY_LIST:
      return "property-list";
    case DevicePropertyType.SERIAL_NUMBER:
      return "serial-number";
    case DevicePropertyType.BLINK_WARN_ENABLE:
      return "blink-warn-enable";
    case DevicePropertyType.DEFAULT_FADE_TIME:
      return "default-fade-time";
    case DevicePropertyType.DEFAULT_RAMP_RATE:
      return "default-ramp-rate";
    case DevicePropertyType.DEFAULT_STEP_INCREMENT:
      return "default-step-increment";
    case DevicePropertyType.EGRESS_TIME:
      return "egress-time";
    case DevicePropertyType.IN_PROGRESS:
      return "in-progress";
    case DevicePropertyType.INSTANTANEOUS_POWER:
      return "instantaneous-power";
    case DevicePropertyType.LIGHTING_COMMAND:
      return "lighting-command";
    case DevicePropertyType.LIGHTING_COMMAND_DEFAULT_PRIORITY:
      return "lighting-command-default-priority";
    case DevicePropertyType.MAX_ACTUAL_VALUE:
      return "max-actual-value";
    case DevicePropertyType.MIN_ACTUAL_VALUE:
      return "min-actual-value";
    case DevicePropertyType.POWER:
      return "power";
    case DevicePropertyType.TRANSITION:
      return "transition";
    case DevicePropertyType.EGRESS_ACTIVE:
      return "egress-active";
  }
}

module.exports = { DevicePropertyType, getLabel };

// ACKED_TRANSITIONS: 0, "acked-transitions";
//   ACK_REQUIRED: 1, "ack-required";
//   ACTION: 2, "action";
//   ACTION_TEXT: 3, "action-text";
//   ACTIVE_TEXT: 4, "active-text";
//   ACTIVE_VT_SESSIONS: 5, "active-vt-sessions";
//   ALARM_VALUE: 6, "alarm-value";
//   ALARM_VALUES: 7, "alarm-values";
//   ALL: 8, "all";
//   ALL_WRITES_SUCCESSFUL: 9, "all-writes-successful";
//   APDU_SEGMENT_TIMEOUT: 10, "apdu-segment-timeout";
//   APDU_TIMEOUT: 11, "apdu-timeout";
//   APPLICATION_SOFTWARE_VERSION: 12, "application-software-version";
//   ARCHIVE: 13, "archive";
//   BIAS: 14, "bias";
//   CHANGE_OF_STATE_COUNT: 15, "change-of-state-count";
//   CHANGE_OF_STATE_TIME: 16, "change-of-state-time";
//   NOTIFICATION_CLASS: 17, "notification-class";
//   CONTROLLED_VARIABLE_REFERENCE: 19, "controlled-variable-reference";
//   CONTROLLED_VARIABLE_UNITS: 20, "controlled-variable-units";
//   CONTROLLED_VARIABLE_VALUE: 21, "controlled-variable-value";
//   COV_INCREMENT: 22, "cov-increment";
//   DATE_LIST: 23, "date-list";
//   DAYLIGHT_SAVINGS_STATUS: 24, "daylight-savings-status";
//   DEADBAND: 25, "deadband";
//   DERIVATIVE_CONSTANT: 26, "derivative-constant";
//   DERIVATIVE_CONSTANT_UNITS: 27, "derivative-constant-units";
//   DESCRIPTION: 28, "description";
//   DESCRIPTION_OF_HALT: 29, "description-of-halt";
//   DEVICE_ADDRESS_BINDING: 30, "device-address-binding";
//   DEVICE_TYPE: 31, "device-type";
//   EFFECTIVE_PERIOD: 32, "effective-period";
//   ELAPSED_ACTIVE_TIME: 33, "elapsed-active-time";
//   ERROR_LIMIT: 34, "error-limit";
//   EVENT_ENABLE: 35, "event-enable";
//   EVENT_STATE: 36, "event-state";
//   EVENT_TYPE: 37, "event-type";
//   EXCEPTION_SCHEDULE: 38, "exception-schedule";
//   FAULT_VALUES: 39, "fault-values";
//   FEEDBACK_VALUE: 40, "feedback-value";
//   FILE_ACCESS_METHOD: 41, "file-access-method";
//   FILE_SIZE: 42, "file-size";
//   FILE_TYPE: 43, "file-type";
//   FIRMWARE_REVISION: 44, "firmware-revision";
//   HIGH_LIMIT: 45, "high-limit";
//   INACTIVE_TEXT: 46, "inactive-text";
//   IN_PROCESS: 47, "in-process";
//   INSTANCE_OF: 48, "instance-of";
//   INTEGRAL_CONSTANT: 49, "integral-constant";
//   INTEGRAL_CONSTANT_UNITS: 50, "integral-constant-units";
//   LIMIT_ENABLE: 52, "limit-enable";
//   LIST_OF_GROUP_MEMBERS: 53, "list-of-group-members";
//   LIST_OF_OBJECT_PROPERTY_REFERENCES: 54, "list-of-object-property-references";
//   LOCAL_DATE: 56, "local-date";
//   LOCAL_TIME: 57, "local-time";
//   LOCATION: 58, "location";
//   LOW_LIMIT: 59, "low-limit";
//   MANIPULATED_VARIABLE_REFERENCE: 60, "manipulated-variable-reference";
//   MAXIMUM_OUTPUT: 61, "maximum-output";
//   MAX_APDU_LENGTH_ACCEPTED: 62, "max-apdu-length-accepted";
//   MAX_INFO_FRAMES: 63, "max-info-frames";
//   MAX_MASTER: 64, "max-master";
//   MAX_PRES_VALUE: 65, "max-pres-value";
//   MINIMUM_OFF_TIME: 66, "minimum-off-time";
//   MINIMUM_ON_TIME: 67, "minimum-on-time";
//   MINIMUM_OUTPUT: 68, "minimum-output";
//   MIN_PRES_VALUE: 69, "min-pres-value";
//   MODEL_NAME: 70, "model-name";
//   MODIFICATION_DATE: 71, "modification-date";
//   NOTIFY_TYPE: 72, "notify-type";
//   NUMBER_OF_APDU_RETRIES: 73, "number-of-apdu-retries";
//   NUMBER_OF_STATES: 74, "number-of-states";
//   OBJECT_IDENTIFIER: 75, "object-identifier";
//   OBJECT_LIST: 76, "object-list";
//   OBJECT_NAME: 77, "object-name";
//   OBJECT_PROPERTY_REFERENCE: 78, "object-property-reference";
//   OBJECT_TYPE: 79, "object-type";
//   OPTIONAL: 80, "optional";
//   OUT_OF_SERVICE: 81, "out-of-service";
//   OUTPUT_UNITS: 82, "output-units";
//   EVENT_PARAMETERS: 83, "event-parameters";
//   POLARITY: 84, "polarity";
//   PRESENT_VALUE: 85, "present-value";
//   PRIORITY: 86, "priority";
//   PRIORITY_ARRAY: 87, "priority-array";
//   PRIORITY_FOR_WRITING: 88, "priority-for-writing";
//   PROCESS_IDENTIFIER: 89, "process-identifier";
//   PROGRAM_CHANGE: 90, "program-change";
//   PROGRAM_LOCATION: 91, "program-location";
//   PROGRAM_STATE: 92, "program-state";
//   PROPORTIONAL_CONSTANT: 93, "proportional-constant";
//   PROPORTIONAL_CONSTANT_UNITS: 94, "proportional-constant-units";
//   PROTOCOL_CONFORMANCE_CLASS: 95, "protocol-conformance-class";
//   PROTOCOL_OBJECT_TYPES_SUPPORTED: 96, "protocol-object-types-supported";
//   PROTOCOL_SERVICES_SUPPORTED: 97, "protocol-services-supported";
//   PROTOCOL_VERSION: 98, "protocol-version";
//   READ_ONLY: 99, "read-only";
//   REASON_FOR_HALT: 100, "reason-for-halt";
//   RECIPIENT: 101, "recipient";
//   RECIPIENT_LIST: 102, "recipient-list";
//   RELIABILITY: 103, "reliability";
//   RELINQUISH_DEFAULT: 104, "relinquish-default";
//   REQUIRED: 105, "required";
//   RESOLUTION: 106, "resolution";
//   SEGMENTATION_SUPPORTED: 107, "segmentation-supported";
//   SETPOINT: 108, "setpoint";
//   SETPOINT_REFERENCE: 109, "setpoint-reference";
//   STATE_TEXT: 110, "state-text";
//   STATUS_FLAGS: 111, "status-flags";
//   SYSTEM_STATUS: 112, "system-status";
//   TIME_DELAY: 113, "time-delay";
//   TIME_OF_ACTIVE_TIME_RESET: 114, "time-of-active-time-reset";
//   TIME_OF_STATE_COUNT_RESET: 115, "time-of-state-count-reset";
//   TIME_SYNCHRONIZATION_RECIPIENTS: 116, "time-synchronization-recipients";
//   UNITS: 117, "units";
//   UPDATE_INTERVAL: 118, "update-interval";
//   UTC_OFFSET: 119, "utc-offset";
//   VENDOR_IDENTIFIER: 120, "vendor-identifier";
//   VENDOR_NAME: 121, "vendor-name";
//   VT_CLASSES_SUPPORTED: 122, "vt-classes-supported";
//   WEEKLY_SCHEDULE: 123, "weekly-schedule";
//   ATTEMPTED_SAMPLES: 124, "attempted-samples";
//   AVERAGE_VALUE: 125, "average-value";
//   BUFFER_SIZE: 126, "buffer-size";
//   CLIENT_COV_INCREMENT: 127, "client-cov-increment";
//   COV_RESUBSCRIPTION_INTERVAL: 128, "cov-resubscription-interval";
//   EVENT_TIME_STAMPS: 130, "event-time-stamps";
//   LOG_BUFFER: 131, "log-buffer";
//   LOG_DEVICE_OBJECT_PROPERTY: 132, "log-device-object-property";
//   ENABLE: 133, "enable";
//   LOG_INTERVAL: 134, "log-interval";
//   MAXIMUM_VALUE: 135, "maximum-value";
//   MINIMUM_VALUE: 136, "minimum-value";
//   NOTIFICATION_THRESHOLD: 137, "notification-threshold";
//   PROTOCOL_REVISION: 139, "protocol-revision";
//   RECORDS_SINCE_NOTIFICATION: 140, "records-since-notification";
//   RECORD_COUNT: 141, "record-count";
//   START_TIME: 142, "start-time";
//   STOP_TIME: 143, "stop-time";
//   STOP_WHEN_FULL: 144, "stop-when-full";
//   TOTAL_RECORD_COUNT: 145, "total-record-count";
//   VALID_SAMPLES: 146, "valid-samples";
//   WINDOW_INTERVAL: 147, "window-interval";
//   WINDOW_SAMPLES: 148, "window-samples";
//   MAXIMUM_VALUE_TIMESTAMP: 149, "maximum-value-timestamp";
//   MINIMUM_VALUE_TIMESTAMP: 150, "minimum-value-timestamp";
//   VARIANCE_VALUE: 151, "variance-value";
//   ACTIVE_COV_SUBSCRIPTIONS: 152, "active-cov-subscriptions";
//   BACKUP_FAILURE_TIMEOUT: 153, "backup-failure-timeout";
//   CONFIGURATION_FILES: 154, "configuration-files";
//   DATABASE_REVISION: 155, "database-revision";
//   DIRECT_READING: 156, "direct-reading";
//   LAST_RESTORE_TIME: 157, "last-restore-time";
//   MAINTENANCE_REQUIRED: 158, "maintenance-required";
//   MEMBER_OF: 159, "member-of";
//   MODE: 160, "mode";
//   OPERATION_EXPECTED: 161, "operation-expected";
//   SETTING: 162, "setting";
//   SILENCED: 163, "silenced";
//   TRACKING_VALUE: 164, "tracking-value";
//   ZONE_MEMBERS: 165, "zone-members";
//   LIFE_SAFETY_ALARM_VALUES: 166, "life-safety-alarm-values";
//   MAX_SEGMENTS_ACCEPTED: 167, "max-segments-accepted";
//   PROFILE_NAME: 168, "profile-name";
//   AUTO_SLAVE_DISCOVERY: 169, "auto-slave-discovery";
//   MANUAL_SLAVE_ADDRESS_BINDING: 170, "manual-slave-address-binding";
//   SLAVE_ADDRESS_BINDING: 171, "slave-address-binding";
//   SLAVE_PROXY_ENABLE: 172, "slave-proxy-enable";
//   LAST_NOTIFY_RECORD: 173, "last-notify-record";
//   SCHEDULE_DEFAULT: 174, "schedule-default";
//   ACCEPTED_MODES: 175, "accepted-modes";
//   ADJUST_VALUE: 176, "adjust-value";
//   COUNT: 177, "count";
//   COUNT_BEFORE_CHANGE: 178, "count-before-change";
//   COUNT_CHANGE_TIME: 179, "count-change-time";
//   COV_PERIOD: 180, "cov-period";
//   INPUT_REFERENCE: 181, "input-reference";
//   LIMIT_MONITORING_INTERVAL: 182, "limit-monitoring-interval";
//   LOGGING_OBJECT: 183, "logging-object";
//   LOGGING_RECORD: 184, "logging-record";
//   PRESCALE: 185, "prescale";
//   PULSE_RATE: 186, "pulse-rate";
//   SCALE: 187, "scale";
//   SCALE_FACTOR: 188, "scale-factor";
//   UPDATE_TIME: 189, "update-time";
//   VALUE_BEFORE_CHANGE: 190, "value-before-change";
//   VALUE_SET: 191, "value-set";
//   VALUE_CHANGE_TIME: 192, "value-change-time";
//   ALIGN_INTERVALS: 193, "align-intervals";
//   INTERVAL_OFFSET: 195, "interval-offset";
//   LAST_RESTART_REASON: 196, "last-restart-reason";
//   LOGGING_TYPE: 197, "logging-type";
//   RESTART_NOTIFICATION_RECIPIENTS: 202, "restart-notification-recipients";
//   TIME_OF_DEVICE_RESTART: 203, "time-of-device-restart";
//   TIME_SYNCHRONIZATION_INTERVAL: 204, "time-synchronization-interval";
//   TRIGGER: 205, "trigger";
//   UTC_TIME_SYNCHRONIZATION_RECIPIENTS:
//     206,
//     "utc-time-synchronization-recipients"
//   ),
//   NODE_SUBTYPE: 207, "node-subtype";
//   NODE_TYPE: 208, "node-type";
//   STRUCTURED_OBJECT_LIST: 209, "structured-object-list";
//   SUBORDINATE_ANNOTATIONS: 210, "subordinate-annotations";
//   SUBORDINATE_LIST: 211, "subordinate-list";
//   ACTUAL_SHED_LEVEL: 212, "actual-shed-level";
//   DUTY_WINDOW: 213, "duty-window";
//   EXPECTED_SHED_LEVEL: 214, "expected-shed-level";
//   FULL_DUTY_BASELINE: 215, "full-duty-baseline";
//   REQUESTED_SHED_LEVEL: 218, "requested-shed-level";
//   SHED_DURATION: 219, "shed-duration";
//   SHED_LEVEL_DESCRIPTIONS: 220, "shed-level-descriptions";
//   SHED_LEVELS: 221, "shed-levels";
//   STATE_DESCRIPTION: 222, "state-description";
//   DOOR_ALARM_STATE: 226, "door-alarm-state";
//   DOOR_EXTENDED_PULSE_TIME: 227, "door-extended-pulse-time";
//   DOOR_MEMBERS: 228, "door-members";
//   DOOR_OPEN_TOO_LONG_TIME: 229, "door-open-too-long-time";
//   DOOR_PULSE_TIME: 230, "door-pulse-time";
//   DOOR_STATUS: 231, "door-status";
//   DOOR_UNLOCK_DELAY_TIME: 232, "door-unlock-delay-time";
//   LOCK_STATUS: 233, "lock-status";
//   MASKED_ALARM_VALUES: 234, "masked-alarm-values";
//   SECURED_STATUS: 235, "secured-status";
//   ABSENTEE_LIMIT: 244, "absentee-limit";
//   ACCESS_ALARM_EVENTS: 245, "access-alarm-events";
//   ACCESS_DOORS: 246, "access-doors";
//   ACCESS_EVENT: 247, "access-event";
//   ACCESS_EVENT_AUTHENTICATION_FACTOR: 248, "access-event-authentication-factor";
//   ACCESS_EVENT_CREDENTIAL: 249, "access-event-credential";
//   ACCESS_EVENT_TIME: 250, "access-event-time";
//   ACCESS_TRANSACTION_EVENTS: 251, "access-transaction-events";
//   ACCOMPANIMENT: 252, "accompaniment";
//   ACCOMPANIMENT_TIME: 253, "accompaniment-time";
//   ACTIVATION_TIME: 254, "activation-time";
//   ACTIVE_AUTHENTICATION_POLICY: 255, "active-authentication-policy";
//   ASSIGNED_ACCESS_RIGHTS: 256, "assigned-access-rights";
//   AUTHENTICATION_FACTORS: 257, "authentication-factors";
//   AUTHENTICATION_POLICY_LIST: 258, "authentication-policy-list";
//   AUTHENTICATION_POLICY_NAMES: 259, "authentication-policy-names";
//   AUTHENTICATION_STATUS: 260, "authentication-status";
//   AUTHORIZATION_MODE: 261, "authorization-mode";
//   BELONGS_TO: 262, "belongs-to";
//   CREDENTIAL_DISABLE: 263, "credential-disable";
//   CREDENTIAL_STATUS: 264, "credential-status";
//   CREDENTIALS: 265, "credentials";
//   CREDENTIALS_IN_ZONE: 266, "credentials-in-zone";
//   DAYS_REMAINING: 267, "days-remaining";
//   ENTRY_POINTS: 268, "entry-points";
//   EXIT_POINTS: 269, "exit-points";
//   EXPIRY_TIME: 270, "expiry-time";
//   EXTENDED_TIME_ENABLE: 271, "extended-time-enable";
//   FAILED_ATTEMPT_EVENTS: 272, "failed-attempt-events";
//   FAILED_ATTEMPTS: 273, "failed-attempts";
//   FAILED_ATTEMPTS_TIME: 274, "failed-attempts-time";
//   LAST_ACCESS_EVENT: 275, "last-access-event";
//   LAST_ACCESS_POINT: 276, "last-access-point";
//   LAST_CREDENTIAL_ADDED: 277, "last-credential-added";
//   LAST_CREDENTIAL_ADDED_TIME: 278, "last-credential-added-time";
//   LAST_CREDENTIAL_REMOVED: 279, "last-credential-removed";
//   LAST_CREDENTIAL_REMOVED_TIME: 280, "last-credential-removed-time";
//   LAST_USE_TIME: 281, "last-use-time";
//   LOCKOUT: 282, "lockout";
//   LOCKOUT_RELINQUISH_TIME: 283, "lockout-relinquish-time";
//   MAX_FAILED_ATTEMPTS: 285, "max-failed-attempts";
//   MEMBERS: 286, "members";
//   MUSTER_POINT: 287, "muster-point";
//   NEGATIVE_ACCESS_RULES: 288, "negative-access-rules";
//   NUMBER_OF_AUTHENTICATION_POLICIES: 289, "number-of-authentication-policies";
//   OCCUPANCY_COUNT: 290, "occupancy-count";
//   OCCUPANCY_COUNT_ADJUST: 291, "occupancy-count-adjust";
//   OCCUPANCY_COUNT_ENABLE: 292, "occupancy-count-enable";
//   OCCUPANCY_LOWER_LIMIT: 294, "occupancy-lower-limit";
//   OCCUPANCY_LOWER_LIMIT_ENFORCED: 295, "occupancy-lower-limit-enforced";
//   OCCUPANCY_STATE: 296, "occupancy-state";
//   OCCUPANCY_UPPER_LIMIT: 297, "occupancy-upper-limit";
//   OCCUPANCY_UPPER_LIMIT_ENFORCED: 298, "occupancy-upper-limit-enforced";
//   PASSBACK_MODE: 300, "passback-mode";
//   PASSBACK_TIMEOUT: 301, "passback-timeout";
//   POSITIVE_ACCESS_RULES: 302, "positive-access-rules";
//   REASON_FOR_DISABLE: 303, "reason-for-disable";
//   SUPPORTED_FORMATS: 304, "supported-formats";
//   SUPPORTED_FORMAT_CLASSES: 305, "supported-format-classes";
//   THREAT_AUTHORITY: 306, "threat-authority";
//   THREAT_LEVEL: 307, "threat-level";
//   TRACE_FLAG: 308, "trace-flag";
//   TRANSACTION_NOTIFICATION_CLASS: 309, "transaction-notification-class";
//   USER_EXTERNAL_IDENTIFIER: 310, "user-external-identifier";
//   USER_INFORMATION_REFERENCE: 311, "user-information-reference";
//   USER_NAME: 317, "user-name";
//   USER_TYPE: 318, "user-type";
//   USES_REMAINING: 319, "uses-remaining";
//   ZONE_FROM: 320, "zone-from";
//   ZONE_TO: 321, "zone-to";
//   ACCESS_EVENT_TAG: 322, "access-event-tag";
//   GLOBAL_IDENTIFIER: 323, "global-identifier";
//   VERIFICATION_TIME: 326, "verification-time";
//   BASE_DEVICE_SECURITY_POLICY: 327, "base-device-security-policy";
//   DISTRIBUTION_KEY_REVISION: 328, "distribution-key-revision";
//   DO_NOT_HIDE: 329, "do-not-hide";
//   KEY_SETS: 330, "key-sets";
//   LAST_KEY_SERVER: 331, "last-key-server";
//   NETWORK_ACCESS_SECURITY_POLICIES: 332, "network-access-security-policies";
//   PACKET_REORDER_TIME: 333, "packet-reorder-time";
//   SECURITY_PDU_TIMEOUT: 334, "security-pdu-timeout";
//   SECURITY_TIME_WINDOW: 335, "security-time-window";
//   SUPPORTED_SECURITY_ALGORITHMS: 336, "supported-security-algorithms";
//   UPDATE_KEY_SET_TIMEOUT: 337, "update-key-set-timeout";
//   BACKUP_AND_RESTORE_STATE: 338, "backup-and-restore-state";
//   BACKUP_PREPARATION_TIME: 339, "backup-preparation-time";
//   RESTORE_COMPLETION_TIME: 340, "restore-completion-time";
//   RESTORE_PREPARATION_TIME: 341, "restore-preparation-time";
//   BIT_MASK: 342, "bit-mask";
//   BIT_TEXT: 343, "bit-text";
//   IS_UTC: 344, "is-utc";
//   GROUP_MEMBERS: 345, "group-members";
//   GROUP_MEMBER_NAMES: 346, "group-member-names";
//   MEMBER_STATUS_FLAGS: 347, "member-status-flags";
//   REQUESTED_UPDATE_INTERVAL: 348, "requested-update-interval";
//   COVU_PERIOD: 349, "covu-period";
//   COVU_RECIPIENTS: 350, "covu-recipients";
//   EVENT_MESSAGE_TEXTS: 351, "event-message-texts";
//   EVENT_MESSAGE_TEXTS_CONFIG: 352, "event-message-texts-config";
//   EVENT_DETECTION_ENABLE: 353, "event-detection-enable";
//   EVENT_ALGORITHM_INHIBIT: 354, "event-algorithm-inhibit";
//   EVENT_ALGORITHM_INHIBIT_REF: 355, "event-algorithm-inhibit-ref";
//   TIME_DELAY_NORMAL: 356, "time-delay-normal";
//   RELIABILITY_EVALUATION_INHIBIT: 357, "reliability-evaluation-inhibit";
//   FAULT_PARAMETERS: 358, "fault-parameters";
//   FAULT_TYPE: 359, "fault-type";
//   LOCAL_FORWARDING_ONLY: 360, "local-forwarding-only";
//   PROCESS_IDENTIFIER_FILTER: 361, "process-identifier-filter";
//   SUBSCRIBED_RECIPIENTS: 362, "subscribed-recipients";
//   PORT_FILTER: 363, "port-filter";
//   AUTHORIZATION_EXEMPTIONS: 364, "authorization-exemptions";
//   ALLOW_GROUP_DELAY_INHIBIT: 365, "allow-group-delay-inhibit";
//   CHANNEL_NUMBER: 366, "channel-number";
//   CONTROL_GROUPS: 367, "control-groups";
//   EXECUTION_DELAY: 368, "execution-delay";
//   LAST_PRIORITY: 369, "last-priority";
//   WRITE_STATUS: 370, "write-status";
//   PROPERTY_LIST: 371, "property-list";
//   SERIAL_NUMBER: 372, "serial-number";
//   BLINK_WARN_ENABLE: 373, "blink-warn-enable";
//   DEFAULT_FADE_TIME: 374, "default-fade-time";
//   DEFAULT_RAMP_RATE: 375, "default-ramp-rate";
//   DEFAULT_STEP_INCREMENT: 376, "default-step-increment";
//   EGRESS_TIME: 377, "egress-time";
//   IN_PROGRESS: 378, "in-progress";
//   INSTANTANEOUS_POWER: 379, "instantaneous-power";
//   LIGHTING_COMMAND: 380, "lighting-command";
//   LIGHTING_COMMAND_DEFAULT_PRIORITY: 381, "lighting-command-default-priority";
//   MAX_ACTUAL_VALUE: 382, "max-actual-value";
//   MIN_ACTUAL_VALUE: 383, "min-actual-value";
//   POWER: 384, "power";
//   TRANSITION: 385, "transition";
//   EGRESS_ACTIVE: 386, "egress-active");
