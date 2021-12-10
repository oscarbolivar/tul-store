import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductContainer } from './product.container';

describe('ProductContainer', () => {
  let component: ProductContainer;
  let fixture: ComponentFixture<ProductContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductContainer]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
