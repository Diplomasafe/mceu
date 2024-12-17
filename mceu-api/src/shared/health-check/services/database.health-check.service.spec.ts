import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseHealthCheckService } from './database.health-check.service';

describe('DatabaseHealthCheckService', () => {
  let service: DatabaseHealthCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseHealthCheckService],
    }).compile();

    service = module.get<DatabaseHealthCheckService>(DatabaseHealthCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
