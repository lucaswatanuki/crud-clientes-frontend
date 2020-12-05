import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteUpdateDiolgueComponent } from './cliente-update-diolgue.component';

describe('ClienteUpdateDiolgueComponent', () => {
  let component: ClienteUpdateDiolgueComponent;
  let fixture: ComponentFixture<ClienteUpdateDiolgueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteUpdateDiolgueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteUpdateDiolgueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
