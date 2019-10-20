import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Produto } from '../model/Produto';
import { Empresa } from '../model/Empresa';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',
  'Access-Control-Allow-Origin':'*'})
};
const apiUrl = 'http://localhost:8080/emp/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  getEmpesas (): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(apiUrl + 's')
      .pipe(
        tap(produtos => console.log('leu as empresas')),
        catchError(this.handleError('getEmpresas', []))
      );
  }

  getEmpresa(id: number): Observable<Empresa> {
    const url = `${apiUrl + 's'}/${id}`;
    return this.http.get<Empresa>(url).pipe(
      tap(_ => console.log(`leu a empresa id=${id}`)),
      catchError(this.handleError<Empresa>(`getEmpresa id=${id}`))
    );
  }

  addEmpresa (empresa): Observable<Empresa> {
    return this.http.post<Empresa>(apiUrl, empresa, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((empresa: Empresa) => console.log(`adicionou a empresa com`)),
      catchError(this.handleError<Empresa>('addEmpresa'))
    );
  }
  updateEmpresa(id, empresa): Observable<any> {
    const url = `${apiUrl + 's'}`;
    return this.http.put(url, empresa, httpOptions).pipe(
      tap(_ => console.log(`atualiza a empresa com id=${id}`)),
      catchError(this.handleError<any>('updateEmpresa'))
    );
  }

  deleteEmpresa (id): Observable<Produto> {
    const url = `${apiUrl + 's'}/${id}`;

    return this.http.delete<Produto>(url, httpOptions).pipe(
      tap(_ => console.log(`remove a empresa com id=${id}`)),
      catchError(this.handleError<Produto>('deleteEmpresa'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
