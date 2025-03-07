import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartManagerComponent } from './part-manager.component';

describe('PartManagerComponent', () => {
  let component: PartManagerComponent;
  let fixture: ComponentFixture<PartManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
