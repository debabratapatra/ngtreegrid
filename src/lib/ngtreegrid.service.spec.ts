import { TestBed } from '@angular/core/testing';

import { NgtreegridService } from './ngtreegrid.service';

describe('NgtreegridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgtreegridService = TestBed.get(NgtreegridService);
    expect(service).toBeTruthy();
  });
});
