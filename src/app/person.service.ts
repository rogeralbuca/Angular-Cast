import { Injectable } from '@angular/core';
import { Person } from './model/person';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private baseUrlService = '';

  constructor(private http: HttpClient) {

      this.baseUrlService = 'http://localhost:8090/rest' + '/person/';
  }

  findAll() {
      return this.http.get(this.baseUrlService);
  }

  delete(codigo: number) {
      return this.http.delete(this.baseUrlService + codigo);
  }

  findById(id: number) {
      return this.http.get(this.baseUrlService + id);
  }

  update(person: Person) {
      return this.http.put(this.baseUrlService, JSON.stringify(person), httpOptions);
  }

  save(person: Person): Observable<Person> {
    return this.http.post<Person>(this.baseUrlService, person, httpOptions)
    .pipe(
      catchError(err => {
        throw 'Error details: ' + err;
      }),
    );
  }
}
