import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPartsComponent } from './recent-parts.component';

describe('RecentPartsComponent', () => {
  let component: RecentPartsComponent;
  let fixture: ComponentFixture<RecentPartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentPartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
