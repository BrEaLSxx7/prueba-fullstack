import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesPeliculaComponent } from './detalles-pelicula.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeServiceService } from '../services/home-service.service';
import { of, throwError } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TimeConverterPipe } from '../../pipes/time-converter.pipe';
import { DecimalPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('DetallesPeliculaComponent', () => {
  let component: DetallesPeliculaComponent;
  let fixture: ComponentFixture<DetallesPeliculaComponent>;
  let mockHomeService: jasmine.SpyObj<HomeServiceService>;

  beforeEach(async () => {
    mockHomeService = jasmine.createSpyObj('HomeServiceService', ['getComentarios']);

    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatButtonModule,
        TimeConverterPipe,
        DecimalPipe,
        DatePipe,
        MatCardModule,
        MatProgressSpinnerModule
      ],
      declarations: [DetallesPeliculaComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { _id: '1', title: 'Movie Title' } },
        { provide: HomeServiceService, useValue: mockHomeService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load comments on init', () => {
    const mockComments = [{ text: 'Great movie!', date: new Date().toISOString() }];
    mockHomeService.getComentarios.and.returnValue(of(mockComments));
    component.ngOnInit();
    expect(mockHomeService.getComentarios).toHaveBeenCalledWith('1');
    expect(component.comentarios).toEqual(mockComments);
    expect(component.isLoading).toBeFalse();
  });

  it('should handle error when loading comments', () => {
    mockHomeService.getComentarios.and.returnValue(throwError('Error'));
    component.ngOnInit();
    expect(component.isLoading).toBeFalse();
    expect(component.comentarios.length).toBe(0);
  });
});
