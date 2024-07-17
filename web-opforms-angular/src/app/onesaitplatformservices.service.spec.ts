import { TestBed } from '@angular/core/testing';

import { OnesaitplatformservicesService } from './onesaitplatformservices.service';

describe('OnesaitplatformservicesService', () => {
  let service: OnesaitplatformservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnesaitplatformservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
