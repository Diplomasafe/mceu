import { Test, TestingModule } from '@nestjs/testing';
import { PaginationBuilderService } from './pagination.builder.service';

describe('PaginationBuilderService', () => {
  let service: PaginationBuilderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaginationBuilderService],
    }).compile();

    service = module.get<PaginationBuilderService>(PaginationBuilderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
