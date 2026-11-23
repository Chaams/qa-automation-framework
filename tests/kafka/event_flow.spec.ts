/**
 * Test d'un flux événementiel Kafka : on publie un événement « commande créée »
 * et on vérifie qu'un événement « facture émise » est produit en aval.
 * Nécessite le broker lancé par docker-compose.yml.
 */
import { Kafka } from 'kafkajs';
import { expect, test } from '@playwright/test';

const kafka = new Kafka({ brokers: [process.env.KAFKA_BROKER ?? 'localhost:9092'] });

test('commande créée -> facture émise', async () => {
  const consumer = kafka.consumer({ groupId: `qa-${Date.now()}` });
  const producer = kafka.producer();
  await Promise.all([consumer.connect(), producer.connect()]);
  await consumer.subscribe({ topic: 'invoices.issued', fromBeginning: false });

  const received = new Promise<string>((resolve) =>
    consumer.run({ eachMessage: async ({ message }) => resolve(message.value!.toString()) }),
  );

  const orderId = `order-${Date.now()}`;
  await producer.send({ topic: 'orders.created', messages: [{ key: orderId, value: JSON.stringify({ orderId, amount: 42 }) }] });

  const invoice = JSON.parse(await Promise.race([received, new Promise<string>((_, rej) => setTimeout(() => rej(new Error('timeout 10s')), 10_000))]));
  expect(invoice.orderId).toBe(orderId);

  await Promise.all([consumer.disconnect(), producer.disconnect()]);
});
