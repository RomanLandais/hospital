import { TestBed } from '@angular/core/testing';

import { ComServerService } from './com-server.service';

describe('ComServerService', () => {
  let service: ComServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
