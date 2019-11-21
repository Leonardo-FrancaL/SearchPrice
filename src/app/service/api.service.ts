import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import {Usuario} from '../model/User';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'})
};

const apiUrl = "http://localhost:8080/user/usuario";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /*Classe responsavel por cadastrar o Usuario,
  */

  constructor(private http: HttpClient) { }

  getUsuarios (): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(apiUrl+'s')
      .pipe(
        tap(produtos => console.log('leu os Usuarios')),
        catchError(this.handleError('getUsuarios', []))
      );
  }

  getUsuario(email: string): Observable<Usuario> {
    const url = `${apiUrl}/${email}`;
    return this.http.get<Usuario>(url).pipe(
      tap(_ => console.log(`leu o Usuario id=${email}`)),
      catchError(this.handleError<Usuario>(`Usuario id=${email}`))
    );
  }

  getUsuarioId(id: number): Observable<Usuario> {
    const url = `${apiUrl+'i'}/${id}`;
    return this.http.get<Usuario>(url).pipe(
      tap(_ => console.log(`leu o Usuario id=${id}`)),
      catchError(this.handleError<Usuario>(`Usuario id=${id}`))
    );
  }

  addUsuario (produto): Observable<Usuario> {
    return this.http.post<Usuario>(apiUrl, produto, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((produto: Usuario) => console.log(`adicionou o produto com w/ id=${produto.getEmail}`)),
      catchError(this.handleError<Usuario>('addUsuario'))
    );
  }

  updateUsuario(user): Observable<any> {
    const url = `${apiUrl}/${user}`;
    return this.http.put(url, user, httpOptions).pipe(
      tap(_ => console.log(`atualiza o Usuario com id=${user}`)),
      catchError(this.handleError<any>('updateUsuario'))
    );
  }

  deleteUsuario (email): Observable<Usuario> {
    const url = `${apiUrl}/delete/${email}`;

    return this.http.delete<Usuario>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o Usuario com id=${email}`)),
      catchError(this.handleError<Usuario>('delete Usuario'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
