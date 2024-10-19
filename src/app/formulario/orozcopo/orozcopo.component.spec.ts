import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrozcopoComponent } from './orozcopo.component';

describe('OrozcopoComponent', () => {
  let component: OrozcopoComponent;
  let fixture: ComponentFixture<OrozcopoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrozcopoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrozcopoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
