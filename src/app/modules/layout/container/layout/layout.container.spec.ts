import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutContainer } from './layout.container';

describe('LayoutContainer', () => {
  let component: LayoutContainer;
  let fixture: ComponentFixture<LayoutContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutContainer]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
