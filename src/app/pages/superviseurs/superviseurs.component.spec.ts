import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperviseursComponent } from './superviseurs.component';

describe('SuperviseursComponent', () => {
  let component: SuperviseursComponent;
  let fixture: ComponentFixture<SuperviseursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperviseursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperviseursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
