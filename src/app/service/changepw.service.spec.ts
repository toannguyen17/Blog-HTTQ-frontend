import { TestBed } from '@angular/core/testing';

import { ChangepwService } from './changepw.service';

describe('ChangepwService', () => {
  let service: ChangepwService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangepwService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
