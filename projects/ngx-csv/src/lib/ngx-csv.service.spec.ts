import { TestBed } from '@angular/core/testing';

import { NgxCsvService } from './ngx-csv.service';

describe('NgxCsvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxCsvService = TestBed.get(NgxCsvService);
    expect(service).toBeTruthy();
  });
});
