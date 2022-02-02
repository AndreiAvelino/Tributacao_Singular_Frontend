import { TestBed } from '@angular/core/testing';

import { SuperTableService } from './super-table.service';

describe('SuperTableService', () => {
  let service: SuperTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
