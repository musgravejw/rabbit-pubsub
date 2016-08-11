const Channel = require('@modulus/rabbit-channel');
const SerializeError = require('serialize-error');

module.exports = function Subscribe(url, opts) {
  return function (ex, worker) {
    Channel(url, opts, function (err, ch, conn) {
      if (err) throw err;

      ch.assertExchange(ex, 'fanout', { durable: false });
      ch.assertQueue('', { exclusive: true }, function (err, queue) {
        if (err) throw err;

        ch.bindQueue(queue.queue, ex, '');
        ch.consume(queue.queue, function (msg) {
          var data = JSON.parse(msg.content.toString());

          worker(data, function (err, result) {
            if (err) result = SerializeError(err);

            return result;
          });
        },
        { noAck: true }
        );
      });
    });
  };
};
