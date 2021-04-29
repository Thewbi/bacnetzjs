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

// wireshark display filter: bacnet || bvlc || bacapp

// loytec local lan
//var DESTINATION_PORT = 47808;
//var DESTINATION_ADDRESS = "192.168.2.10";

// WAGO local lan
var DESTINATION_PORT = 47808;
var DESTINATION_ADDRESS = "192.168.26.154";

// broadcast local lan
//var BROADCAST_LISTENING_PORT = 47808;
//var BROADCAST_ADDR = "192.168.2.255";

// for WAGO 750-831
var BROADCAST_LISTENING_PORT = 47808;
var BROADCAST_ADDR = "192.168.26.255";

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
  socket.send(
    payload,
    offset,
    payload.length,
    DESTINATION_PORT,
    DESTINATION_ADDRESS,
    function () {
      console.log(
        "Sent '" +
          byteArrayToHexString(payload) +
          "' Length = " +
          payload.length
      );
    }
  );
}

//requestObjectListSize(8, 10000);
requestObjectListSize(8, 1000);

// stackoverflow.com/questions/6177423/send-broadcast-datagram
https: function broadcastNew() {
  //var message = Buffer.from("Broadcast message!");
  var message = Buffer.from("810b000801001008", "hex");
  //var message = new Buffer([0x81, 0x0b, 0x00, 0x08, 0x01, 0x00, 0x10, 0x08]);

  let messageFactory = new MessageFactory();
  let whoIsMessage = messageFactory.whoIsMessage();

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
      byteArrayToHexString(message)
  );

  // ignore own broadcasts
  if (remoteInfo.address == "192.168.2.2") {
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

// https://stackoverflow.com/questions/34309988/byte-array-to-hex-string-conversion-in-javascript
function byteArrayToHexString(byteArray) {
  return Array.from(byteArray, function (byte) {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");
}
