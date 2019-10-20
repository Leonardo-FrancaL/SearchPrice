import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Usuario } from '../model/User';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',
  'Access-Control-Allow-Origin':'*'})
};
const apiUrl = 'http://localhost:8080/user/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  /*Pega as categorias cadastradas*/

  
 

  getUsuario(id: number): Observable<Usuario> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Usuario>(url).pipe(
      tap(_ => console.log(`leu o usuario id=${id}`)),
      catchError(this.handleError<Usuario>(`getUsuario id=${id}`))
    );
  }

  getUsuarios (): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(apiUrl+'s')
      .pipe(
        tap(produtos => console.log('leu os usuarios')),
        catchError(this.handleError('getUsuarios', []))
      );
  }

  addUsuario (usuario): Observable<Usuario> {
    return this.http.post<Usuario>(apiUrl, usuario, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((usuario: Usuario) => console.log(`adicionou o usuario com`)),
      catchError(this.handleError<Usuario>('usuario'))
    );
  }

  updateUsuario(usuario): Observable<any> {
    const url = apiUrl;
    return this.http.put(url, usuario, httpOptions).pipe(
      tap(_ => console.log(`atualiza o usuario com id=`)),
      catchError(this.handleError<any>('usuario'))
    );
  }

  deleteUsuario (id): Observable<Usuario> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Usuario>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o usuario com id=${id}`)),
      catchError(this.handleError<Usuario>('usuario'))
    );
  }

  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
  
}
