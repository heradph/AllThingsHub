const { startConsumer } = require("./lib/rabbitMQConsumer");

startConsumer().catch((err) => {
  console.error("Consumer failed to start:", err);
  process.exit(1);
});
