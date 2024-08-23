import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeticionPeliculas } from '../interfaces/peliculas';
import { environment } from '../../../environments/environment.development';
import { Comentarios } from '../interfaces/comentarios';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  constructor(private http: HttpClient) { }

  getPeliculas(limit: number = 0,offset: number = 0,search: string = ''):Observable<PeticionPeliculas>{
    return this.http.get<PeticionPeliculas>(`${environment.apiUrl}peliculas?limit=${limit}&offset=${offset}&search=${search}`);
  }
  getComentarios(id:string):Observable<Comentarios[]>{
    return this.http.get<Comentarios[]>(`${environment.apiUrl}comentarios?id=${id}`);
  }
}
