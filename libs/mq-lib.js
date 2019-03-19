import AWS from "aws-sdk";

export function postMessage(userId, doorId, action, rabbitHost) {
  var amqp = require('amqplib/callback_api')
  amqp.connect('amqp://' + rabbitHost, function(err, conn) {
    conn.createChannel(function(err, ch) {
      var q = doorId;

      ch.assertQueue(q, {durable: false});
      ch.sendToQueue(q, new Buffer('{"action":' + '"' + action.toString() + '"}'));
    });
  });
}
