import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HomeServiceService } from './services/home-service.service';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockHomeService: jasmine.SpyObj<HomeServiceService>;
  let mockStore: jasmine.SpyObj<Store<any>>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockHomeService = jasmine.createSpyObj('HomeServiceService', ['getPeliculas']);
    mockStore = jasmine.createSpyObj('Store', ['dispatch']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        MatPaginatorModule,
        MatCardModule,
        MatButtonModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatInputModule,
        MatFormFieldModule
      ],
      declarations: [HomeComponent],
      providers: [
        { provide: HomeServiceService, useValue: mockHomeService },
        { provide: Store, useValue: mockStore },
        { provide: MatDialog, useValue: mockDialog }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch init action on creation', () => {
    expect(mockStore.dispatch).toHaveBeenCalledWith(jasmine.anything());
  });

  it('should call getPeliculas on init', () => {
    spyOn(component, 'getPeliculas');
    component.ngOnInit();
    expect(component.getPeliculas).toHaveBeenCalled();
  });

  it('should update pageEvent and call getPeliculas on handlePageEvent', () => {
    const pageEvent = { pageIndex: 1, pageSize: 10, length: 100 } as any;
    spyOn(component, 'getPeliculas');
    component.handlePageEvent(pageEvent);
    expect(component.pageEvent).toEqual(pageEvent);
    expect(component.getPeliculas).toHaveBeenCalled();
  });

  it('should call HomeService to fetch movies in getPeliculas', () => {
    mockHomeService.getPeliculas.and.returnValue(of({ peliculas: [], count: 0 }));
    component.getPeliculas();
    expect(mockHomeService.getPeliculas).toHaveBeenCalled();
  });

  it('should open dialog with movie details in showDetalles', () => {
    const movie = { _id: '1', title: 'Movie Title' };
    component.showDetalles(movie);
    expect(mockDialog.open).toHaveBeenCalled();
  });
});
