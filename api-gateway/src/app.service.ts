import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { json } from 'express';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(
    @Inject('SERVICE_A') private readonly clientServiceA: ClientProxy,
    @Inject('SERVICE_B') private readonly clientServiceB: ClientProxy,
  ) {}

  pingServiceA() {
    const startTs = Date.now();
    const pattern = { cmd: 'ping' };
    const payload = {};
    return this.clientServiceA
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs })),
      );
  }

  pingServiceB() {
    const startTs = Date.now();
    const pattern = { cmd: 'ping' };
    const payload = {};
    return this.clientServiceB
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs })),
      );
  }

  someNumber() {
    const startTs = Date.now();
    const pattern = { cmd: 'ping' };
    const payload = {};
    console.log('HIT C');
    // return this.clientServiceB
    //   .send<string>(pattern, payload)
    //   .pipe(
    //     map((message: string) => ({ message, duration: Date.now() - startTs })),
    //   );
  }

  getIncidents() {
    // Get incidents
    console.log('getIncidents');
    const pattern = { cmd: 'ping' };
    const payload = {
      body: 'some string',
      data: 'some data',
    };

    return this.clientServiceB
      .send(pattern, payload)
      .pipe(map((message: string) => ({ message, other: 'helloo' })));
  }
}
