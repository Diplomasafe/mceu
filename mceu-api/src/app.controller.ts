import { Controller, Get } from '@nestjs/common';

import { version } from '../package.json';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { DatabaseHealthCheckService } from './shared/health-check/services/database.health-check.service';
import { Public } from 'nest-keycloak-connect';

@Controller()
export class AppController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly databaseHealth: DatabaseHealthCheckService,
    ) {}

    @Public()
    @Get('/')
    public getHello(): { version: string } {
        return {
            version: version,
        };
    }

    @Public()
    @Get('/healthcheck')
    @HealthCheck()
    public healthcheck() {
        return this.health.check([() => this.databaseHealth.isHealthy()]);
    }
}
