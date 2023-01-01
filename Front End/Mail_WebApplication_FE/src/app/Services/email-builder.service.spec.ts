import { TestBed } from '@angular/core/testing';

import { EmailBuilderService } from './email-builder.service';

describe('EmailBuilderService', () => {
  let service: EmailBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
