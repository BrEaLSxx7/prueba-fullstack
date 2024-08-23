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
import { PeticionPeliculas } from './interfaces/peliculas';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    const mockMovies: PeticionPeliculas = {
      peliculas: [{
        "_id": "573a1398f29313caabcea6e9",
        "plot": "In pre-WWII Australia, a love triangle develops between a man, his wife and the man's brother.",
        "genres": [
            "Drama"
        ],
        "runtime": 98,
        "rated": "R",
        "cast": [
            "Rachel Ward",
            "Bryan Brown",
            "Steven Vidler",
            "Sam Neill"
        ],
        "poster": "https://m.media-amazon.com/images/M/MV5BZmZmOGE0OTYtMjkyOS00MmRjLTg2ZjAtMmM3NWMzYzc2ODU3XkEyXkFqcGdeQXVyMTMxMTY0OTQ@._V1_SY1000_SX677_AL_.jpg",
        "title": "Peter Kenna's The Good Wife",
        "fullplot": "In pre-WWII Australia, a love triangle develops between a man, his wife and the man's brother.",
        "languages": [
            "English"
        ],
        "directors": [
            "Ken Cameron"
        ],
        "writers": [
            "Peter Kenna"
        ],
        "awards": {
            "wins": 2,
            "nominations": 6,
            "text": "2 wins & 6 nominations."
        },
        "lastupdated": "2015-08-23 01:07:03.973000000",
        "year": 1987,
        "imdb": {
            "rating": 5.9,
            "votes": 402,
            "id": '93106'
        },
        "countries": [
            "Australia"
        ],
        "type": "movie",
        "tomatoes": {
            "viewer": {
                "rating": 2.8,
                "numReviews": 756,
                "meter": 27
            },
            "dvd": "2001-12-26T00:00:00.000Z",
            "lastUpdated": "2015-08-15T18:41:30.000Z"
        },
        "num_mflix_comments": 0
    },
    {
        "_id": "573a1399f29313caabcee303",
        "plot": "The Old Testament story of Abraham and the trials he endures. Commanded by God to lead his family to the promised land of Canaan with the promise that if he does so, his descendants will ...",
        "genres": [
            "Adventure",
            "Biography",
            "Drama"
        ],
        "runtime": 175,
        "cast": [
            "Richard Harris",
            "Barbara Hershey",
            "Maximilian Schell",
            "Vittorio Gassman"
        ],
        "num_mflix_comments": 1,
        "poster": "https://m.media-amazon.com/images/M/MV5BZmZlY2E1NWEtMjNhMS00OGQ2LWFmOTctODY1MDQ0ZDkzNTU2XkEyXkFqcGdeQXVyNzMwOTY2NTI@._V1_SY1000_SX677_AL_.jpg",
        "title": "Abraham",
        "fullplot": "The Old Testament story of Abraham and the trials he endures. Commanded by God to lead his family to the promised land of Canaan with the promise that if he does so, his descendants will become a great and numerous tribe. His obedience, as well as that of his children and grandchildren, is severely tested as they prove their faith to God.",
        "languages": [
            "English"
        ],
        "awards": {
            "wins": 0,
            "nominations": 5,
            "text": "Nominated for 3 Primetime Emmys. Another 2 nominations."
        },
        "lastupdated": "2015-09-04 00:40:25.960000000",
        "year": 1993,
        "imdb": {
            "rating": 7,
            "votes": 746,
            "id": '109036'
        },
        "countries": [
            "Germany",
            "Italy",
            "USA",
            "Czech Republic",
            "France"
        ],
        "type": "series",
        "tomatoes": {
            "viewer": {
                "rating": 3.7,
                "numReviews": 699,
                "meter": 70
            },
            "dvd": "1994-11-23T00:00:00.000Z",
            "lastUpdated": "2015-08-17T19:00:23.000Z"
        }
    }],
      count: 0
    };
    mockHomeService.getPeliculas.and.returnValue(of(mockMovies));
    await TestBed.configureTestingModule({
      imports: [
        MatPaginatorModule,
        MatCardModule,
        MatButtonModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatInputModule,
        MatFormFieldModule,
        HomeComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
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
