import { Producer, stringSerializers } from '@platformatic/kafka'
import readline from 'readline'

//const readline = require('readline');

// Producer setup
const producer = new Producer({
  clientId: 'my-producer',
//  bootstrapBrokers: ['localhost:9092'],
  bootstrapBrokers: ['kafkaserver:9092'],
  serializers: stringSerializers,
  autocreateTopics: true
})

// Readline setup
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const run = async () => {
  //await producer.connect();
  console.log('Kafka producer connected.');
  promptMessage();
};

const promptMessage = () => {
  rl.question('Enter message (type "exit" to quit): ', async (input) => {
    if (input.toLowerCase() === 'exit') {
      await producer.close();
      rl.close();
      console.log('Producer disconnected. Goodbye!');
      return;
    }

    try {
      await producer.send({
        messages: [
          {
            topic: 'my-topic',
            key: 'node-kafka-producer',
            value: JSON.stringify({ value: input }),
            headers: { source: 'web-app' }
          }
        ]
      });
      console.log(`✅ Sent: "${input}"`);
    } catch (err) {
      console.error(`❌ Error sending message: ${err.message}`);
    }

    promptMessage(); // Prompt again
  });
};

run().catch(e => {
  console.error(`[Kafka Error] ${e.message}`, e);
  process.exit(1);
});