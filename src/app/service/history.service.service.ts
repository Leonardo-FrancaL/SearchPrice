import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',
  'Access-Control-Allow-Origin':'*'})
};
const apiUrl = 'http://localhost:8080/hist/historico';
@Injectable({
  providedIn: 'root'
})
export class HistoryService{

  constructor(private http: HttpClient) { }
  
  getHistorys (): Observable<any[]> {
    return this.http.get<any[]>(apiUrl)
      .pipe(
        tap(produtos => console.log('leu as Historys')),
        catchError(this.handleError('getHistorys', [])) 
      );
  }

  getHistory(id: number): Observable<History> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<History>(url).pipe(
      tap(_ => console.log(`leu o produto id=${id}`)),
      catchError(this.handleError<History>(`getProduto id=${id}`))
    );
  }

  addHistory (History): Observable<History> {
    return this.http.post<History>(apiUrl, History, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((History: History) => console.log(`adicionou a History com`)),
      catchError(this.handleError<History>('addProduto'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
