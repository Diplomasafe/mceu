import {Global, Module, Provider} from '@nestjs/common';
import {DatabaseHealthCheckService} from './services/database.health-check.service';

const providers: Provider[] = [
    DatabaseHealthCheckService
]

@Global()
@Module({
    providers: [...providers],
    exports: [...providers]
})
export class HealthCheckModule {
}
