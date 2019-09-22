import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Categoria } from './model/Categoria';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',
  'Access-Control-Allow-Origin':'*'})
};
const apiUrl = 'http://localhost:8080/cat/categorias';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  
  getCategorias (): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(apiUrl)
      .pipe(
        tap(produtos => console.log('leu as categorias')),
        catchError(this.handleError('getCategorias', []))
      );
  }

  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }

}
