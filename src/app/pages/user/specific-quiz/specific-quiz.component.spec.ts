import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificQuizComponent } from './specific-quiz.component';

describe('SpecificQuizComponent', () => {
  let component: SpecificQuizComponent;
  let fixture: ComponentFixture<SpecificQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
