const amqp = require("amqplib");

let channel;

const connectRabbitMQ = async () => {
  const connection = await amqp.connect("amqp://rabbitmq");
  channel = await connection.createChannel();
  await channel.assertQueue("barang_keluar");
  console.log("✅ Connected to RabbitMQ (Producer)");
};

const sendToQueue = async (data) => {
  if (!channel) {
    await connectRabbitMQ();
  }
  channel.sendToQueue("barang_keluar", Buffer.from(JSON.stringify(data)));
  console.log("📤 Sent to Queue:", data);
};

module.exports = {
  connectRabbitMQ,
  sendToQueue,
};
