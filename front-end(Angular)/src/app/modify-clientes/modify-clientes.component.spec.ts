import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyClientesComponent } from './modify-clientes.component';

describe('ModifyClientesComponent', () => {
  let component: ModifyClientesComponent;
  let fixture: ComponentFixture<ModifyClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyClientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
