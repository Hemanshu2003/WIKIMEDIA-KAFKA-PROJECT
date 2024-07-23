require("express-async-errors");
const cors = require("cors");
const express = require("express");
const { Kafka } = require('@confluentinc/kafka-javascript').KafkaJS;
const { CONSUMER_PROPERTIES } = require("./Consumer");


const App = express();

App.use(cors());

async function consumerStart() {
  let consumer;
  let stopped = false;

  // Set up signals for a graceful shutdown.
  const disconnect = () => {
    process.off('SIGINT', disconnect);
    process.off('SIGTERM', disconnect);
    stopped = true;
    consumer.commitOffsets()
      .finally(() =>
        consumer.disconnect()
      )
      .finally(() =>
        console.log("Disconnected successfully")
      );
  }
  process.on('SIGINT', disconnect);
  process.on('SIGTERM', disconnect);

  // Initialization
  consumer = new Kafka().consumer(CONSUMER_PROPERTIES);

  await consumer.connect();
  console.log("Connected successfully!!");
  await consumer.subscribe({topics: ["reviews"]} );
  console.log("Topic Subscribe successfully!!");
  consumer.run({
    eachMessage: async (data) => {
      broadcastSSE(data.message.value.toString());
    }
  });
}

// Array to store SSE connections
let clients = [];

// Function to broadcast data to all SSE clients
const broadcastSSE = (data) => {
  clients.forEach(client => client.write(`data: ${data}\n\n`));
};





App.get('/', (req, res) => {
  res.send(
    '<h1 style="color:green;">THIS IS MY KAFKA PROJECT !!</h1><p style="color:black;">Hemanshu Waghmare Here!! <a href="/data-source">Check Out My Streaming Data Source.. </a></p>'
  )
  // res.write('THIS IS MY KAFKA PROJECT!!')
})


App.get( "/data-source" ,(req,res) => {
  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Add the client connection to the array
  clients.push(res);

  // Remove the client connection when it closes
  req.on('close', () => {
    clients = clients.filter(client => client !== res);
  });
})

consumerStart().catch(console.error)

const PORT = process.env.PORT || 3000;

App.listen(PORT, () =>
  console.log(`Server is listening on port ${PORT}...`)
);

