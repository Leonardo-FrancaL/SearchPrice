import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import {Usuario} from './model/User';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = "http://localhost:8080/user/usuarios";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getProdutos (): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(apiUrl)
      .pipe(
        tap(produtos => console.log('leu os Usuario')),
        catchError(this.handleError('getProdutos', []))
      );
  }

  getProduto(id: number): Observable<Usuario> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Usuario>(url).pipe(
      tap(_ => console.log(`leu o Usuario id=${id}`)),
      catchError(this.handleError<Usuario>(`getProduto id=${id}`))
    );
  }

  addProduto (produto): Observable<Usuario> {
    return this.http.post<Usuario>(apiUrl, produto, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((produto: Usuario) => console.log(`adicionou o produto com w/ id=${produto.getEmail}`)),
      catchError(this.handleError<Usuario>('addProduto'))
    );
  }

  updateProduto(email, produto): Observable<any> {
    const url = `${apiUrl}/${email}`;
    return this.http.put(url, produto, httpOptions).pipe(
      tap(_ => console.log(`atualiza o Usuario com id=${email}`)),
      catchError(this.handleError<any>('updateProduto'))
    );
  }

  deleteProduto (email): Observable<Usuario> {
    const url = `${apiUrl}/delete/${email}`;

    return this.http.delete<Usuario>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o produto com id=${email}`)),
      catchError(this.handleError<Usuario>('deleteProduto'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
