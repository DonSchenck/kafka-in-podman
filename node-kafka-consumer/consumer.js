const { Kafka } = require('kafkajs');

// Kafka setup
const kafka = new Kafka({
  clientId: 'cli-consumer',
  brokers: ['localhost:9092'] // Update if your broker is remote
});

const consumer = kafka.consumer({ groupId: 'cli-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'my-topic', fromBeginning: true });

  console.log('Listening for messages on "my-topic"...');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`📥 Received message: ${message.value.toString()}`);
    },
  });
};

run().catch(e => {
  console.error(`[Kafka Error] ${e.message}`, e);
  process.exit(1);
});
