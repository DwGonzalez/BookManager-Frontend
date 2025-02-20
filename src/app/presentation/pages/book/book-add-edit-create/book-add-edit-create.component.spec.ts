import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAddEditCreateComponent } from './book-add-edit-create.component';

describe('BookAddEditCreateComponent', () => {
  let component: BookAddEditCreateComponent;
  let fixture: ComponentFixture<BookAddEditCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookAddEditCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookAddEditCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
