import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAutcompleteAddressSearchbarComponent } from './google-autcomplete-address-searchbar.component';

describe('GoogleAutcompleteAddressSearchbarComponent', () => {
  let component: GoogleAutcompleteAddressSearchbarComponent;
  let fixture: ComponentFixture<GoogleAutcompleteAddressSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleAutcompleteAddressSearchbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoogleAutcompleteAddressSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
