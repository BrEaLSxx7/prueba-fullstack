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
import { Store } from '@ngrx/store';
import { init, update } from './actions/pelicula.actions';
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
  public Peliculas: Peliculas[] | undefined = [];
  public isLoading: boolean = false;
  public pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 25,
    length: 0,
  };
  public search: string = '';
  readonly dialog = inject(MatDialog);
  constructor(
    private homeServices: HomeServiceService,
    private store: Store<Peliculas>
  ) {
    this.store.dispatch(init());
  }
  ngOnInit(): void {
    this.getPeliculas();
  }
  public handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.getPeliculas();
  }
  public getPeliculas(): void {
    if(this.search != ''){
      this.pageEvent.pageSize = 0;
      this.pageEvent.pageIndex = 0;
    }
    this.isLoading = true;
    this.Peliculas = [];
    this.homeServices
      .getPeliculas(
        this.pageEvent.pageSize,
        this.pageEvent.pageIndex * this.pageEvent.pageSize,
        this.search
      )
      .subscribe((movies: PeticionPeliculas) => {
        this.Peliculas = movies.peliculas;
        this.pageEvent.length = movies.count || 0;
        this.isLoading = false;
      });
  }
  public showDetalles(movie: Peliculas): void {
    this.store.dispatch(update({ pelicula: movie }));
    let dialogRef = this.dialog.open(DetallesPeliculaComponent, {
      height: '90vh',
      width: '70vw',
    });
    dialogRef.afterClosed().subscribe(result => {
        this.store.dispatch(init());
    });
  }
}
