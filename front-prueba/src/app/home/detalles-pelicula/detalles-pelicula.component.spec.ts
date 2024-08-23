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
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Comentarios } from '../interfaces/comentarios';

describe('DetallesPeliculaComponent', () => {
  let component: DetallesPeliculaComponent;
  let fixture: ComponentFixture<DetallesPeliculaComponent>;
  let mockHomeService: jasmine.SpyObj<HomeServiceService>;
  const mockComments = [{ "_id": "5a9427648b0beebeb6960069",
    "name": "Viserys Targaryen",
    "email": "harry_lloyd@gameofthron.es",
    "movie_id": "573a1399f29313caabcee303",
    "text": "Itaque sint quaerat officiis. In nobis tenetur distinctio exercitationem nostrum.",
    "date": "1980-11-07T12:25:27.000Z" }];
  beforeEach(async () => {
    mockHomeService = jasmine.createSpyObj('HomeServiceService', ['getComentarios']);

    mockHomeService.getComentarios.and.returnValue(of(mockComments));
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatButtonModule,
        TimeConverterPipe,
        DecimalPipe,
        DatePipe,
        MatCardModule,
        MatProgressSpinnerModule,
        DetallesPeliculaComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { "_id": "5a9427648b0beebeb6960069",
        "name": "Viserys Targaryen",
        "email": "harry_lloyd@gameofthron.es",
        "movie_id": "573a1399f29313caabcee303",
        "text": "Itaque sint quaerat officiis. In nobis tenetur distinctio exercitationem nostrum.",
        "date": "1980-11-07T12:25:27.000Z" } },
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
    component.ngOnInit();
    expect(mockHomeService.getComentarios).toHaveBeenCalledWith('5a9427648b0beebeb6960069');
    expect(component.comentarios).toEqual(mockComments);
    expect(component.isLoading).toBeFalse();
  });

  it('should handle error when loading comments', () => {
    mockHomeService.getComentarios.and.returnValue(throwError('Error'));
    component.ngOnInit();
    expect(component.isLoading).toBeFalse();
    expect(component.comentarios.length).toBe(1);
  });
});
