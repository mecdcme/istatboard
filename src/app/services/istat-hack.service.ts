import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../classes/Report';

@Injectable({
  providedIn: 'root'
})
export class IstatHackService {
  private distancesUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }

  getReportUserWeek(): Observable<Report[]> {
   console.log(this.distancesUrl+'/report/userweek')
   return this.http.get<Report[]>(this.distancesUrl+'/report/userweek');
  };

  getReportUserWeek2():any{
    this.http.get(this.distancesUrl+'/report/userweek')
            .toPromise()
            .then((data: any) => data)
            .catch(error => { throw 'Data Loading Error' });
   };
}
