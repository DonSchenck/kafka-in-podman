import { Consumer, MessagesStreamFallbackModes, MessagesStreamModes, stringDeserializers } from '@platformatic/kafka'
import { forEach } from 'hwp'

// Create a consumer with string deserialisers
const consumer = new Consumer({
  groupId: 'my-consumer-group',
  clientId: 'my-consumer',
  bootstrapBrokers: ['localhost:9092'],
  deserializers: stringDeserializers
})

// Create a consumer stream
const stream = await consumer.consume({
  autocommit: true,
  topics: ['my-topic'],
  sessionTimeout: 10000,
  heartbeatInterval: 500,
  fallbackMode: MessagesStreamFallbackModes.EARLIEST,
  mode: MessagesStreamModes.COMMITTED
})

for await (const message of stream) {
  console.log(`Received [Async iterator consumption]: ${message.key} -> ${message.value}`)
  // Process message...
}

// Close the consumer when done
await consumer.close()