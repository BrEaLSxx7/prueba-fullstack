import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Peliculas } from '../interfaces/peliculas';
import { peliculaSelector } from '../selectors/pelicuka.selectors';
import { HomeServiceService } from '../services/home-service.service';
import { Comentarios } from '../interfaces/comentarios';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
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
  public comentarios:Comentarios[]=[];
  public isLoading: boolean = false;
  constructor (
    @Inject(MAT_DIALOG_DATA) public pelicula: Peliculas,
    private homeService: HomeServiceService
  ) {

  }
  ngOnInit(): void {
    if (this.pelicula && this.pelicula._id) {
      this.loadComentarios(this.pelicula._id);
    }
  }

  private loadComentarios(peliculaId: string): void {
    this.isLoading = true;
    this.homeService.getComentarios(peliculaId).subscribe({
      next: (comments: Comentarios[]) => {
        this.comentarios = comments;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
