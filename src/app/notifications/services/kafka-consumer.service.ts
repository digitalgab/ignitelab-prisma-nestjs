import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Creates a new instance of the Kafka consumer service.
   *
   * It uses the `@nestjs/microservices` `ServerKafka` class to create a Kafka consumer
   * that connects to the Upstash Kafka broker.
   *
   * The `clientId` is set to `'notifications'` to identify the consumer in the Kafka
   * broker logs.
   *
   * The `brokers` is set to an array with a single element, which is the URL of the
   * Upstash Kafka broker.
   *
   * The `sasl` configuration is set to use the `scram-sha-256` mechanism, with the
   * `username` and `password` keys set to the values provided by Upstash.
   *
   * The `ssl` option is set to `true` to enable SSL/TLS encryption for the connection
   * to the Kafka broker.
   */
/******  a35ee71a-3f8b-49d2-abc7-45d7fbc132a8  *******/  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['stirred-bream-9626-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'c3RpcnJlZC1icmVhbS05NjI2JP2jGZobUfgOvOJRt4BKE7U2ACdlOBKC3bMvgEk',
          password:
            'H4nly5QgkjLn2n3y2_9CLRKLdWPUw8ttXPwqBrladJfdawcBIk0PPMWLrcofbp3-i2Ynhg==',
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
