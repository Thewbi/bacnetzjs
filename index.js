var dgram = require("dgram");

const VirtualLinkControl = require("./protocol/virtualinkcontrol.js");
const NPDU = require("./protocol/npdu.js");
const APDU = require("./protocol/apdu.js");
const Message = require("./transport/message.js");

const DeviceObject = require("./model/deviceobject.js");
const MessageToDeviceObjectConverter = require("./conversion/MessageToDeviceObjectConverter.js");

//console.log("Hello World");

var DESTINATION_PORT = 47808;
var BROADCAST_LISTENING_PORT = 47808;
var BROADCAST_ADDR = "192.168.2.255";

var server = dgram.createSocket("udp4");
var client = dgram.createSocket("udp4");

server.bind(function () {
  server.setBroadcast(true);
  setInterval(broadcastNew, 3000);
});

// stackoverflow.com/questions/6177423/send-broadcast-datagram
https: function broadcastNew() {
  //var message = Buffer.from("Broadcast message!");
  var message = Buffer.from("810b000801001008", "hex");
  //var message = new Buffer([0x81, 0x0b, 0x00, 0x08, 0x01, 0x00, 0x10, 0x08]);
  server.send(
    message,
    0,
    message.length,
    DESTINATION_PORT,
    BROADCAST_ADDR,
    function () {
      console.log("Sent '" + message + "'");
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
  console.log(
    "Message from: " +
      remoteInfo.address +
      ":" +
      remoteInfo.port +
      " - " +
      toHexString(message)
  );

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

  console.log(bacnetMessage.asString);

  // retrieve type of message from APDU
  switch (bacnetMessage.apdu.type) {
    case 1:
      // unconfirmed request

      switch (bacnetMessage.apdu.serviceChoice) {
        case 0:
          // I-AM

          var deviceObject = new DeviceObject();

          var messageToDeviceObjectConverter = new MessageToDeviceObjectConverter();
          messageToDeviceObjectConverter.convert(bacnetMessage, deviceObject);

          console.log("test");

          break;
      }
  }
});

client.bind(BROADCAST_LISTENING_PORT);

// https://stackoverflow.com/questions/34309988/byte-array-to-hex-string-conversion-in-javascript
function toHexString(byteArray) {
  return Array.from(byteArray, function (byte) {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");
}

broadcastNew();
