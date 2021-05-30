var dgram = require("dgram");

const VirtualLinkControl = require("./protocol/virtualinkcontrol.js");
const NPDU = require("./protocol/npdu.js");
const APDU = require("./protocol/apdu.js");
const MessageFactory = require("./protocol/messagefactory.js");
const UnconfirmedServiceChoice = require("./protocol/unconfirmedservicechoice.js");
const PDUType = require("./protocol/pdutype.js");

const Message = require("./transport/message.js");
const ObjectType = require("./protocol/objecttype.js");

const DeviceObject = require("./model/deviceobject.js");
const MessageToDeviceObjectConverter = require("./conversion/MessageToDeviceObjectConverter.js");

const DevicePropertyType = require("./protocol/devicepropertytype.js");

const util = require("./common/util.js");
const TagClass = require("./protocol/tagclass.js");
//const { ConsoleReporter } = require("jasmine");

// wireshark display filter: bacnet || bvlc || bacapp

// loytec local lan
//var DESTINATION_PORT = 47808;
//var DESTINATION_ADDRESS = "192.168.2.10";

// WAGO local lan
//var DESTINATION_PORT = 47808;
//var DESTINATION_ADDRESS = "192.168.26.154";

// broadcast loytec local lan
//var BROADCAST_LISTENING_PORT = 47808;
//var BROADCAST_ADDR = "192.168.2.255";

// local lan
const SOURCE_PORT = 12345;
//var SOURCE_PORT = 47808;

// for connecting from localhost to localhost you cannot bind to 127.0.0.1 but you must bind to 0.0.0.0 instead.
// Otherwise the connection will work!
// https://github.com/nodejs/node/issues/29047
const SOURCE_ADDRESS = "0.0.0.0";
//const SOURCE_ADDRESS = "127.0.0.1";
//const SOURCE_ADDRESS = "192.168.0.2";
//const SOURCE_ADDRESS = "192.168.0.234";

//const DESTINATION_PORT = 10002;
//const DESTINATION_PORT = 10036;
//const DESTINATION_PORT = 1026;
const DESTINATION_PORT = 47808;

const DESTINATION_ADDRESS = "0.0.0.0";
//const DESTINATION_ADDRESS = "127.0.0.1";
//const DESTINATION_ADDRESS = "192.168.0.1";
//const DESTINATION_ADDRESS = "192.168.0.108";
//const DESTINATION_ADDRESS = "192.168.0.234";

const BROADCAST_LISTENING_PORT = 47808;

//const BROADCAST_ADDR = "192.168.0.255";
const BROADCAST_ADDR = "192.168.0.255";

// for WAGO 750-831
//var BROADCAST_LISTENING_PORT = 47808;
//var BROADCAST_ADDR = "192.168.26.255";

// sends broadcast messages
var server = dgram.createSocket("udp4");

// listens for incoming broadcast messages
var client = dgram.createSocket("udp4");

// Request: 810a001301000005010c0c02002710194c2900
// objectType 8 is device
function requestObjectListSize(
  objectType,
  bacnetIdentifier,
  sourceAddress,
  sourcePort,
  targetAddress,
  targetPort
) {
  let deviceObject = new DeviceObject();
  deviceObject.objectType = objectType;
  deviceObject.bacnetIdentifier = bacnetIdentifier;

  let messageFactory = new MessageFactory();
  let message = messageFactory.objectListSize(deviceObject);

  let offset = 0;

  let payload = message.bytes;

  var socket = dgram.createSocket("udp4");

  // add handlers first, before sending a request
  socket.on("listening", function () {
    var address = socket.address();
    console.log(
      "UDP Server listening on " + address.address + ":" + address.port
    );
  });

  // add handlers first, before sending a request
  socket.on("message", function (message, remoteInfo) {
    console.log(
      "Response from " +
        remoteInfo.address +
        ":" +
        remoteInfo.port +
        " - " +
        util.byteArrayToHexString(message)
    );

    // response object list size - 810a0016010030010c0c020003e8194c29003e211d3f

    var offset = 0;

    var virtualLinkControl = new VirtualLinkControl();
    virtualLinkControl.fromBytes(message, offset);
    offset += virtualLinkControl.dataSizeInBuffer;

    var npdu = new NPDU();
    npdu.fromBytes(message, offset);
    offset += npdu.dataSizeInBuffer;

    var apdu = new APDU();
    apdu.fromBytes(message, offset);
    offset += apdu.dataSizeInBuffer;

    // incoming BACNet message
    var bacnetMessage = new Message();
    bacnetMessage.remoteInfo = remoteInfo;
    bacnetMessage.virtualLinkControl = virtualLinkControl;
    bacnetMessage.npdu = npdu;
    bacnetMessage.apdu = apdu;

    console.log("Incoming Message as String: " + bacnetMessage.asString);

    bacnetMessage.parseServiceParameters();

    socket.close();
    socket = null;
  });

  socket.bind(sourcePort, sourceAddress);

  // send a request and keep the socket open so the response can be retrieved
  socket.send(
    payload,
    offset,
    payload.length,
    targetPort,
    targetAddress,
    function () {
      console.log(
        "requestObjectListSize() Sent '" +
          util.byteArrayToHexString(payload) +
          "' Length = " +
          payload.length
      );
    }
  );

  setTimeout(() => {
    if (socket !== null) {
      socket.close();
    }
  }, 3000);
}
exports.requestObjectListSize = requestObjectListSize;

// requestObjectListSize(
//   8,
//   36,
//   SOURCE_ADDRESS,
//   SOURCE_PORT,
//   DESTINATION_ADDRESS,
//   DESTINATION_PORT
// );
//requestObjectListSize(8, 10000);
//requestObjectListSize(8, 1000);

// deviceType 8 is device
function requestObjectList(
  objectType,
  bacnetIdentifier,
  sourceAddress,
  sourcePort,
  targetAddress,
  targetPort
) {
  console.log("requestObjectList()");
  let deviceObject = new DeviceObject();
  deviceObject.objectType = objectType;
  deviceObject.bacnetIdentifier = bacnetIdentifier;

  let messageFactory = new MessageFactory();
  let message = messageFactory.objectList(deviceObject);

  let offset = 0;

  let payload = message.bytes;

  var socket = dgram.createSocket("udp4");

  // add handlers first, before sending a request
  socket.on("listening", function () {
    var address = socket.address();
    console.log(
      "UDP Server listening on " + address.address + ":" + address.port
    );
  });

  // add handlers first, before sending a request
  socket.on("message", function (message, remoteInfo) {
    console.log(
      "Response from " +
        remoteInfo.address +
        ":" +
        remoteInfo.port +
        " - " +
        util.byteArrayToHexString(message)
    );

    // response object list size - 810a0016010030010c0c020003e8194c29003e211d3f

    var offset = 0;

    var virtualLinkControl = new VirtualLinkControl();
    virtualLinkControl.fromBytes(message, offset);
    offset += virtualLinkControl.dataSizeInBuffer;

    var npdu = new NPDU();
    npdu.fromBytes(message, offset);
    offset += npdu.dataSizeInBuffer;

    var apdu = new APDU();
    apdu.fromBytes(message, offset);
    offset += apdu.dataSizeInBuffer;

    // incoming BACNet message
    var bacnetMessage = new Message();
    bacnetMessage.remoteInfo = remoteInfo;
    bacnetMessage.virtualLinkControl = virtualLinkControl;
    bacnetMessage.npdu = npdu;
    bacnetMessage.apdu = apdu;

    console.log("Incoming Message as String: " + bacnetMessage.asString);

    bacnetMessage.parseServiceParameters();

    console.log(bacnetMessage.asString);
  });

  console.log("bind() ...");
  socket.bind(sourcePort, sourceAddress, () => {
    console.log("bind() done.");
  });

  console.log(
    "requestObjectList() Sending to IP: " +
      targetAddress +
      " Port: " +
      targetPort
  );

  // send a request and keep the socket open so the response can be retrieved
  socket.send(
    payload,
    offset,
    payload.length,
    targetPort,
    targetAddress,
    function (error, bytes) {
      console.log(
        "Sent '" +
          util.byteArrayToHexString(payload) +
          "' Length = " +
          payload.length
      );
      console.log("error: '" + error + "' bytes = " + bytes);
    }
  );

  console.log("waiting ...");
  setTimeout(() => {
    console.log("waiting done.");
    socket.close();
  }, 1000);
}
exports.requestObjectList = requestObjectList;

// requestObjectList(
//   8,
//   36,
//   SOURCE_ADDRESS,
//   SOURCE_PORT,
//   DESTINATION_ADDRESS,
//   DESTINATION_PORT
// );
//requestObjectList(8, 36);
//requestObjectList(8, 10000);
//requestObjectList(8, 1000);

function requestAllProperties(
  objectType,
  bacnetIdentifier,
  sourceAddress,
  sourcePort,
  targetAddress,
  targetPort
) {
  var socket = dgram.createSocket("udp4");

  // add handlers first, before sending a request
  socket.on("listening", function () {
    var address = socket.address();
    console.log(
      "UDP Server listening on " + address.address + ":" + address.port
    );
  });

  // add handlers first, before sending a request
  socket.on("message", function (message, remoteInfo) {
    // DEBUG - output the raw data
    // console.log(
    //   "Response from " +
    //     remoteInfo.address +
    //     ":" +
    //     remoteInfo.port +
    //     " - " +
    //     util.byteArrayToHexString(message)
    // );

    // response object list size - 810a0016010030010c0c020003e8194c29003e211d3f

    var offset = 0;

    var virtualLinkControl = new VirtualLinkControl();
    virtualLinkControl.fromBytes(message, offset);
    offset += virtualLinkControl.dataSizeInBuffer;

    var npdu = new NPDU();
    npdu.fromBytes(message, offset);
    offset += npdu.dataSizeInBuffer;

    var apdu = new APDU();
    apdu.fromBytes(message, offset);
    offset += apdu.dataSizeInBuffer;

    // incoming BACNet message
    var bacnetMessage = new Message();
    bacnetMessage.remoteInfo = remoteInfo;
    bacnetMessage.virtualLinkControl = virtualLinkControl;
    bacnetMessage.npdu = npdu;
    bacnetMessage.apdu = apdu;

    //console.log("Incoming Message as String: " + bacnetMessage.asString);

    bacnetMessage.parseServiceParameters();

    console.log("requestAllProperties() " + bacnetMessage.asString);
  });

  //var port = SOURCE_PORT;
  //var port = 47808;
  //var host = SOURCE_ADDRESS;
  socket.bind(sourcePort, sourceAddress);

  let deviceObject = new DeviceObject();
  deviceObject.objectType = objectType;
  deviceObject.bacnetIdentifier = bacnetIdentifier;

  let messageFactory = new MessageFactory();
  let message = messageFactory.propertiesAll(deviceObject);

  let offset = 0;

  let payload = message.bytes;

  // send a request and keep the socket open so the response can be retrieved
  socket.send(
    payload,
    offset,
    payload.length,
    targetPort,
    targetAddress,
    function () {
      console.log(
        "Sent '" +
          util.byteArrayToHexString(payload) +
          "' Length = " +
          payload.length
      );
    }
  );

  console.log("waiting ...");
  setTimeout(() => {
    console.log("waiting done.");
    socket.close();
  }, 1000);
}
exports.requestAllProperties = requestAllProperties;

// object-type: device (8) - bacnet identifier: 25
// object-type: multistate value (19) - bacnet identifier: 1 - name: 'module_type' - Present Value can not be written! module_type is the value that the IO420 was configured as using the ST220 (Service Terminal 220)
// object-type: multistate value (19) - bacnet identifier: 2 - name: 'alarm_TZ320'
// object-type: multistate value (19) - bacnet identifier: 3 - name: 'TZ320_state'
// object-type: multistate value (19) - bacnet identifier: 4 - name: 'TZ320_command'
// object-type: binary-input (3) - bacnet identifier: 1 - name: 'lock-state' - why is the name of a binary-input 'lock-state'? (Setting the Out Of Service mode is possible)
// object-type: binary-input (3) - bacnet identifier: 2 - name: 'close-state' - why is the name of a binary-input 'close-state'? (Setting the Out Of Service mode is possible
// object-type: notification-class (15) - bacnet identifier: 40 - What does this do?

//requestAllProperties(8, 2);
// requestAllProperties(
//   8,
//   36,
//   SOURCE_ADDRESS,
//   SOURCE_PORT,
//   DESTINATION_ADDRESS,
//   DESTINATION_PORT
// );
//requestAllProperties(8, 25); // only works with destination specifier in NPDU!
//requestAllProperties(19, 1); // object type: multistate value (19)
//requestAllProperties(19, 2); // object type: multistate value (19)
//requestAllProperties(19, 3); // object type: multistate value (19), 'TZ320_state'
//requestAllProperties(19, 4); // object type: multistate value (19)
//requestAllProperties(8, 10000); // only works with destination specifier in NPDU!
//requestAllProperties(17, 0);

function requestProperty(
  objectType,
  bacnetIdentifier,
  deviceProperty,
  sourceAddress,
  sourcePort,
  targetAddress,
  targetPort
) {
  var socket = dgram.createSocket("udp4");

  // add handlers first, before sending a request
  socket.on("listening", function () {
    var address = socket.address();
    console.log(
      "UDP Server listening on " + address.address + ":" + address.port
    );
  });

  // add handlers first, before sending a request
  socket.on("message", function (message, remoteInfo) {
    var offset = 0;

    var virtualLinkControl = new VirtualLinkControl();
    virtualLinkControl.fromBytes(message, offset);
    offset += virtualLinkControl.dataSizeInBuffer;

    var npdu = new NPDU();
    npdu.fromBytes(message, offset);
    offset += npdu.dataSizeInBuffer;

    var apdu = new APDU();
    apdu.fromBytes(message, offset);
    offset += apdu.dataSizeInBuffer;

    // incoming BACNet message
    var bacnetMessage = new Message();
    bacnetMessage.remoteInfo = remoteInfo;
    bacnetMessage.virtualLinkControl = virtualLinkControl;
    bacnetMessage.npdu = npdu;
    bacnetMessage.apdu = apdu;

    //console.log("Incoming Message as String: " + bacnetMessage.asString);

    bacnetMessage.parseServiceParameters();

    console.log("requestAllProperties() Response: " + bacnetMessage.asString);

    socket.close();
    socket = null;
  });

  socket.bind(sourcePort, sourceAddress);

  let deviceObject = new DeviceObject();
  deviceObject.objectType = objectType;
  deviceObject.bacnetIdentifier = bacnetIdentifier;

  let messageFactory = new MessageFactory();
  let message = messageFactory.property(deviceObject, deviceProperty);

  let offset = 0;

  let payload = message.bytes;

  // send a request and keep the socket open so the response can be retrieved
  socket.send(
    payload,
    offset,
    payload.length,
    targetPort,
    targetAddress,
    function () {
      console.log(
        "Sent '" +
          util.byteArrayToHexString(payload) +
          "' Length = " +
          payload.length
      );
    }
  );

  //   setTimeout(() => {
  //     if (socket !== null) {
  //       socket.close();
  //     }
  //   }, 3000);
}
exports.requestProperty = requestProperty;

// requestProperty(
//   8,
//   2,
//   DevicePropertyType.DevicePropertyType.VENDOR_IDENTIFIER,
//   SOURCE_ADDRESS,
//   SOURCE_PORT,
//   DESTINATION_ADDRESS,
//   DESTINATION_PORT
// );
//requestProperty(8, 2, DevicePropertyType.DevicePropertyType.VENDOR_NAME);
// requestProperty(
//   8,
//   2,
//   DevicePropertyType.DevicePropertyType.MAX_APDU_LENGTH_ACCEPTED
// );
//requestProperty(8, 2, DevicePropertyType.DevicePropertyType.READ_ONLY);

function writeProperty(objectType, bacnetIdentifier, value) {
  var socket = dgram.createSocket("udp4");

  // add handlers first, before sending a request
  socket.on("listening", function () {
    var address = socket.address();
    console.log(
      "UDP Server listening on " + address.address + ":" + address.port
    );
  });

  // add handlers first, before sending a request
  socket.on("message", function (message, remoteInfo) {
    // DEBUG - output the raw data
    // console.log(
    //   "Response from " +
    //     remoteInfo.address +
    //     ":" +
    //     remoteInfo.port +
    //     " - " +
    //     util.byteArrayToHexString(message)
    // );

    // response object list size - 810a0016010030010c0c020003e8194c29003e211d3f

    var offset = 0;

    var virtualLinkControl = new VirtualLinkControl();
    virtualLinkControl.fromBytes(message, offset);
    offset += virtualLinkControl.dataSizeInBuffer;

    var npdu = new NPDU();
    npdu.fromBytes(message, offset);
    offset += npdu.dataSizeInBuffer;

    var apdu = new APDU();
    apdu.fromBytes(message, offset);
    offset += apdu.dataSizeInBuffer;

    // incoming BACNet message
    var bacnetMessage = new Message();
    bacnetMessage.remoteInfo = remoteInfo;
    bacnetMessage.virtualLinkControl = virtualLinkControl;
    bacnetMessage.npdu = npdu;
    bacnetMessage.apdu = apdu;

    //console.log("Incoming Message as String: " + bacnetMessage.asString);

    bacnetMessage.parseServiceParameters();

    //console.log("writeProperty() " + bacnetMessage.asString);
  });

  let deviceObject = new DeviceObject();
  deviceObject.objectType = objectType;
  deviceObject.bacnetIdentifier = bacnetIdentifier;

  let messageFactory = new MessageFactory();
  let message = messageFactory.writeProperty(deviceObject, value);

  let offset = 0;

  let payload = message.bytes;

  // send a request and keep the socket open so the response can be retrieved
  socket.send(
    payload,
    offset,
    payload.length,
    DESTINATION_PORT,
    DESTINATION_ADDRESS,
    function () {
      console.log(
        "writeProperty() Sent '" +
          util.byteArrayToHexString(payload) +
          "' Length = " +
          payload.length
      );
    }
  );
}

// 0x00 - ERROR: value out of range
//writeProperty(19, 4, 0x00);

// 0x01 - no command (Nothing happens when this value is written to the property)
//writeProperty(19, 4, 0x01);

// 0x02 - unlock TZ320
//writeProperty(19, 4, 0x02); // 19 = multi-state-value, 4 = bacnet instance number

// 0x03 - lock TZ320
//writeProperty(19, 4, 0x03); // 19 = multi-state-value, 4 = bacnet instance number

// 0x04 -  Kurzzeitfreigabe TZ320 (For the KZF to actually activate, the lock has to be in locked state)
//writeProperty(19, 4, 0x04); // 19 = multi-state-value, 4 = bacnet instance number

// https:stackoverflow.com/questions/6177423/send-broadcast-datagram
function broadcastWhoIs() {
  //var message = Buffer.from("Broadcast message!");
  //var message = Buffer.from("810b000801001008", "hex");
  //var message = new Buffer([0x81, 0x0b, 0x00, 0x08, 0x01, 0x00, 0x10, 0x08]);

  console.log("broadcastWhoIs()");

  let messageFactory = new MessageFactory();
  let whoIsMessage = messageFactory.whoIs();

  //   // 810b000801001008
  //   console.log(
  //     "This is the message: " +
  //       whoIsMessage.asString +
  //       " asHex: " +
  //       byteArrayToHexString(whoIsMessage.bytes)
  //   );

  let payload = whoIsMessage.bytes;

  // wireshark display filter: bacnet || bvlc || bacapp
  server.send(
    //message,
    payload,
    0,
    payload.length,
    DESTINATION_PORT,
    BROADCAST_ADDR,
    function () {
      //console.log("broadcastWhoIs() Sent '" + byteArrayToHexString(whoIsMessage.bytes) + "'");
    }
  );
}

//broadcastWhoIs();

/** Sends COVSubscription over a socket that is later reused to receive the COV messages and also to renew the subscriptions */
function covSubscription(
  socket,
  objectType,
  bacnetIdentifier,
  invokeId,
  subscriptionLifetimeInSeconds
) {
  let deviceObject = new DeviceObject();
  deviceObject.objectType = objectType;
  deviceObject.bacnetIdentifier = bacnetIdentifier;

  let messageFactory = new MessageFactory();
  let message = messageFactory.subscribeCOV(
    deviceObject,
    invokeId,
    subscriptionLifetimeInSeconds
  );

  let offset = 0;

  let payload = message.bytes;

  // send a request and keep the socket open so the response can be retrieved
  socket.send(
    payload,
    offset,
    payload.length,
    DESTINATION_PORT,
    DESTINATION_ADDRESS,
    function () {
      console.log(
        "covSubscription() Sent '" +
          util.byteArrayToHexString(payload) +
          "' Length = " +
          payload.length
      );
    }
  );
}

function subscribeCOV(objectType, bacnetIdentifier) {
  var socket = dgram.createSocket("udp4");

  // add handlers first, before sending a request
  socket.on("listening", function () {
    var address = socket.address();
    console.log(
      "subscribeCOV() UDP Server listening on " +
        address.address +
        ":" +
        address.port
    );
  });

  // add handlers first, before sending a request
  socket.on("message", function (message, remoteInfo) {
    // DEBUG - output the raw data
    // console.log(
    //   "Response from " +
    //     remoteInfo.address +
    //     ":" +
    //     remoteInfo.port +
    //     " - " +
    //     util.byteArrayToHexString(message)
    // );

    // response object list size - 810a0016010030010c0c020003e8194c29003e211d3f

    var offset = 0;

    var virtualLinkControl = new VirtualLinkControl();
    virtualLinkControl.fromBytes(message, offset);
    offset += virtualLinkControl.dataSizeInBuffer;

    var npdu = new NPDU();
    npdu.fromBytes(message, offset);
    offset += npdu.dataSizeInBuffer;

    var apdu = new APDU();
    apdu.fromBytes(message, offset);
    offset += apdu.dataSizeInBuffer;

    // incoming BACNet message
    var bacnetMessage = new Message();
    bacnetMessage.remoteInfo = remoteInfo;
    bacnetMessage.virtualLinkControl = virtualLinkControl;
    bacnetMessage.npdu = npdu;
    bacnetMessage.apdu = apdu;

    //console.log("Incoming Message as String: " + bacnetMessage.asString);

    bacnetMessage.parseServiceParameters();

    //console.log(bacnetMessage.asString);

    if (
      bacnetMessage.apdu.unconfirmedServiceChoice ==
      UnconfirmedServiceChoice.UnconfirmedServiceChoice
        .UNCONFIRMED_COV_NOTIFICATION
    ) {
      console.log("COV-Notification received!");

      // object identifier of parent object
      let parentObjectServiceParameter =
        bacnetMessage.apdu.serviceParameters[1];

      let data =
        ((parentObjectServiceParameter.payload[0] & 0xff) << 24) |
        ((parentObjectServiceParameter.payload[1] & 0xff) << 16) |
        ((parentObjectServiceParameter.payload[2] & 0xff) << 8) |
        ((parentObjectServiceParameter.payload[3] & 0xff) << 0);

      let objectType = (data & (1023 << 22)) >> 22;
      let bacnetIdentifier = (data & (4194303 << 0)) >> 0;

      console.log(
        ">>>>> OBJECT_IDENTIFIER_CODE objectType = " +
          ObjectType.getLabel(objectType) +
          " (" +
          objectType +
          ") " +
          " bacnetIdentifier = " +
          bacnetIdentifier
      );

      // object identifier of child object
      let childObjectServiceParameter = bacnetMessage.apdu.serviceParameters[2];

      data =
        ((childObjectServiceParameter.payload[0] & 0xff) << 24) |
        ((childObjectServiceParameter.payload[1] & 0xff) << 16) |
        ((childObjectServiceParameter.payload[2] & 0xff) << 8) |
        ((childObjectServiceParameter.payload[3] & 0xff) << 0);

      objectType = (data & (1023 << 22)) >> 22;
      bacnetIdentifier = (data & (4194303 << 0)) >> 0;

      console.log(
        ">>>>> OBJECT_IDENTIFIER_CODE objectType = " +
          ObjectType.getLabel(objectType) +
          " (" +
          objectType +
          ") " +
          " bacnetIdentifier = " +
          bacnetIdentifier
      );

      for (let i = 0; i < bacnetMessage.apdu.serviceParameters.length; i++) {
        let serviceParameter = bacnetMessage.apdu.serviceParameters[i];

        // look for the present value
        if (serviceParameter.tagClass == TagClass.APPLICATION_TAG) {
          if (serviceParameter.tagNumber == 2) {
            console.log("Present-Value: " + serviceParameter.payload[0]);

            // 1 = unlock
            // 2 = time switch active
            // 3 = pre-lock
            // 4 = lock
            // 5 = burglar-lock
            // 6 = short time released
            // 7 = service mode
            // 8 = alarm active
            // 9 = active sluice
            // 10 = passive sluice
            // 11 = sluice busy
          }
        }
      }
    }
  });

  var port = SOURCE_PORT;
  var host = SOURCE_ADDRESS;
  socket.bind(port, host);

  let invokeId = 0;
  let subscriptionLifetimeInSeconds = 10;

  console.log(
    "COV subscribing for " + subscriptionLifetimeInSeconds + " seconds"
  );

  // initial subscribe to object-type: multistate value (19) - bacnet identifier: 3 - name: 'TZ320_state'
  invokeId++;
  covSubscription(
    socket,
    objectType,
    bacnetIdentifier,
    invokeId,
    subscriptionLifetimeInSeconds
  );

  setInterval(function () {
    console.log(
      "COV subscribing for " + subscriptionLifetimeInSeconds + " seconds"
    );

    // subscribe to object-type: multistate value (19) - bacnet identifier: 3 - name: 'TZ320_state'
    invokeId++;
    covSubscription(
      socket,
      objectType,
      bacnetIdentifier,
      invokeId,
      subscriptionLifetimeInSeconds
    );
  }, (subscriptionLifetimeInSeconds - 3) * 1000);
}

//subscribeCOV(19, 3);
//subscribeCOV(19, 3);

function activeCOVSubscriptions(objectType, bacnetIdentifier, invokeId) {
  var socket = dgram.createSocket("udp4");

  // add handlers first, before sending a request
  socket.on("listening", function () {
    var address = socket.address();
    console.log(
      "UDP Server listening on " + address.address + ":" + address.port
    );
  });

  // add handlers first, before sending a request
  socket.on("message", function (message, remoteInfo) {
    // DEBUG - output the raw data
    // console.log(
    //   "Response from " +
    //     remoteInfo.address +
    //     ":" +
    //     remoteInfo.port +
    //     " - " +
    //     util.byteArrayToHexString(message)
    // );

    // response object list size - 810a0016010030010c0c020003e8194c29003e211d3f

    var offset = 0;

    var virtualLinkControl = new VirtualLinkControl();
    virtualLinkControl.fromBytes(message, offset);
    offset += virtualLinkControl.dataSizeInBuffer;

    var npdu = new NPDU();
    npdu.fromBytes(message, offset);
    offset += npdu.dataSizeInBuffer;

    var apdu = new APDU();
    apdu.fromBytes(message, offset);
    offset += apdu.dataSizeInBuffer;

    // incoming BACNet message
    var bacnetMessage = new Message();
    bacnetMessage.remoteInfo = remoteInfo;
    bacnetMessage.virtualLinkControl = virtualLinkControl;
    bacnetMessage.npdu = npdu;
    bacnetMessage.apdu = apdu;

    //console.log("Incoming Message as String: " + bacnetMessage.asString);

    bacnetMessage.parseServiceParameters();

    console.log("activeCOVSubscriptions() " + bacnetMessage.asString);
  });

  let deviceObject = new DeviceObject();
  deviceObject.objectType = objectType;
  deviceObject.bacnetIdentifier = bacnetIdentifier;

  let messageFactory = new MessageFactory();
  let message = messageFactory.activeCOVSubscriptions(deviceObject, invokeId);

  let offset = 0;

  let payload = message.bytes;

  // send a request and keep the socket open so the response can be retrieved
  socket.send(
    payload,
    offset,
    payload.length,
    DESTINATION_PORT,
    DESTINATION_ADDRESS,
    function () {
      console.log(
        "activeCOVSubscriptions() Sent '" +
          util.byteArrayToHexString(payload) +
          "' Length = " +
          payload.length
      );
    }
  );
}

//activeCOVSubscriptions(19, 1, 1);
//activeCOVSubscriptions(19, 2, 1);
//activeCOVSubscriptions(19, 3, 1);
//activeCOVSubscriptions(19, 4, 1);
//activeCOVSubscriptions(8, 10000, 1);

client.on("listening", function () {
  var address = client.address();
  console.log(
    "UDP Client listening on " + address.address + ":" + address.port
  );
  client.setBroadcast(true);
});

client.on("message", function (message, remoteInfo) {
  // output sender IP and port and raw byte buffer
  console.log(
    "Message from: " +
      remoteInfo.address +
      ":" +
      remoteInfo.port +
      " - " +
      util.byteArrayToHexString(message)
  );

  // ignore own broadcasts
  if (
    remoteInfo.address == "192.168.2.2" ||
    remoteInfo.address == "192.168.26.2"
  ) {
    console.log("ignoring own message!");
    return;
  }

  var offset = 0;

  var virtualLinkControl = new VirtualLinkControl();
  virtualLinkControl.fromBytes(message, offset);
  offset += virtualLinkControl.dataSizeInBuffer;

  var npdu = new NPDU();
  npdu.fromBytes(message, offset);
  offset += npdu.dataSizeInBuffer;

  var apdu = new APDU();
  apdu.fromBytes(message, offset);
  offset += apdu.dataSizeInBuffer;

  // incoming BACNet message
  var bacnetMessage = new Message();
  bacnetMessage.remoteInfo = remoteInfo;
  bacnetMessage.virtualLinkControl = virtualLinkControl;
  bacnetMessage.npdu = npdu;
  bacnetMessage.apdu = apdu;

  console.log("Incoming Message as String: " + bacnetMessage.asString);

  // retrieve type of message from APDU
  switch (bacnetMessage.apdu.pduType) {
    case PDUType.UNCONFIRMED_SERVICE_REQUEST_PDU:
      switch (bacnetMessage.apdu.unconfirmedServiceChoice) {
        case UnconfirmedServiceChoice.I_AM:
          var deviceObject = new DeviceObject();

          var messageToDeviceObjectConverter =
            new MessageToDeviceObjectConverter();
          messageToDeviceObjectConverter.convert(bacnetMessage, deviceObject);

          console.log("I-AM from deviceObject = " + deviceObject.asString);

          break;

        default:
          console.log(
            "unknown apdu.unconfirmedServiceChoice = " +
              bacnetMessage.apdu.unconfirmedServiceChoice
          );
          break;
      }
      break;

    default:
      console.log("unknown apdu.pduType = " + bacnetMessage.apdu.pduType);
      break;
  }
});

//
// START: ENABLE FOR WHO-IS
//

// server.bind(function () {
//   // server will listen to broadcast messages
//   server.setBroadcast(true);
//   // schedule a call to the broadcastWhoIs function every x milliseconds
//   setInterval(broadcastWhoIs, 3000);
// });

// client.bind(BROADCAST_LISTENING_PORT);

//
// STOP: ENABLE FOR WHO-IS
//
