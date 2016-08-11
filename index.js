const Publish = require('./lib/publish');
const Subscribe = require('./lib/subscribe');

module.exports = function (url, opts) {
  return {
    publish: Publish(url, opts),
    subscribe: Subscribe(url, opts)
  };
};
