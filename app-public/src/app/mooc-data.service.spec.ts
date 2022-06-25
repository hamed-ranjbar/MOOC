import { TestBed } from '@angular/core/testing';

import { MoocDataService } from './mooc-data.service';

describe('MoocDataService', () => {
  let service: MoocDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoocDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
