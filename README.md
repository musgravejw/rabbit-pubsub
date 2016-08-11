## Rabbit-PubSub

[![version](https://img.shields.io/npm/v/@modulus/rabbit-pubsub.svg?style=flat-square)][version]
[![build](https://img.shields.io/travis/onmodulus/rabbit-pubsub/master.svg?style=flat-square)][build]
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)][license]

amqplib wrapper for easier rabbitmq scripting of pub/sub model

### Install

`npm install @modulus/rabbit-pubsub`

### Usage

#### `RabbitPubSub(url, [options])`

The exported function takes the same parameters as [`amqplib.connect`][amqplib],
and returns a object with two exported functions, `publish` and `subscribe`.

#### `Publish(exchange, message, done)`

Sends data to subscribers and yields.

```
const PubSub = require('@modulus/rabbit-rpc')(url)

PubSub.publish('tasks', { message: true }, (err, result) => {
  if (err) throw err // unable to publish

  console.log('message delivered')
})
```

#### `Subscribe(exchange, worker)`

Consumes messages on subscribed topics and passes them to worker. When worker calls
done acknowledges the message and sends the result to the client.

```
const PubSub = require('@modulus/rabbit-rpc')(url)

PubSub.subscribe('rpc-queue', (msg, done) => {
  // do work
  done(null, { result: true })
})
```

## Contribute

Contributions welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

[amqplib]: http://www.squaremobius.net/amqp.node/channel_api.html#connect

[version]: https://www.npmjs.com/package/@modulus/rabbit-pubsub
[build]: https://travis-ci.org/onmodulus/rabbit-pubsub
[license]: https://raw.githubusercontent.com/onmodulus/rabbit-pubsub/master/LICENSE
