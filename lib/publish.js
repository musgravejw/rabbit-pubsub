const Channel = require('@modulus/rabbit-channel');

module.exports = function Publish(url, opts) {
  return function (ex, msg, done) {
    Channel(url, opts, function (err, ch, conn) {
      if (err) return done(err);

      ch.assertExchange(ex, 'fanout', { durable: false }, function (err) {
        if (err) return done(err);

        ch.publish(ex, '', new Buffer(JSON.stringify(msg)));

        done(err);
      });
    });
  };
};
