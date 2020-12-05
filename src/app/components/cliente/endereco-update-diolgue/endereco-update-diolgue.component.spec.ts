import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecoUpdateDiolgueComponent } from './endereco-update-diolgue.component';

describe('EnderecoUpdateDiolgueComponent', () => {
  let component: EnderecoUpdateDiolgueComponent;
  let fixture: ComponentFixture<EnderecoUpdateDiolgueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnderecoUpdateDiolgueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnderecoUpdateDiolgueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
