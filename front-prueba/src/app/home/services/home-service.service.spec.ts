import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HomeServiceService } from './home-service.service';
import { PeticionPeliculas } from '../interfaces/peliculas';
import { Comentarios } from '../interfaces/comentarios';
import { environment } from '../../../environments/environment.development';

describe('HomeServiceService', () => {
  let service: HomeServiceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeServiceService]
    });

    service = TestBed.inject(HomeServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch peliculas', () => {
    const mockResponse: PeticionPeliculas = {
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
      count: 1
    };

    service.getPeliculas(10, 0, 'test').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}peliculas?limit=10&offset=0&search=test`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch comentarios', () => {
    const mockResponse: Comentarios[] = [
      {
        "_id": "5a9427648b0beebeb6960069",
        "name": "Viserys Targaryen",
        "email": "harry_lloyd@gameofthron.es",
        "movie_id": "573a1399f29313caabcee303",
        "text": "Itaque sint quaerat officiis. In nobis tenetur distinctio exercitationem nostrum.",
        "date": "1980-11-07T12:25:27.000Z"
    }
    ];

    service.getComentarios('5a9427648b0beebeb6960069').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}comentarios?id=5a9427648b0beebeb6960069`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
