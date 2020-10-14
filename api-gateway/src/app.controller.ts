import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping-a')
  pingServiceA() {
    console.log('Hit /service-a');
    return this.appService.pingServiceA();
  }

  @Get('/ping-b')
  pingServiceB() {
    console.log('Hit /service-b');
    return this.appService.pingServiceB();
  }

  @Get('/ping-all')
  pingAll() {
    return zip(
      this.appService.pingServiceA(),
      this.appService.pingServiceB(),
    ).pipe(
      map(([pongServiceA, pongServiceB]) => ({
        pongServiceA,
        pongServiceB,
      })),
    );
  }

  @Get('/ping-c')
  pingServiceC() {
    console.log('Hit /service-c');
    return this.appService.someNumber();
  }

  @Get('/incidents')
  ServiceIncidents() {
    console.log('Getting Incidents');
    return this.appService.getIncidents();
  }
}
