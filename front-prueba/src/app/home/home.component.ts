import { Component, inject, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { HomeServiceService } from './services/home-service.service';
import { Peliculas, PeticionPeliculas } from './interfaces/peliculas';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { DetallesPeliculaComponent } from './detalles-pelicula/detalles-pelicula.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    TruncatePipe,
    MatProgressSpinnerModule,
    MatToolbarModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public pageSizeOptions: number[] = [5, 10, 25, 50, 75, 100];
  public peliculas: Peliculas[] | undefined = [];
  public isLoading: boolean = false;
  public pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 25,
    length: 0,
  };
  public search: string = '';
  readonly dialog = inject(MatDialog);
  private homeService = inject(HomeServiceService);
  constructor(
  ) {
  }
  ngOnInit(): void {
    this.getPeliculas();
  }
  public handlePageEvent(e: PageEvent):void {
    this.pageEvent = e;
    this.getPeliculas();
  }
  public getPeliculas(): void {
    const pageSize = this.search ? 0 : this.pageEvent.pageSize;
    const pageIndex = this.search ? 0 : this.pageEvent.pageIndex * this.pageEvent.pageSize;
    this.isLoading = true;
    this.homeService
      .getPeliculas(pageSize, pageIndex, this.search)
      .subscribe({
        next: (movies: PeticionPeliculas) => {
          this.peliculas = movies.peliculas || [];
          this.pageEvent.length = movies.count || 0;
        },
        complete: () => this.isLoading = false,
        error: () => this.isLoading = false
      });
  }
  public showDetalles(movie: Peliculas): void {
    let dialogRef = this.dialog.open(DetallesPeliculaComponent, {
      height: '90vh',
      width: '70vw',
      data: movie
    });
  }
}
