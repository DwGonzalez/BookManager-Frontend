import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorAddEditCreateComponent } from './author-add-edit-create.component';

describe('AuthorAddEditCreateComponent', () => {
  let component: AuthorAddEditCreateComponent;
  let fixture: ComponentFixture<AuthorAddEditCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorAddEditCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorAddEditCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
