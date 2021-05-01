var dgram = require("dgram");

const VirtualLinkControl = require("./protocol/virtualinkcontrol.js");
const NPDU = require("./protocol/npdu.js");
const APDU = require("./protocol/apdu.js");
const MessageFactory = require("./protocol/messagefactory.js");
const UnconfirmedServiceChoice = require("./protocol/unconfirmedservicechoice.js");
const PDUType = require("./protocol/pdutype.js");

const Message = require("./transport/message.js");

const DeviceObject = require("./model/deviceobject.js");
const MessageToDeviceObjectConverter = require("./conversion/MessageToDeviceObjectConverter.js");

const util = require("./common/util.js");

// wireshark display filter: bacnet || bvlc || bacapp

// loytec local lan
//var DESTINATION_PORT = 47808;
var DESTINATION_ADDRESS = "192.168.2.10";

// WAGO local lan
var DESTINATION_PORT = 47808;
//var DESTINATION_ADDRESS = "192.168.26.154";

// broadcast loytec local lan
//var BROADCAST_LISTENING_PORT = 47808;
var BROADCAST_ADDR = "192.168.2.255";

// for WAGO 750-831
var BROADCAST_LISTENING_PORT = 47808;
//var BROADCAST_ADDR = "192.168.26.255";

// sends broadcast messages
var server = dgram.createSocket("udp4");

// listens for incoming broadcast messages
var client = dgram.createSocket("udp4");

// Request: 810a001301000005010c0c02002710194c2900
function requestObjectListSize(objectType, bacnetIdentifier) {
  let deviceObject = new DeviceObject();
  //deviceObject.objectType = 8; // 8 is device
  //deviceObject.bacnetIdentifier = 10000;
  deviceObject.objectType = objectType; // 8 is device
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
  });

  // send a request and keep the socket open so the response can be retrieved
  socket.send(
    payload,
    offset,
    payload.length,
    DESTINATION_PORT,
    DESTINATION_ADDRESS,
    function () {
      console.log(
        "Sent '" +
          util.byteArrayToHexString(payload) +
          "' Length = " +
          payload.length
      );
    }
  );
}

//requestObjectListSize(8, 10000);
//requestObjectListSize(8, 1000);

function requestObjectList(objectType, bacnetIdentifier) {
  let deviceObject = new DeviceObject();
  //deviceObject.objectType = 8; // 8 is device
  //deviceObject.bacnetIdentifier = 10000;
  deviceObject.objectType = objectType; // 8 is device
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
  });

  // send a request and keep the socket open so the response can be retrieved
  socket.send(
    payload,
    offset,
    payload.length,
    DESTINATION_PORT,
    DESTINATION_ADDRESS,
    function () {
      console.log(
        "Sent '" +
          util.byteArrayToHexString(payload) +
          "' Length = " +
          payload.length
      );
    }
  );
}

//requestObjectList(8, 10000);
//requestObjectList(8, 1000);

function requestAllProperties(objectType, bacnetIdentifier) {
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

    console.log(bacnetMessage.asString);
  });

  let deviceObject = new DeviceObject();
  //deviceObject.objectType = 8; // 8 is device
  //deviceObject.bacnetIdentifier = 10000;
  deviceObject.objectType = objectType; // 8 is device
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
    DESTINATION_PORT,
    DESTINATION_ADDRESS,
    function () {
      console.log(
        "Sent '" +
          util.byteArrayToHexString(payload) +
          "' Length = " +
          payload.length
      );
    }
  );
}

// object-type: device (8) - bacnet identifier: 25
// object-type: multistate value (19) - bacnet identifier: 1 - name: 'module_type' - Present Value can not be written! module_type is the value that the IO420 was configured as using the ST220 (Service Terminal 220)
// object-type: multistate value (19) - bacnet identifier: 2 - name: 'alarm_TZ320'
// object-type: multistate value (19) - bacnet identifier: 3 - name: 'TZ320_state'
// object-type: multistate value (19) - bacnet identifier: 4 - name: 'TZ320_command'
// object-type: binary-input (3) - bacnet identifier: 1 - name: 'lock-state' - why is the name of a binary-input 'lock-state'? (Setting the Out Of Service mode is possible)
// object-type: binary-input (3) - bacnet identifier: 2 - name: 'close-state' - why is the name of a binary-input 'close-state'? (Setting the Out Of Service mode is possible
// object-type: notification-class (15) - bacnet identifier: 40 - What does this do?

//requestAllProperties(8, 25); // only works with destination specifier in NPDU!
//requestAllProperties(19, 1); // object type: multistate value (19)
//requestAllProperties(19, 2); // object type: multistate value (19)
//requestAllProperties(19, 3); // object type: multistate value (19)
//requestAllProperties(19, 4); // object type: multistate value (19)
//requestAllProperties(8, 10000); // only works with destination specifier in NPDU!
//requestAllProperties(17, 0);

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

    console.log(bacnetMessage.asString);
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
        "Sent '" +
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
writeProperty(19, 4, 0x04); // 19 = multi-state-value, 4 = bacnet instance number
//writeProperty(19, 4, 0x02);
//writeProperty(19, 4, 0x03);

// stackoverflow.com/questions/6177423/send-broadcast-datagram
https: function broadcastNew() {
  //var message = Buffer.from("Broadcast message!");
  var message = Buffer.from("810b000801001008", "hex");
  //var message = new Buffer([0x81, 0x0b, 0x00, 0x08, 0x01, 0x00, 0x10, 0x08]);

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
      //console.log("Sent '" + byteArrayToHexString(whoIsMessage.bytes) + "'");
    }
  );
}

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

          var messageToDeviceObjectConverter = new MessageToDeviceObjectConverter();
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
//   // schedule a call to the broadcastNew function every x milliseconds
//   setInterval(broadcastNew, 3000);
// });

// client.bind(BROADCAST_LISTENING_PORT);

//
// STOP: ENABLE FOR WHO-IS
//
