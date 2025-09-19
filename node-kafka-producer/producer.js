const { Kafka } = require('kafkajs');
const readline = require('readline');

// Kafka setup
const kafka = new Kafka({
  clientId: 'cli-producer',
  brokers: ['localhost:9092'] // Update if your broker is remote
});

const producer = kafka.producer();

// Readline setup
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const promptMessage = () => {
  rl.question('Enter message (type "exit" to quit): ', async (input) => {
    if (input.toLowerCase() === 'exit') {
      await producer.disconnect();
      rl.close();
      console.log('Producer disconnected. Goodbye!');
      return;
    }

    try {
      await producer.send({
        topic: 'my-topic',
        messages: [{ value: input }],
      });
      console.log(`✅ Sent: "${input}"`);
    } catch (err) {
      console.error(`❌ Error sending message: ${err.message}`);
    }

    promptMessage(); // Prompt again
  });
};

const run = async () => {
  await producer.connect();
  console.log('Kafka producer connected.');
  promptMessage();
};

run().catch(e => {
  console.error(`[Kafka Error] ${e.message}`, e);
  process.exit(1);
});
