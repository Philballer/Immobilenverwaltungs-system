import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDialogueComponent } from './add-edit-dialogue.component';

describe('AddEditDialogueComponent', () => {
  let component: AddEditDialogueComponent;
  let fixture: ComponentFixture<AddEditDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditDialogueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
