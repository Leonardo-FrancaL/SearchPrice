import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Categoria } from '../model/Categoria';

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

  /*Pega as categorias cadastradas*/

  
 

  getCategoria(id: number): Observable<Categoria> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Categoria>(url).pipe(
      tap(_ => console.log(`leu o produto id=${id}`)),
      catchError(this.handleError<Categoria>(`getProduto id=${id}`))
    );
  }

  getCategoriaN(name: string): Observable<any> {
    const url = `${apiUrl+'N'}/${name}`;
    return this.http.get<Categoria>(url).pipe(
      tap(_ => console.log(`leu o produto id=${name}`)),
      catchError(this.handleError<Categoria>(`getProduto id=${name}`))
    );
  }

  getCategorias (): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(apiUrl)
      .pipe(
        tap(produtos => console.log('leu as categorias')),
        catchError(this.handleError('getCategorias', []))
      );
  }

  
  getCategoriaFilha(id: number): Observable<Categoria[]> {
    const url = `${apiUrl+'s'}/${id}`;
    return this.http.get<Categoria[]>(url).pipe(
      tap(categorias => console.log('leu as categorias')),
      catchError(this.handleError<Categoria[]>(`getProduto id=${id}`))
    );
  }

  updateCategoria(categoria): Observable<any> {
    const url = apiUrl;
    return this.http.put(url, categoria, httpOptions).pipe(
      tap(_ => console.log(`atualiza a categoria com id=`)),
      catchError(this.handleError<any>('updateCategoria'))
    );
  }

  deleteCategoria (id): Observable<Categoria> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Categoria>(url, httpOptions).pipe(
      tap(_ => console.log(`remove a categoria com id=${id}`)),
      catchError(this.handleError<Categoria>('deleteCategoria'))
    );
  }

  
  addCategoria (categoria): Observable<Categoria> {
    return this.http.post<Categoria>(apiUrl, categoria, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((categoria: Categoria) => console.log(`adicionou a categoria com`)),
      catchError(this.handleError<Categoria>('addProduto'))
    );
  }
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }

}
