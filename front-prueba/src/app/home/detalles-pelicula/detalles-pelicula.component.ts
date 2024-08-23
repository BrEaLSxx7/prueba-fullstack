import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Peliculas } from '../interfaces/peliculas';
import { peliculaSelector } from '../selectors/pelicuka.selectors';
import { HomeServiceService } from '../services/home-service.service';
import { Comentarios } from '../interfaces/comentarios';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TimeConverterPipe } from '../../pipes/time-converter.pipe';
import { DecimalPipe,DatePipe } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-detalles-pelicula',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,TimeConverterPipe,DecimalPipe,DatePipe,MatCardModule,MatProgressSpinnerModule],
  templateUrl: './detalles-pelicula.component.html',
  styleUrl: './detalles-pelicula.component.scss'
})
export class DetallesPeliculaComponent implements OnInit{
  public pelicula:Peliculas={};
  public comentarios:Comentarios[]=[];
  public isLoading: boolean = false;
  constructor (private store:Store<Peliculas>,
    private homeService: HomeServiceService
  ) {
    this.store.select(peliculaSelector).subscribe((movie:Peliculas)=>{
      this.pelicula = movie;
    })
  }
  ngOnInit(): void {

    this.isLoading = true;
    this.homeService.getComentarios(this.pelicula._id || '').subscribe((comments:Comentarios[])=>{
      this.comentarios = comments;
      this.isLoading = false;
    })
  }
}
