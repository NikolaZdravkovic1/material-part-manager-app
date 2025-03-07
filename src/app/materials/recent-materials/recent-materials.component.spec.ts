import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentMaterialsComponent } from './recent-materials.component';

describe('RecentMaterialsComponent', () => {
  let component: RecentMaterialsComponent;
  let fixture: ComponentFixture<RecentMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentMaterialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
