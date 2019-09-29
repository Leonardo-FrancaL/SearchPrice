import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Produto } from './model/produto';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',
  'Access-Control-Allow-Origin':'*'})
};
const apiUrl = 'http://localhost:8080/api/produto';
                

@Injectable({
  providedIn: 'root'
})
export class ServicoProduto {

  constructor(private http: HttpClient) { }

/*Pega os produtos cadastrados, Insere produdos , Atualiza, um CRUD completo*/

  getProdutos (): Observable<Produto[]> {
    return this.http.get<Produto[]>(apiUrl+'s')
      .pipe(
        tap(produtos => console.log('leu os produtos')),
        catchError(this.handleError('getProdutos', []))
      );
  }

  getProduto(id: number): Observable<Produto> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Produto>(url).pipe(
      tap(_ => console.log(`leu o produto id=${id}`)),
      catchError(this.handleError<Produto>(`getProduto id=${id}`))
    );
  }

  addProduto (produto): Observable<Produto> {
    return this.http.post<Produto>(apiUrl, produto, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((produto: Produto) => console.log(`adicionou o produto com`)),
      catchError(this.handleError<Produto>('addProduto'))
    );
  }

  
  uploadImageProduto(img:File){
    const options = {
      headers: new HttpHeaders({'Content-Type': 'image/*',
      'Access-Control-Allow-Origin':'*'})
    };
    let ur = "http://localhost:8080/api/send";
    return this.http.post(ur,img,options)
    .pipe(
      tap(res =>console.log("ok")),
      catchError(this.handleError('not ok'))
    );
  }

  
/*
  teste(json):string{
    let resp:string;

    this.http.post<Produto>(apiUrl,json,httpOptions).pipe(tap((produto:Produto) =>resp = "Produto cadastrado com sucesso"));

    return resp;
  }*/

  updateProduto(id, produto): Observable<any> {
    const url = `${apiUrl}`;
    return this.http.put(url, produto, httpOptions).pipe(
      tap(_ => console.log(`atualiza o produco com id=${id}`)),
      catchError(this.handleError<any>('updateProduto'))
    );
  }

  deleteProduto (id): Observable<Produto> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Produto>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o produto com id=${id}`)),
      catchError(this.handleError<Produto>('deleteProduto'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}