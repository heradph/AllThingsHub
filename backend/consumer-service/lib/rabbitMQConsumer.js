const amqp = require("amqplib");

const startConsumer = async () => {
  const connection = await amqp.connect("amqp://rabbitmq");
  const channel = await connection.createChannel();
  await channel.assertQueue("barang_keluar");
  console.log("✅ Connected to RabbitMQ (Consumer)");

  channel.consume("barang_keluar", (msg) => {
    if (msg !== null) {
      const content = msg.content.toString();
      console.log("📦 Received from Queue:", content);
      channel.ack(msg);
    }
  });
};

module.exports = { startConsumer };
